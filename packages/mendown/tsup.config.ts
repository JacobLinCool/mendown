import { defineConfig } from "tsup";

export default defineConfig(() => ({
	entry: ["src/index.ts", "src/lib.ts"],
	outDir: "dist",
	target: "node16",
	format: ["esm", "cjs"],
	shims: true,
	clean: true,
	splitting: false,
	dts: true,
}));
