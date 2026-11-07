/* ==========================================================================
   COOLCITY — ENVIRONMENTAL IMPACT & LIVE CALCULATOR SIMULATOR
   ========================================================================== */

(function () {
  'use strict';

  // Simulator Range Inputs
  const canopyInput = document.getElementById('sim-canopy');
  const roofsInput = document.getElementById('sim-roofs');
  const corridorsInput = document.getElementById('sim-corridors');

  // Display Labels for Input values
  const canopyDisplay = document.getElementById('sim-canopy-val');
  const roofsDisplay = document.getElementById('sim-roofs-val');
  const corridorsDisplay = document.getElementById('sim-corridors-val');

  // Output Elements
  const outTemp = document.getElementById('sim-out-temp');
  const outEnergy = document.getElementById('sim-out-energy');
  const outCarbon = document.getElementById('sim-out-carbon');
  const outHealth = document.getElementById('sim-out-health');

  // Animated counters for the top statistics cards
  function animateCounter(element, target, prefix = '', suffix = '') {
    if (!element) return;
    const duration = 1600;
    const start = 0;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (target - start) * ease);
      element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Recalculate Simulator Metrics
  function recalculateMetrics() {
    if (!canopyInput || !roofsInput || !corridorsInput) return;

    const canopy = parseFloat(canopyInput.value); // percentage (10 - 60)
    const roofs = parseFloat(roofsInput.value);   // percentage (0 - 100)
    const corridors = parseFloat(corridorsInput.value); // km (5 - 120)

    // Update label displays
    if (canopyDisplay) canopyDisplay.textContent = `${canopy}%`;
    if (roofsDisplay) roofsDisplay.textContent = `${roofs}%`;
    if (corridorsDisplay) corridorsDisplay.textContent = `${corridors} km`;

    // Mathematical Model based on EPA Urban Heat Island Mitigation research:
    // Every 10% canopy increase delivers approx ~0.85°C cooling
    // Every 20% high-albedo roof retrofit delivers ~0.65°C cooling
    // Every 20km green bioswale corridor delivers ~0.45°C microclimate reduction
    const tempDrop = (canopy * 0.078) + (roofs * 0.034) + (corridors * 0.022);
    const mwhSaved = Math.round((tempDrop * 26500) + (roofs * 480));
    const co2Tons = Math.round((canopy * 320) + (corridors * 95));
    const healthDrop = Math.min(88, Math.round(tempDrop * 11.5));

    if (outTemp) outTemp.textContent = `-${tempDrop.toFixed(1)}°C`;
    if (outEnergy) outEnergy.textContent = `${mwhSaved.toLocaleString()} MWh`;
    if (outCarbon) outCarbon.textContent = `${co2Tons.toLocaleString()} T`;
    if (outHealth) outHealth.textContent = `-${healthDrop}%`;
  }

  // Listen to slider inputs
  [canopyInput, roofsInput, corridorsInput].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', () => {
        recalculateMetrics();
      });
    }
  });

  // Intersection Observer to trigger top stats counter animation when scrolled into view
  function initCountersOnScroll() {
    const statCounters = document.querySelectorAll('.counter-animated');
    if (!statCounters.length) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statCounters.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            animateCounter(el, target, prefix, suffix);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('impact');
    if (statsSection) observer.observe(statsSection);
  }

  document.addEventListener('DOMContentLoaded', () => {
    recalculateMetrics();
    initCountersOnScroll();
  });
})();
