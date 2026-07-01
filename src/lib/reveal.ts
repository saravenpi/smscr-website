// Svelte action: reveal an element when it scrolls into view.
// Markup keeps the `reveal` class so content is visible without JS
// (opacity is only dropped under the `.js` html class — see app.css).
export function reveal(node: HTMLElement, opts: { delay?: number } = {}) {
	const apply = (o: { delay?: number }) => {
		node.style.setProperty('--reveal-delay', `${o.delay ?? 0}ms`);
	};
	apply(opts);

	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (reduce || typeof IntersectionObserver === 'undefined') {
		node.classList.add('in-view');
		return {
			update: apply
		};
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);

	return {
		update: apply,
		destroy() {
			io.disconnect();
		}
	};
}
