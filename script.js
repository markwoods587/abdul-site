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

	// Close mobile nav on scroll
	if (mobileNav.classList.contains('open')) closeMobileNav();
});

// ── HAMBURGER MENU ──

const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
	toggle.classList.remove('open');
	toggle.setAttribute('aria-expanded', 'false');
	mobileNav.classList.remove('open');
	mobileNav.setAttribute('aria-hidden', 'true');
}

toggle.addEventListener('click', () => {
	const isOpen = mobileNav.classList.contains('open');
	if (isOpen) {
		closeMobileNav();
	} else {
		toggle.classList.add('open');
		toggle.setAttribute('aria-expanded', 'true');
		mobileNav.classList.add('open');
		mobileNav.setAttribute('aria-hidden', 'false');
	}
});

// Close when a mobile nav link is clicked
mobileNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', closeMobileNav);
});