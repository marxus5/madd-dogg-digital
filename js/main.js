// Keep the copyright year current.
document.getElementById('y').textContent = new Date().getFullYear();

// Hide the header while scrolling down and reveal it while scrolling up.
const header = document.querySelector('header');
let previousScrollY = window.scrollY;

header.classList.toggle('hidden', previousScrollY > 120);

function updateHeader() {
	const currentScrollY = window.scrollY;

	if (currentScrollY <= 120 || currentScrollY < previousScrollY) {
		header.classList.remove('hidden');
	} else if (currentScrollY > previousScrollY) {
		header.classList.add('hidden');
	}

	previousScrollY = currentScrollY;
}

window.addEventListener('scroll', updateHeader, { passive: true });

// Toggle the mobile navigation menu.
const links = document.getElementById('links');
const menuButton = document.getElementById('menu');

menuButton.addEventListener('click', () => {
	const isOpen = links.classList.toggle('open');
	menuButton.setAttribute('aria-expanded', isOpen);
});

links.addEventListener('click', (event) => {
	if (event.target.tagName === 'A') {
		links.classList.remove('open');
		menuButton.setAttribute('aria-expanded', 'false');
	}
});

// Reveal content when it enters the viewport.
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			}

			entry.target.classList.add('in');
			revealObserver.unobserve(entry.target);
		});
	},
	{ threshold: 0.12 },
);

document.querySelectorAll('.rv').forEach((element) => {
	revealObserver.observe(element);
});

// Build an email from the quote form.
document.getElementById('qf').addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const interest = formData.get('type');
	const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nCompany: ${formData.get('company')}\nInterest: ${interest}\n\n${formData.get('msg')}`;
	const subject = encodeURIComponent(`Quote request: ${interest}`);
	const message = encodeURIComponent(body);

	window.location.href = `mailto:ms@madd-dogg.co?subject=${subject}&body=${message}`;
});
