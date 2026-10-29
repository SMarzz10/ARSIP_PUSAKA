(function () {
  // Kontrol video hanya dipasang pada halaman yang memiliki elemen video hero.
  const video = document.querySelector("#hero-video");
  const toggle = document.querySelector("#hero-video-toggle");
  const status = document.querySelector("#hero-video-status");
  if (!video || !toggle || !status) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function syncToggle() {
    const isPlaying = !video.paused && !video.ended;
    toggle.textContent = isPlaying ? "Jeda video" : "Putar video";
    toggle.setAttribute("aria-label", isPlaying ? "Jeda video latar" : "Putar video latar");
  }

  if (reducedMotion.matches) {
    video.removeAttribute("autoplay");
    video.pause();
  }

  toggle.addEventListener("click", function () {
    if (video.paused || video.ended) {
      video.play().catch(function () {
        status.textContent = "Video tidak dapat diputar. Coba muat ulang halaman.";
      });
      return;
    }
    video.pause();
  });

  video.addEventListener("play", syncToggle);
  video.addEventListener("pause", syncToggle);
  video.addEventListener("ended", syncToggle);
  video.addEventListener("error", function () {
    status.textContent = "Video tidak dapat dimuat. Coba muat ulang halaman.";
    toggle.disabled = true;
  });

  reducedMotion.addEventListener("change", function (event) {
    if (event.matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }
    syncToggle();
  });

  syncToggle();
})();
