// Get elements
const fitnessBtn = document.getElementById('fitnessBtn');
const overlay = document.getElementById('fitnessOverlay');
const modal = document.getElementById('fitnessModal');
const page = document.getElementById('page');
const copyButton = document.getElementById('copyButton');

// Utility to get scrollbar width
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

// Open modal function
function openFitnessModal() {
  overlay.hidden = false;
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.paddingRight = scrollbarWidth + 'px';
  document.body.classList.add('modal-open');
  page.classList.add('is-blurred');
  copyButton.classList.add('is-blurred');

  const firstFocusable = modal.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) firstFocusable.focus();
}

// Close modal function
function closeFitnessModal() {
  overlay.hidden = true;
  document.body.style.paddingRight = '';
  document.body.classList.remove('modal-open');
  page.classList.remove('is-blurred');
  copyButton.classList.remove('is-blurred');
}

// Event listeners for modal open/close
fitnessBtn.addEventListener('click', openFitnessModal);

overlay.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) closeFitnessModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) closeFitnessModal();
});

modal.addEventListener('click', (e) => e.stopPropagation());

// Copy URL button functionality
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copyButton.classList.add('copied');
    setTimeout(() => {
      copyButton.classList.remove('copied');
    }, 1500);
  }).catch(err => {
    alert('Failed to copy URL: ' + err);
  });
});