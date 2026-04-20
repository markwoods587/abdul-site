// ── HAMBURGER MENU (declared first so all code below can use it) ──

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

// Close when a mobile nav link is clicked (but NOT the dropdown toggle button, and NOT sub-menu links)
mobileNav.querySelectorAll('a').forEach((link) => {
	// Don't auto-close for links inside the sub-menu — they navigate away anyway
	if (!link.closest('.mobile-sub-menu')) {
		link.addEventListener('click', closeMobileNav);
	}
});

// ── LOCATIONS DROPDOWN (desktop) ──

document.querySelectorAll('.nav-dropdown-item').forEach((item) => {
	const btn = item.querySelector('.nav-dropdown-btn');
	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		const isOpen = item.classList.contains('open');
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

// Close desktop dropdown when clicking anywhere else
document.addEventListener('click', () => {
	document.querySelectorAll('.nav-dropdown-item').forEach((i) => {
		i.classList.remove('open');
		i.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
	});
});

// ── LOCATIONS DROPDOWN (mobile) ──

document.querySelectorAll('.mobile-dropdown-item').forEach((item) => {
	const btn = item.querySelector('.mobile-dropdown-btn');
	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		const isOpen = item.classList.contains('open');
		item.classList.toggle('open', !isOpen);
		btn.setAttribute('aria-expanded', String(!isOpen));
	});
});

// ── SCROLL FADE-IN ──

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

// ── NAV ACTIVE LINK HIGHLIGHT ──

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
	let cur = '';

	sections.forEach((s) => {
		if (window.scrollY >= s.offsetTop - 100) cur = s.id;
	});

	navLinks.forEach((a) => {
		a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--teal)' : '';
	});

	// Close mobile nav only if user scrolled more than 40px (avoids accidental close)
	if (
		mobileNav.classList.contains('open') &&
		Math.abs(window.scrollY - lastScrollY) > 40
	) {
		closeMobileNav();
	}
	lastScrollY = window.scrollY;
});
