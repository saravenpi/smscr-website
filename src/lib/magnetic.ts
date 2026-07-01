// Svelte action: gently pull an element toward the cursor while hovering it.
// Disabled on touch and when the user prefers reduced motion.
export function magnetic(node: HTMLElement, opts: { strength?: number } = {}) {
	const fine = typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches;
	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (!fine || reduce) return {};

	const strength = opts.strength ?? 0.22;
	let raf = 0;

	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const dx = e.clientX - (r.left + r.width / 2);
		const dy = e.clientY - (r.top + r.height / 2);
		if (!raf) {
			raf = requestAnimationFrame(() => {
				raf = 0;
				node.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
			});
		}
	};

	const reset = () => {
		cancelAnimationFrame(raf);
		raf = 0;
		node.style.transform = '';
	};

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', reset);

	return {
		destroy() {
			cancelAnimationFrame(raf);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', reset);
		}
	};
}
