import { Aid, OpenAIQuery } from "@ai-d/aid";
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import type { Plugin } from "unified";
import type { Node } from "unified/lib";
import { visit } from "unist-util-visit";
import { z } from "zod";

function ImageDescriber(base: string): Plugin {
	const openai = new OpenAI();
	const aid = Aid.vision(
		OpenAIQuery(openai, { model: "gpt-4-vision-preview", max_tokens: 2048 }),
	);

	const describe = aid.task(
		"Describe the image",
		z.object({
			description: z.string().max(160),
		}),
	);

	return () => async (tree: Node) => {
		const nodes: any[] = [];

		visit(tree, "image", (node: any) => {
			if (node.alt) {
				return;
			}
			nodes.push(node);
		});

		const supported = ["png", "jpg", "jpeg"];
		for (const node of nodes) {
			try {
				if (node.url.startsWith("http")) {
					const url = new URL(node.url);
					const ext = url.pathname.split(".").pop()?.toLowerCase() || "";
					if (supported.includes(ext)) {
						const { result } = await describe({ images: [{ url: url.toString() }] });
						node.alt = result.description;
					}
				} else {
					const file = path.join(base, node.url);
					const ext = file.split(".").pop()?.toLowerCase() || "";
					if (supported.includes(ext)) {
						const base64 = fs.readFileSync(file, "base64");
						const { result } = await describe({
							images: [{ url: `data:image/${ext};base64,${base64}` }],
						});
						node.alt = result.description;
					}
				}
			} catch (e) {
				console.error(e);
			}
		}
	};
}

export { ImageDescriber };
