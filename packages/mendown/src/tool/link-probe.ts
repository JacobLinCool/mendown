import type { Plugin } from "unified";
import type { Node } from "unified/lib";
import { visit } from "unist-util-visit";

function LinkProbe(): Plugin {
	return () => async (tree: Node) => {
		const nodes: any[] = [];

		visit(tree, "link", (node: any) => {
			if (node.url.startsWith("http")) {
				nodes.push(node);
			}
		});

		for (const node of nodes) {
			try {
				const url = new URL(node.url);
				const res = await fetch(url);
				if (!res.ok) {
					console.warn(
						`Link ${node.url} is broken! (status ${res.status}) [Line ${node.position.start.line}]`,
					);
				}
			} catch (e) {
				console.error(
					`Link ${node.url} may be broken. (${e}) [Line ${node.position.start.line}]`,
				);
			}
		}
	};
}

export { LinkProbe };
