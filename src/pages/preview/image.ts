import {
	getGitHubFile,
	isPreviewBranch,
	resolveRepositoryPath,
} from '../../lib/github-preview';

export const prerender = false;

const mimeTypes: Record<string, string> = {
	avif: 'image/avif',
	gif: 'image/gif',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp',
};

export async function GET({ url }: { url: URL }) {
	const branch = url.searchParams.get('branch');
	const sourcePath = url.searchParams.get('path');

	if (!isPreviewBranch(branch) || !sourcePath) {
		return new Response('Invalid preview request.', { status: 400 });
	}

	const path = resolveRepositoryPath('src/content/locks/entry.yaml', sourcePath);
	if (!path?.startsWith('src/assets/images/locks/') || !/\.(avif|gif|jpe?g|png|webp)$/i.test(path)) {
		return new Response('Invalid image path.', { status: 400 });
	}

	try {
		const extension = path.split('.').pop()?.toLowerCase() ?? '';
		const image = await getGitHubFile(path, branch);
		return new Response(image.buffer as ArrayBuffer, {
			headers: {
				'Content-Type': mimeTypes[extension] ?? 'application/octet-stream',
				'Cache-Control': 'no-store',
			},
		});
	} catch {
		return new Response('Image not found in this branch.', { status: 404 });
	}
}
