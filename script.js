// Scroll fade-in

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add('visible');
			}
		});
	},
	{ threshold: 0.12 },
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Nav active link highlight

const sections = document.querySelectorAll('section[id]');

const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
	let cur = '';

	sections.forEach((s) => {
		if (window.scrollY >= s.offsetTop - 100) cur = s.id;
	});

	navLinks.forEach((a) => {
		a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--teal)' : '';
	});
});
