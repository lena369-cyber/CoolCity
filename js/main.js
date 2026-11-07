/* ==========================================================================
   COOLCITY — MAIN ENTRY POINT & GLOBAL NAVIGATION
   ========================================================================== */

(function () {
  'use strict';

  // Modern Icon-Based Navigation Drawer Controller (Mobile & Desktop)
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    if (mobileToggle) mobileToggle.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (window.CoolCityAudio) window.CoolCityAudio.playClick(720);
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      closeDrawer();
      if (window.CoolCityAudio) window.CoolCityAudio.playClick(480);
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => {
      closeDrawer();
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeDrawer();
      if (window.CoolCityAudio) window.CoolCityAudio.playClick(640);

      // Special action for "Global View": Reset world map to full global overview
      const action = link.getAttribute('data-action');
      if (action === 'global-view' && window.CoolCityWorldMap) {
        setTimeout(() => {
          window.CoolCityWorldMap.resetView();
        }, 300);
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Active Navigation on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // Live UTC Clock & Telemetry Timestamp
  function updateLiveClock() {
    const clockElements = document.querySelectorAll('.live-utc-clock');
    if (!clockElements.length) return;

    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const dateStr = now.toISOString().split('T')[0];

    clockElements.forEach(el => {
      el.textContent = `${dateStr} ${hours}:${minutes}:${seconds} UTC`;
    });
  }

  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // Console Welcome Banner (BLITZ Aesthetic)
  console.log(
    '%c COOLCITY %c URBAN HEAT MITIGATION OS %c v2.6.4 ',
    'background: #c8f331; color: #050e08; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'background: #0d2216; color: #c8f331; padding: 4px 8px;',
    'background: #193e29; color: #ffffff; padding: 4px 8px;'
  );
})();
