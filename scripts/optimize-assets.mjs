/**
 * Shrinks the shipped 3D assets in place.
 *
 * The glTF scenes came out of a DCC tool with authoring-resolution textures -
 * a 3840x2160 base-colour map for a model that never renders wider than about
 * 900 CSS pixels. Capping and re-encoding is invisible at render size.
 *
 * Idempotent: a manifest records the resulting size of every file touched, so
 * JPEGs are never re-encoded twice.
 *
 * One image at a time on purpose. Decoding a 4K texture holds ~33 MB, so
 * fanning 50 out with Promise.all spikes memory for no wall-clock gain (sharp
 * already threads internally).
 *
 * Usage: npm run optimize:assets [-- --dry]
 */

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
// Kept beside the script rather than in public/, which is served verbatim.
const MANIFEST = path.join(ROOT, "scripts", "assets-optimized.json");

/** Directories holding glTF scenes. */
const SCENE_DIRS = ["desktop_pc", "planet"];

/** Long-edge cap. Generous for the on-screen size of these models. */
const MAX_EDGE = 1024;

const JPEG_QUALITY = 84;
const DRY_RUN = process.argv.includes("--dry");

const fmt = (bytes) =>
	bytes >= 1024 * 1024
		? `${(bytes / 1024 / 1024).toFixed(2)} MB`
		: `${(bytes / 1024).toFixed(0)} KB`;

async function loadManifest() {
	try {
		return JSON.parse(await readFile(MANIFEST, "utf8"));
	} catch {
		return { files: {} };
	}
}

async function walk(dir) {
	const out = [];
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch {
		return out;
	}
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...(await walk(full)));
		else out.push(full);
	}
	return out;
}

async function optimizeImage(file) {
	const before = (await stat(file)).size;
	const ext = path.extname(file).toLowerCase();
	const input = await readFile(file);

	let pipeline = sharp(input, { failOn: "none" });
	const meta = await pipeline.metadata();
	const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

	if (longEdge > MAX_EDGE) {
		pipeline = pipeline.resize({
			width: meta.width >= meta.height ? MAX_EDGE : undefined,
			height: meta.height > meta.width ? MAX_EDGE : undefined,
			fit: "inside",
			withoutEnlargement: true,
			kernel: "lanczos3",
		});
	}

	if (ext === ".jpg" || ext === ".jpeg") {
		pipeline = pipeline.jpeg({
			quality: JPEG_QUALITY,
			mozjpeg: true,
			chromaSubsampling: "4:2:0",
		});
	} else if (ext === ".png") {
		// Keep PNG (some of these carry alpha the material relies on) but let
		// sharp spend real effort on the deflate stream and palette.
		pipeline = pipeline.png({
			compressionLevel: 9,
			effort: 10,
			palette: true,
		});
	} else {
		return { file, skipped: "unsupported format", before, after: before };
	}

	const output = await pipeline.toBuffer();

	// Never make a file bigger.
	if (output.length >= before) {
		return { file, skipped: "already optimal", before, after: before };
	}

	if (!DRY_RUN) await writeFile(file, output);

	return {
		file,
		before,
		after: output.length,
		dims:
			longEdge > MAX_EDGE
				? `${meta.width}x${meta.height} -> capped ${MAX_EDGE}`
				: `${meta.width}x${meta.height}`,
	};
}

async function minifyGltf(file) {
	const before = (await stat(file)).size;
	const text = await readFile(file, "utf8");

	let json;
	try {
		json = JSON.parse(text);
	} catch {
		return { file, skipped: "not valid JSON", before, after: before };
	}

	// glTF is a plain JSON document; the exporter pretty-printed it. Re-emitting
	// without whitespace is lossless.
	const minified = JSON.stringify(json);
	const after = Buffer.byteLength(minified);

	if (after >= before) {
		return { file, skipped: "already minified", before, after: before };
	}

	if (!DRY_RUN) await writeFile(file, minified, "utf8");
	return { file, before, after };
}

async function main() {
	const manifest = await loadManifest();
	const results = [];

	for (const dir of SCENE_DIRS) {
		const files = await walk(path.join(PUBLIC, dir));

		for (const file of files) {
			const rel = path.relative(PUBLIC, file).split(path.sep).join("/");
			const size = (await stat(file)).size;

			// Already processed and untouched since: skip.
			if (manifest.files[rel] === size) continue;

			const ext = path.extname(file).toLowerCase();
			let result = null;

			if ([".jpg", ".jpeg", ".png"].includes(ext)) {
				result = await optimizeImage(file);
			} else if (ext === ".gltf") {
				result = await minifyGltf(file);
			} else {
				continue; // .bin geometry is left alone
			}

			result.rel = rel;
			results.push(result);
			if (!DRY_RUN) manifest.files[rel] = result.after;
		}
	}

	const changed = results.filter((r) => !r.skipped);
	const before = results.reduce((a, r) => a + r.before, 0);
	const after = results.reduce((a, r) => a + r.after, 0);

	changed
		.toSorted((a, b) => b.before - b.after - (a.before - a.after))
		.forEach((r) => {
			const saved = r.before - r.after;
			const pct = ((saved / r.before) * 100).toFixed(0);
			console.log(
				`  ${r.rel}\n    ${fmt(r.before)} -> ${fmt(r.after)}  (-${pct}%)${r.dims ? `  [${r.dims}]` : ""}`,
			);
		});

	console.log(
		`\n${DRY_RUN ? "[dry run] " : ""}${changed.length} file(s) optimized`,
	);
	console.log(`total: ${fmt(before)} -> ${fmt(after)} (saved ${fmt(before - after)})`);

	if (!DRY_RUN) {
		manifest.generatedAt = new Date().toISOString();
		manifest.note =
			"Tracks post-optimization sizes so scripts/optimize-assets.mjs stays idempotent.";
		await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
