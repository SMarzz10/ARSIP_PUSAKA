(function () {
  "use strict";

  const track = document.querySelector("#heritage-cards");
  const previous = document.querySelector(".heritage-nav-btn--prev");
  const next = document.querySelector(".heritage-nav-btn--next");
  if (!track || !previous || !next) return;

  const cards = Array.from(track.querySelectorAll(".heritage-card"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateControls() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  }

  function scrollCards(direction) {
    const firstCard = cards[0];
    if (!firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }

  previous.addEventListener("click", function () { scrollCards(-1); });
  next.addEventListener("click", function () { scrollCards(1); });
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls, { passive: true });
  updateControls();
})();
