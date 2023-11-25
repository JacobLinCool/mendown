import { program } from "commander";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import { pkg } from "../pkg";
import { ImageDescriber } from "../tool/image-describer";
import { LinkProbe } from "../tool/link-probe";

program
	.name(pkg.name)
	.description(pkg.description)
	.version(pkg.version)
	.argument("<file>", "Markdown file to convert")
	.option("-o, --output <file>", "Output file, if not specified, output to stdout")
	.option("-w, --write", "Write to the input file (in-place editing)")
	.option(
		"-t, --tool <...tools>",
		"Tools to enable, default to enable all tools",
		(val: string) => val.split(","),
		[],
	)
	.action(async (file: string, options: { output?: string; write?: boolean; tool: string[] }) => {
		const { output, write, tool } = options;

		const raw = fs.readFileSync(file, "utf-8");

		const processor = remark();
		if (!tool || tool.length === 0) {
			processor.use(LinkProbe()).use(ImageDescriber(path.dirname(file)));
		} else {
			for (const t of tool) {
				switch (t) {
					case "link-probe":
						processor.use(LinkProbe());
						break;
					case "image-describer":
						processor.use(ImageDescriber(path.dirname(file)));
						break;
					default:
						console.warn(`Unknown tool ${t}`);
						break;
				}
			}
		}

		const md = processor.process(raw);
		const out = md.toString();

		if (output) {
			fs.writeFileSync(output, out);
		} else if (write) {
			fs.writeFileSync(file, out);
		} else {
			console.log(out);
		}
	});

export { program };
