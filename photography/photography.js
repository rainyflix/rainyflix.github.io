// photography.js

// Element references with renamed variables to avoid conflicts
const photoOverlay = document.getElementById('imageOverlay');
const photoModal = document.getElementById('imageModal');
const photoPage = document.getElementById('page');
const lightboxFigure = document.getElementById('lightboxFigure');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeLightboxBtn = document.getElementById('closeLightbox');
const thumbs = document.querySelectorAll('.thumb');

// Artwork library: keys map to large image HTML strings or SVGs
const artworkLibrary = {
  'art-1': `<img src="../images/moss-tree.jpg" alt="A moss-covered tree" style="width: 100%; height: auto; border-radius: 28px;" />`,
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

function openLightbox(button) {
  if (!photoOverlay || !photoModal || !photoPage) return;

  const title = button.dataset.title || 'Expanded image';
  const subtitle = button.dataset.subtitle || 'Portfolio preview';
  const artKey = button.dataset.art || 'art-1';
  const purchaseLink = button.dataset.purchaseLink || '';

  lightboxTitle.textContent = title;
  lightboxDesc.textContent = subtitle;
  lightboxFigure.innerHTML = artworkLibrary[artKey] || artworkLibrary['art-1'];

  const purchaseButton = document.getElementById('purchaseButton');
  const purchaseStatus = document.getElementById('purchaseStatus');

  if (purchaseLink.trim() !== '') {
    purchaseButton.disabled = false;
    purchaseStatus.textContent = 'Available';
    purchaseButton.classList.remove('disabled');

    // Update button click to open purchase link
    purchaseButton.onclick = () => {
      window.open(purchaseLink, '_blank');
    };
  } else {
    purchaseButton.disabled = true;
    purchaseStatus.textContent = 'Unavailable';
    purchaseButton.classList.add('disabled');

    // Remove click handler if unavailable
    purchaseButton.onclick = null;
  }

  photoOverlay.hidden = false;

  const scrollbarWidth = getScrollbarWidth();
  document.body.style.paddingRight = scrollbarWidth + 'px';

  document.body.classList.add('modal-open');
  photoPage.classList.add('is-blurred');

  closeLightboxBtn.focus();
}

// Close modal and restore page state
function closeModal() {
  if (!photoOverlay || !photoPage) return;

  photoOverlay.hidden = true;
  document.body.style.paddingRight = '';
  document.body.classList.remove('modal-open');
  photoPage.classList.remove('is-blurred');

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
photoOverlay.addEventListener('click', (e) => {
  if (e.target === photoOverlay) {
    closeModal();
  }
});

// Prevent modal close when clicking inside modal content
photoModal.addEventListener('click', (e) => e.stopPropagation());

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !photoOverlay.hidden) {
    closeModal();
  }
});

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
