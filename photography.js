// photography.js

// Element references
const overlay = document.getElementById('imageOverlay');
const modal = document.getElementById('imageModal');
const page = document.getElementById('page');
const lightboxFigure = document.getElementById('lightboxFigure');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeLightboxBtn = document.getElementById('closeLightbox');
const thumbs = document.querySelectorAll('.thumb');

// Artwork library: keys map to large image HTML strings or SVGs
const artworkLibrary = {
  'art-1': `<img src="../images/moss-tree.jpg" alt="Title large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-2': `<img src="path/to/your-image2-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-3': `<img src="path/to/your-image3-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-4': `<img src="path/to/your-image4-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-5': `<img src="path/to/your-image5-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-6': `<img src="path/to/your-image6-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-7': `<img src="path/to/your-image7-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-8': `<img src="path/to/your-image8-large.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  // Add other artworks similarly...
};

// Utility: Calculate scrollbar width to avoid layout shift when modal opens
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

// Open modal and display selected artwork
function openLightbox(button) {
  if (!overlay || !modal || !page) return;

  const title = button.dataset.title || 'Expanded image';
  const subtitle = button.dataset.subtitle || 'Portfolio preview';
  const artKey = button.dataset.art || 'art-1';

  lightboxTitle.textContent = title;
  lightboxDesc.textContent = subtitle;
  lightboxFigure.innerHTML = artworkLibrary[artKey] || artworkLibrary['art-1'];

  overlay.hidden = false;

  // Prevent layout shift by compensating for scrollbar width
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.paddingRight = scrollbarWidth + 'px';

  // Add modal open classes and blur background content
  document.body.classList.add('modal-open');
  page.classList.add('is-blurred');

  // Accessibility: focus close button so screen readers know where focus is
  closeLightboxBtn.focus();
}

// Close modal and restore page state
function closeModal() {
  if (!overlay || !page) return;

  overlay.hidden = true;
  document.body.style.paddingRight = '';
  document.body.classList.remove('modal-open');
  page.classList.remove('is-blurred');

  // Clear modal content
  lightboxFigure.innerHTML = '';
}

// Attach event listeners to thumbnails to open modal
thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => openLightbox(thumb));
});

// Close modal when clicking close button
closeLightboxBtn.addEventListener('click', closeModal);

// Close modal when clicking outside modal content (on overlay background)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

// Prevent modal close when clicking inside modal content
modal.addEventListener('click', (e) => e.stopPropagation());

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) {
    closeModal();
  }
})

// IntersectionObserver for reveal animations on scroll
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
