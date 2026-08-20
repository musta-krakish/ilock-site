import YAML from 'yaml';

export const previewRepository = 'musta-krakish/ilock-site';

type GitHubFile = {
	content?: string;
	encoding?: string;
};

export function isPreviewBranch(value: string | null): value is string {
	return Boolean(value && value.length <= 255 && /^[A-Za-z0-9._/-]+$/.test(value) && !value.includes('..'));
}

export function isPreviewSlug(value: string | null): value is string {
	return Boolean(value && /^[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?$/.test(value));
}

export function resolveRepositoryPath(baseFile: string, relativePath: string): string | null {
	const segments = baseFile.split('/').slice(0, -1);

	for (const segment of relativePath.split('/')) {
		if (!segment || segment === '.') continue;
		if (segment === '..') {
			segments.pop();
			continue;
		}
		segments.push(segment);
	}

	return segments.join('/');
}

export async function getGitHubFile(path: string, branch: string): Promise<Uint8Array> {
	const encodedPath = path.split('/').map(encodeURIComponent).join('/');
	const url = new URL(`https://api.github.com/repos/${previewRepository}/contents/${encodedPath}`);
	url.searchParams.set('ref', branch);

	const response = await fetch(url, {
		headers: { Accept: 'application/vnd.github+json' },
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`GitHub returned ${response.status} for ${path}`);
	}

	const file = (await response.json()) as GitHubFile;
	if (file.encoding !== 'base64' || typeof file.content !== 'string') {
		throw new Error(`GitHub did not return a base64 file for ${path}`);
	}

	const binary = atob(file.content.replace(/\s/g, ''));
	return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export async function getGitHubYaml(path: string, branch: string): Promise<unknown> {
	return YAML.parse(new TextDecoder().decode(await getGitHubFile(path, branch)));
}

export async function getGitHubText(path: string, branch: string): Promise<string> {
	return new TextDecoder().decode(await getGitHubFile(path, branch));
}
