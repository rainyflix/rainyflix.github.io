// photography.js

const overlay = document.getElementById('imageOverlay');
const modal = document.getElementById('imageModal');
const page = document.getElementById('page');
const lightboxFigure = document.getElementById('lightboxFigure');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeLightbox = document.getElementById('closeLightbox');
const thumbs = document.querySelectorAll('.thumb');

const artworkLibrary = {
  'art-1': `<img src="../images/moss-tree.jpg" alt="Title large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-2': `<img src="path/to/your-image2-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-3': `<img src="path/to/your-image3-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-4': `<img src="path/to/your-image4-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-5': `<img src="path/to/your-image5-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-6': `<img src="path/to/your-image6-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-7': `<img src="path/to/your-image7-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-8': `<img src="path/to/your-image8-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
};
    <svg viewBox="0 0 1200 900" role="img" aria-labelledby="lightboxTitle lightboxDesc" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lb1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffd0b8"/>
          <stop offset="40%" stop-color="#9989ed"/>
          <stop offset="100%" stop-color="#253764"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#lb1)"/>
      <ellipse cx="245" cy="180" rx="220" ry="100" fill="rgba(255,244,220,0.20)"/>
      <rect y="550" width="1200" height="350" fill="#1d2e24"/>
      <polygon points="20,580 210,300 390,580" fill="#15231b"/>
      <polygon points="250,580 520,170 740,580" fill="#22362a"/>
      <polygon points="610,580 840,250 1040,580" fill="#18271e"/>
      <polygon points="900,580 1100,340 1200,580" fill="#22372a"/>
      <rect y="555" width="1200" height="110" fill="rgba(255,255,255,0.10)"/>
    </svg>
  `,
  // Add other artworks similarly...
};

function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  document.body.appendChild(scrollDiv);

  const innerDiv = document.createElement('div');
  innerDiv.style.width = '100%';
  innerDiv.style.height = '100%';
  scrollDiv.appendChild(innerDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - innerDiv.offsetWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

function openLightbox(button) {
  if (!overlay || !modal || !page) return;

  const title = button.dataset.title || 'Expanded image';
  const subtitle = button.dataset.subtitle || 'Portfolio preview';
  const artKey = button.dataset.art || 'art-1';

  lightboxTitle.textContent = title;
  lightboxDesc.textContent = subtitle;
  lightboxFigure.innerHTML = artworkLibrary[artKey] || artworkLibrary['art-1'];

  overlay.hidden = false;
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.paddingRight = scrollbarWidth + 'px';
  document.body.classList.add('modal-open');
  page.classList.add('is-blurred');

  closeLightbox.focus();
}

function closeModal() {
  if (!overlay || !page) return;

  overlay.hidden = true;
  document.body.style.paddingRight = '';
  document.body.classList.remove('modal-open');
  page.classList.remove('is-blurred');
}

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => openLightbox(thumb));
});

closeLightbox.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) closeModal();
});

modal.addEventListener('click', (e) => e.stopPropagation());

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) {
    closeModal();
  }
});

// Optional: Animate reveal on scroll for elements with .reveal class
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'riseIn 0.7s ease both';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));
