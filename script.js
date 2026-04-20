// ── LOCATIONS DROPDOWN (desktop) ──

document.querySelectorAll('.nav-dropdown-item').forEach((item) => {
	const btn = item.querySelector('.nav-dropdown-btn');
	btn.addEventListener('click', (e) => {
		e.stopPropagation(); // prevent document click from firing immediately
		const isOpen = item.classList.contains('open');
		// close all dropdowns first
		document.querySelectorAll('.nav-dropdown-item').forEach((i) => {
			i.classList.remove('open');
			i.querySelector('.nav-dropdown-btn').setAttribute(
				'aria-expanded',
				'false',
			);
		});
		if (!isOpen) {
			item.classList.add('open');
			btn.setAttribute('aria-expanded', 'true');
		}
	});
});

// Close dropdown when clicking anywhere else
document.addEventListener('click', () => {
	document.querySelectorAll('.nav-dropdown-item').forEach((i) => {
		i.classList.remove('open');
		i.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
	});
});

// ── LOCATIONS DROPDOWN (mobile) ──

document.querySelectorAll('.mobile-dropdown-item').forEach((item) => {
	const btn = item.querySelector('.mobile-dropdown-btn');
	btn.addEventListener('click', () => {
		const isOpen = item.classList.contains('open');
		item.classList.toggle('open', !isOpen);
		btn.setAttribute('aria-expanded', String(!isOpen));
	});
});

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
