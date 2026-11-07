/* ==========================================================================
   COOLCITY — UI INTERACTIONS, THERMAL SLIDER, AUDIO & FORMS
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. WEB AUDIO API SOUND SYSTEM (Zero external asset dependency)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.CoolCityAudio = {
    toggle: function () {
      initAudio();
      soundEnabled = !soundEnabled;
      return soundEnabled;
    },
    playClick: function (freq = 600) {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } catch (e) {}
    },
    playToggle: function (state) {
      if (!soundEnabled || !audioCtx) return;
      try {
        const freq = state ? 800 : 420;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(state ? 1100 : 320, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch (e) {}
    },
    playSuccess: function () {
      if (!soundEnabled || !audioCtx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
        notes.forEach((pitch, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(pitch, audioCtx.currentTime + (i * 0.06));
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime + (i * 0.06));
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i * 0.06) + 0.18);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + (i * 0.06));
          osc.stop(audioCtx.currentTime + (i * 0.06) + 0.18);
        });
      } catch (e) {}
    }
  };

  /* --------------------------------------------------------------------------
     2. GLOBAL TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  window.showToast = function (message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="toast-icon">✦</span>
      <span class="toast-text">${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  /* --------------------------------------------------------------------------
     3. THERMAL COMPARISON SLIDER (Before vs After Heat Island)
     -------------------------------------------------------------------------- */
  function initThermalSlider() {
    const container = document.getElementById('thermal-slider-wrap');
    const afterLayer = document.getElementById('thermal-layer-after');
    const handle = document.getElementById('thermal-slider-handle');

    if (!container || !afterLayer || !handle) return;

    let isDragging = false;

    function updateSlider(clientX) {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      const percentage = (offsetX / rect.width) * 100;

      afterLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /* --------------------------------------------------------------------------
     4. SUSTAINABLE SOLUTIONS FILTERING & ACCORDION
     -------------------------------------------------------------------------- */
  function initSolutionsFilter() {
    const filterPills = document.querySelectorAll('.solution-filter-pill');
    const cards = document.querySelectorAll('.solution-card');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.getAttribute('data-solution-cat');
        cards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-solution-cat') === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        if (window.CoolCityAudio) {
          window.CoolCityAudio.playClick(640);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. FAQ ACCORDION
     -------------------------------------------------------------------------- */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      if (header) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          faqItems.forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
            if (window.CoolCityAudio) window.CoolCityAudio.playClick(500);
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. CONTACT & HOTSPOT REPORT FORM
     -------------------------------------------------------------------------- */
  function initForms() {
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || 'Partner';
        contactForm.reset();
        window.showToast(`📩 Thank you ${name}! Your transmission has been logged with the CoolCity Climate Board.`);
        if (window.CoolCityAudio) window.CoolCityAudio.playSuccess();
      });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newsletterForm.reset();
        window.showToast(`🌿 Subscribed! You are now receiving weekly CoolCity microclimate telemetry.`);
        if (window.CoolCityAudio) window.CoolCityAudio.playSuccess();
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. SOUND TOGGLE BUTTON
     -------------------------------------------------------------------------- */
  function initSoundButton() {
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const state = window.CoolCityAudio.toggle();
        if (state) {
          soundBtn.classList.add('active');
          window.showToast("🔊 Audio telemetry feedback enabled");
          window.CoolCityAudio.playClick(880);
        } else {
          soundBtn.classList.remove('active');
          window.showToast("🔇 Audio feedback disabled");
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThermalSlider();
    initSolutionsFilter();
    initFAQ();
    initForms();
    initSoundButton();
  });
})();
