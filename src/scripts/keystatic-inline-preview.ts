const previewPath = /^\/preview\/(product|faq)$/;

if (typeof window !== 'undefined' && window.location.pathname.startsWith('/keystatic')) {
	const panel = document.createElement('aside');
	panel.id = 'keystatic-inline-preview';
	panel.hidden = true;
	panel.innerHTML = `
		<div class="keystatic-inline-preview__toolbar">
			<strong>Предпросмотр</strong>
			<div>
				<button type="button" data-preview-refresh>Обновить</button>
				<button type="button" data-preview-close aria-label="Закрыть предпросмотр">×</button>
			</div>
		</div>
		<iframe title="Предпросмотр сайта" data-preview-frame></iframe>
	`;

	const style = document.createElement('style');
	style.textContent = `
		#keystatic-inline-preview {
			background: #171717;
			border-left: 1px solid #444;
			bottom: 0;
			box-shadow: -18px 0 48px rgba(0, 0, 0, .32);
			display: grid;
			grid-template-rows: auto minmax(0, 1fr);
			height: 100dvh;
			position: fixed;
			right: 0;
			top: 0;
			width: min(48vw, 720px);
			z-index: 10000;
		}
		#keystatic-inline-preview[hidden] { display: none; }
		.keystatic-inline-preview__toolbar {
			align-items: center;
			background: #242424;
			border-bottom: 1px solid #444;
			display: flex;
			font: 600 14px/1.2 system-ui, sans-serif;
			justify-content: space-between;
			padding: 12px 14px;
		}
		.keystatic-inline-preview__toolbar div { display: flex; gap: 8px; }
		.keystatic-inline-preview__toolbar button {
			background: #333;
			border: 1px solid #555;
			border-radius: 7px;
			color: #f4f4f4;
			cursor: pointer;
			font: inherit;
			padding: 6px 9px;
		}
		.keystatic-inline-preview__toolbar button:hover { background: #444; }
		.keystatic-inline-preview__toolbar [data-preview-close] { font-size: 20px; line-height: 14px; }
		#keystatic-inline-preview iframe { background: #100e0e; border: 0; height: 100%; width: 100%; }
		@media (max-width: 900px) {
			#keystatic-inline-preview { width: min(100vw, 640px); }
		}
	`;
	document.head.append(style, panel);

	const frame = panel.querySelector<HTMLIFrameElement>('[data-preview-frame]');
	const refresh = panel.querySelector<HTMLButtonElement>('[data-preview-refresh]');
	const close = panel.querySelector<HTMLButtonElement>('[data-preview-close]');

	const refreshPreview = () => {
		if (frame?.src) frame.src = frame.src;
	};

	refresh?.addEventListener('click', refreshPreview);
	close?.addEventListener('click', () => {
		panel.hidden = true;
	});

	document.addEventListener(
		'click',
		(event) => {
			if (!(event.target instanceof Element)) return;
			const link = event.target.closest<HTMLAnchorElement>('a[href]');
			if (!link) return;

			const url = new URL(link.href, window.location.origin);
			if (!previewPath.test(url.pathname)) return;

			event.preventDefault();
			event.stopImmediatePropagation();
			if (frame) frame.src = url.toString();
			panel.hidden = false;
		},
		true,
	);
}
