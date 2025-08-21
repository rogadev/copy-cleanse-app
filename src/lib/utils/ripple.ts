/*
 * Ripple action — gives a brief visual feedback (material-style ripple) when a user taps/clicks an element.
 * Usage: <button use:ripple>…</button>
 */

export function ripple(node: HTMLElement) {
	// Ensure the host element can position the ripple correctly
	const originalPosition = getComputedStyle(node).position;
	if (originalPosition === 'static' || originalPosition === '') {
		node.style.position = 'relative';
	}
	node.style.overflow = 'hidden';

	function handlePointerDown(event: PointerEvent) {
		// Ignore right-clicks or non-primary buttons
		if (event.button && event.button !== 0) return;

		const rect = node.getBoundingClientRect();
		const diameter = Math.max(rect.width, rect.height);
		const radius = diameter / 2;

		// Coordinates relative to the element
		const top = event.clientY - rect.top - radius;
		const left = event.clientX - rect.left - radius;

		const ripple = document.createElement('span');
		ripple.style.position = 'absolute';
		ripple.style.borderRadius = '50%';
		ripple.style.pointerEvents = 'none';
		ripple.style.width = ripple.style.height = `${diameter}px`;
		ripple.style.top = `${top}px`;
		ripple.style.left = `${left}px`;
		ripple.style.backgroundColor = 'rgba(255,255,255,0.3)';
		ripple.style.transform = 'scale(0)';
		ripple.style.opacity = '1';
		ripple.style.transition = 'transform 400ms ease-out, opacity 400ms ease-out';

		node.appendChild(ripple);

		// Trigger the animation asynchronously so the initial state is applied first
		requestAnimationFrame(() => {
			ripple.style.transform = 'scale(2.5)';
			ripple.style.opacity = '0';
		});

		function cleanup() {
			ripple.removeEventListener('transitionend', cleanup);
			ripple.remove();
		}

		ripple.addEventListener('transitionend', cleanup);
	}

	node.addEventListener('pointerdown', handlePointerDown);

	return {
		destroy() {
			node.removeEventListener('pointerdown', handlePointerDown);
			// Restore original styles if we modified them
			if (originalPosition === 'static' || originalPosition === '') {
				node.style.position = '';
			}
			node.style.overflow = '';
		}
	};
}
