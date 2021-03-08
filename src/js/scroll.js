const easingOutQuint = (x, t, b, c, d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b;

const makeScroll = (node, value, key = 'scrollTop') => {
	let startTime = null;
	const offset = node[key];
	const gap = value - offset;
	const duration = 1000;

	const step = (t) => {
		if (!startTime) {
			startTime = t;
		}
		const elapsed = t - startTime;
		const percentage = elapsed / duration;

		if (percentage > 1) {
			return;
		}
		node[key] = easingOutQuint(0, elapsed, offset, gap, duration);
		requestAnimationFrame(step);
	};

	step();
};

export const smoothScrollPolyfill = (link, event) => {
	const hasNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
	if (hasNativeSmoothScroll) {
		return;
	}
	event.preventDefault();
	const href = link.getAttribute('href') || '';
	const target = document.querySelector(href);
	if (target) {
		const topOffset = target.getBoundingClientRect().top;
		makeScroll(document.documentElement, topOffset);
	}
};
