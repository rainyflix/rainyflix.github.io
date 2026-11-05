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
  'art-1': `<img src="../images/photography/moss-tree.jpg" alt="A moss-covered tree" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-2': `<img src="../images/photography/a-reflective-world.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-3': `<img src="../images/photography/hanging-lanterns.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-4': `<img src="../images/photography/edinburgh-christmas-market.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-5': `<img src="../images/photography/sunflower-garden.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-6': `<img src="../images/photography/fjord-sunset.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-7': `<img src="../images/photography/festplassen.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-8': `<img src="../images/photography/curious-cat.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-9': `<img src="../images/photography/dry-river-drain.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-10': `<img src="../images/photography/glowing-mushrooms.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-11': `<img src="../images/photography/cold-smile.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-12': `<img src="../images/photography/sleeping-bee.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-13': `<img src="../images/photography/cityscape-dawn.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-14': `<img src="../images/photography/misty-tower.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  'art-15': `<img src="../images/photography/norwegian-aurora.jpg" alt="Another large image" style="width: 100%; height: auto; border-radius: 28px;" />`,
  // Add other artworks similarly...
};

  const photoThumbList = Array.from(thumbs);
  const previousImageBtn = document.getElementById('previousImage');
  const nextImageBtn = document.getElementById('nextImage');
  const photoPurchaseButton = document.getElementById('purchaseButton');
  const photoPurchaseStatus = document.getElementById('purchaseStatus');

  let currentPhotoIndex = -1;
  let photoReturnFocus = null;
  let savedPhotoBodyPadding = '';

  function getScrollbarWidth() {
    return Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth
    );
  }

  // Shared by thumbnail clicks and previous/next navigation.
  function renderPhoto(button) {
    const title = button.dataset.title || 'Expanded image';
    const subtitle = button.dataset.subtitle || 'Portfolio preview';
    const artKey = button.dataset.art || 'art-1';
    const purchaseLink = (button.dataset.purchaseLink || '').trim();

    lightboxTitle.textContent = title;
    lightboxDesc.textContent = subtitle;
    lightboxFigure.innerHTML =
      artworkLibrary[artKey] || artworkLibrary['art-1'];

    const expandedImage = lightboxFigure.querySelector('img');
    if (expandedImage) {
      expandedImage.alt = button.querySelector('img')?.alt || title;
    }

    if (photoPurchaseButton && photoPurchaseStatus) {
      const available = purchaseLink !== '';

      photoPurchaseButton.disabled = !available;
      photoPurchaseButton.classList.toggle('disabled', !available);
      photoPurchaseStatus.textContent = available
        ? 'Available'
        : 'Unavailable';

      photoPurchaseButton.onclick = available
        ? () => window.open(purchaseLink, '_blank', 'noopener,noreferrer')
        : null;
    }
  }

  function openLightbox(button) {
    if (!photoOverlay || !photoModal || !lightboxFigure) return;

    currentPhotoIndex = photoThumbList.indexOf(button);
    if (currentPhotoIndex < 0) return;

    renderPhoto(button);

    if (photoOverlay.hidden) {
      photoReturnFocus = button;
      savedPhotoBodyPadding = document.body.style.paddingRight;

      // Measure BEFORE showing the overlay or locking page scrolling.
      const scrollbarWidth = getScrollbarWidth();
      const currentPadding =
        parseFloat(getComputedStyle(document.body).paddingRight) || 0;

      document.body.style.paddingRight =
        currentPadding + scrollbarWidth + 'px';
      document.body.classList.add('modal-open');

      photoOverlay.hidden = false;
      closeLightboxBtn.focus({ preventScroll: true });
    }
  }

  function navigatePhoto(direction) {
    if (photoOverlay.hidden || photoThumbList.length < 2) return;

    currentPhotoIndex =
      (currentPhotoIndex + direction + photoThumbList.length) %
      photoThumbList.length;

    renderPhoto(photoThumbList[currentPhotoIndex]);
  }

  function closeModal() {
    if (!photoOverlay || photoOverlay.hidden) return;

    photoOverlay.hidden = true;
    document.body.style.paddingRight = savedPhotoBodyPadding;
    document.body.classList.remove('modal-open');
    lightboxFigure.innerHTML = '';

    photoReturnFocus?.focus({ preventScroll: true });
  }

  photoThumbList.forEach((thumb) => {
    thumb.addEventListener('click', () => openLightbox(thumb));
  });

  previousImageBtn?.addEventListener('click', () => navigatePhoto(-1));
  nextImageBtn?.addEventListener('click', () => navigatePhoto(1));

  // Hide navigation if there is only one photograph.
  if (previousImageBtn) previousImageBtn.hidden = photoThumbList.length < 2;
  if (nextImageBtn) nextImageBtn.hidden = photoThumbList.length < 2;

  closeLightboxBtn.addEventListener('click', closeModal);

  photoOverlay.addEventListener('click', (event) => {
    if (event.target === photoOverlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (photoOverlay.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    const isEditing = event.target instanceof Element &&
      event.target.closest('input, textarea, select, [contenteditable="true"]');

    if (!isEditing && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      navigatePhoto(event.key === 'ArrowLeft' ? -1 : 1);
      return;
    }

    // Keep keyboard focus inside the open dialog.
    if (event.key === 'Tab') {
      const focusable = Array.from(
        photoModal.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), ' +
          'select:not([disabled]), textarea:not([disabled]), ' +
          '[tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !photoModal.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey &&
                 (active === last || !photoModal.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Existing scroll-reveal behavior.
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'riseIn 0.7s ease backwards';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
