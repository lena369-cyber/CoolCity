/* ==========================================================================
   COOLCITY — COMMUNITY ACTIVITIES, REGISTRATION MODAL & PLEDGE WALL
   ========================================================================== */

(function () {
  'use strict';

  // Sample default community pledges
  const initialPledges = [
    { name: "Elena Rostova", district: "Downtown Core", text: "Coating our apartment building's 400m² black bitumen roof with white elastomeric cool paint." },
    { name: "Marcus Vance", district: "Old Town", text: "Planting 4 native oak shade trees in my front yard and replacing asphalt driveway with gravel." },
    { name: "Aria Chen", district: "Tech Park", text: "Joined the Citizen IoT Thermal Sensor Patrol to map microclimates during July heat spikes." },
    { name: "Liam & Sarah K.", district: "Riverfront", text: "Installed a 1,200L rainwater retention barrel and bioswale garden to recharge groundwater." }
  ];

  // DOM Elements
  const eventCards = document.querySelectorAll('.event-card');
  const eventFilterPills = document.querySelectorAll('.event-filter-pill');
  const registerModal = document.getElementById('register-modal');
  const registerModalClose = document.getElementById('register-modal-close');
  const registerForm = document.getElementById('register-event-form');
  const modalEventName = document.getElementById('modal-event-name');
  let currentTargetEventCard = null;

  // Pledge Wall DOM Elements
  const pledgeForm = document.getElementById('community-pledge-form');
  const pledgeNameInput = document.getElementById('pledge-name');
  const pledgeDistrictInput = document.getElementById('pledge-district');
  const pledgeTextInput = document.getElementById('pledge-text');
  const pledgeContainer = document.getElementById('pledge-cards-container');

  // Event Filtering
  eventFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      eventFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.CoolCityAudio) {
        window.CoolCityAudio.playClick(600);
      }
    });
  });

  // Modal Open for Event Registration
  document.querySelectorAll('.btn-register-event').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.event-card');
      currentTargetEventCard = card;
      const title = card.querySelector('.event-title')?.textContent || "Community Action";
      if (modalEventName) modalEventName.textContent = title;
      if (registerModal) registerModal.classList.add('is-open');
    });
  });

  // Modal Close
  if (registerModalClose) {
    registerModalClose.addEventListener('click', () => {
      if (registerModal) registerModal.classList.remove('is-open');
    });
  }

  // Close modal when clicking on backdrop
  if (registerModal) {
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        registerModal.classList.remove('is-open');
      }
    });
  }

  // Handle Event Registration Submit
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('reg-user-name')?.value || "Citizen";
      
      // Decrement spots count on the card
      if (currentTargetEventCard) {
        const spotsEl = currentTargetEventCard.querySelector('.event-spots-count');
        if (spotsEl) {
          let count = parseInt(spotsEl.textContent, 10);
          if (count > 1) {
            spotsEl.textContent = `${count - 1} spots left`;
          } else {
            spotsEl.textContent = `Fully booked!`;
            spotsEl.style.color = '#ef4444';
          }
        }
      }

      if (registerModal) registerModal.classList.remove('is-open');
      registerForm.reset();

      if (window.showToast) {
        window.showToast(`🎉 Registration confirmed for ${userName}! Check your email for action coordinates.`);
      }

      if (window.CoolCityAudio) {
        window.CoolCityAudio.playSuccess();
      }
    });
  }

  // Render Pledge Card
  function createPledgeElement(pledge) {
    const card = document.createElement('div');
    card.className = 'pledge-card';
    card.innerHTML = `
      <p style="color: var(--color-text-main); font-size: 0.95rem; font-style: italic;">“${pledge.text}”</p>
      <div class="pledge-author">
        <span style="font-weight: 700; color: var(--color-white);">${pledge.name}</span>
        <span style="color: var(--color-text-muted);">// ${pledge.district}</span>
      </div>
    `;
    return card;
  }

  // Initial render of pledges
  function initPledgeWall() {
    if (!pledgeContainer) return;
    pledgeContainer.innerHTML = '';
    initialPledges.forEach(item => {
      pledgeContainer.appendChild(createPledgeElement(item));
    });
  }

  // Handle New Pledge Submission
  if (pledgeForm) {
    pledgeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = pledgeNameInput.value.trim();
      const district = pledgeDistrictInput.value.trim();
      const text = pledgeTextInput.value.trim();

      if (!name || !district || !text) return;

      const newPledge = { name, district, text };
      const el = createPledgeElement(newPledge);

      if (pledgeContainer) {
        pledgeContainer.insertBefore(el, pledgeContainer.firstChild);
      }

      pledgeForm.reset();

      if (window.showToast) {
        window.showToast(`🌱 Thank you ${name}! Your climate cooling pledge has been broadcasted.`);
      }

      if (window.CoolCityAudio) {
        window.CoolCityAudio.playSuccess();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPledgeWall();
  });
})();
