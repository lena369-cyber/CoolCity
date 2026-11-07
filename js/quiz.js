/* ==========================================================================
   COOLCITY — INTERACTIVE ECO QUIZ: "HOW COOL IS YOUR NEIGHBORHOOD?"
   ========================================================================== */

(function () {
  'use strict';

  const quizQuestions = [
    {
      question: "What percentage of your street or yard is shaded by mature tree canopy?",
      options: [
        { text: "Virtually zero trees; purely concrete and asphalt", points: 5 },
        { text: "A few sparse young saplings or ornamental shrubs", points: 12 },
        { text: "Moderate tree cover on sidewalks or gardens (~20–35%)", points: 19 },
        { text: "Dense continuous canopy shading streets & buildings (>45%)", points: 25 }
      ]
    },
    {
      question: "What are the prevailing roofing and paving materials on your block?",
      options: [
        { text: "Dark black bitumen/tar flat roofs and unshaded asphalt roads", points: 5 },
        { text: "Standard grey concrete tiles with conventional parking lots", points: 12 },
        { text: "Light-colored tiles with occasional permeable gravel surfaces", points: 18 },
        { text: "Reflective white high-albedo roofs, green roofs, or cool pavements", points: 25 }
      ]
    },
    {
      question: "During summer heatwaves, how does the temperature feel outdoors at midnight?",
      options: [
        { text: "Oppressively hot; masonry walls radiate trapped heat past midnight", points: 5 },
        { text: "Noticeably warm and stuffy with negligible breeze", points: 12 },
        { text: "Cools down gradually a few hours after sunset", points: 18 },
        { text: "Pleasantly crisp; cooled naturally by tree transpiration and soil", points: 25 }
      ]
    },
    {
      question: "How close are public green corridors, bioswales, or water features?",
      options: [
        { text: "More than a 25-minute drive; deep in an urban concrete island", points: 5 },
        { text: "A small barren grass patch within a 15-minute walk", points: 12 },
        { text: "A municipal park or tree-lined boulevard within 5–10 minutes", points: 18 },
        { text: "Directly adjacent to an active wetland buffer, riverfront, or microforest", points: 25 }
      ]
    },
    {
      question: "Does your community or local council enforce passive cooling measures?",
      options: [
        { text: "No initiatives exist; high reliance on runaway air conditioning", points: 5 },
        { text: "Occasional seasonal tree planting, but no cool roofing guidelines", points: 12 },
        { text: "Active citizen garden programs and voluntary cool roof retrofits", points: 19 },
        { text: "Strict municipal green canopy standards and cool pavement mandates", points: 25 }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let selectedOptionIndex = null;
  let totalScore = 0;

  // DOM Elements
  const quizActiveView = document.getElementById('quiz-active-view');
  const quizResultView = document.getElementById('quiz-result-view');
  const progressBar = document.getElementById('quiz-progress-bar');
  const stepLabel = document.getElementById('quiz-step-label');
  const questionTitle = document.getElementById('quiz-question-title');
  const optionsContainer = document.getElementById('quiz-options-list');
  const nextBtn = document.getElementById('quiz-next-btn');
  const restartBtn = document.getElementById('quiz-restart-btn');
  const copyBadgeBtn = document.getElementById('quiz-copy-badge-btn');

  // Results DOM Elements
  const resultTierBadge = document.getElementById('quiz-result-tier');
  const resultScoreVal = document.getElementById('quiz-result-score');
  const resultDescription = document.getElementById('quiz-result-desc');
  const resultPrescription = document.getElementById('quiz-result-prescription');

  function renderQuestion() {
    const qData = quizQuestions[currentQuestionIndex];
    if (!qData) return;

    selectedOptionIndex = null;
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.classList.add('btn-secondary');
      nextBtn.classList.remove('btn-primary');
      nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Calculate Diagnostic" : "Next Question";
    }

    if (stepLabel) {
      stepLabel.textContent = `Question [ 0${currentQuestionIndex + 1} // 0${quizQuestions.length} ]`;
    }

    if (progressBar) {
      const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    if (questionTitle) {
      questionTitle.textContent = qData.question;
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="quiz-option-text">${opt.text}</span>
          <span class="quiz-option-indicator"></span>
        `;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedOptionIndex = idx;
          if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('btn-secondary');
            nextBtn.classList.add('btn-primary');
          }
          if (window.CoolCityAudio) {
            window.CoolCityAudio.playClick(720);
          }
        });
        optionsContainer.appendChild(btn);
      });
    }
  }

  function showResults() {
    if (quizActiveView) quizActiveView.style.display = 'none';
    if (quizResultView) quizResultView.style.display = 'block';

    // Calculate percentage on 0 - 100 scale (max raw points is 125, min is 25)
    // Scale: (totalScore - 25) / 100 * 100 = totalScore - 25
    const finalScore = Math.max(10, Math.min(100, Math.round(((totalScore - 25) / 100) * 100)));

    if (resultScoreVal) resultScoreVal.textContent = finalScore;

    let tierTitle = "";
    let desc = "";
    let prescription = [];

    if (finalScore < 35) {
      tierTitle = "Thermal Heat Sponge (Critical UHI Zone)";
      desc = "Your area suffers from acute urban heat island retention. Dark impervious surfaces trap extreme thermal radiation, raising nighttime ambient temperatures up to 8°C above surrounding rural baselines.";
      prescription = [
        "Petition city council for rapid cool roof white-coating grants.",
        "Add potted shade trees, balcony planter boxes, and reflective window shades.",
        "Advocate for replacing dead parking asphalt with permeable grass pavers."
      ];
    } else if (finalScore < 68) {
      tierTitle = "Standard Concrete Grid (Moderate Exposure)";
      desc = "Your neighborhood possesses fragmented green pockets, but broad asphalt streets and unshaded rooftops continue to absorb excessive solar irradiance during peak sun hours.";
      prescription = [
        "Organize neighborhood tree-planting campaigns targeting south-facing streets.",
        "Upgrade residential roof coatings to solar reflectance index (SRI) > 82.",
        "Support local rain garden and bioswale installations to recharge groundwater."
      ];
    } else if (finalScore < 88) {
      tierTitle = "Resilient Eco-Corridor (High Cool Quotient)";
      desc = "Your neighborhood is ahead of the curve! Strong canopy cover and conscious materials buffer against extreme temperature spikes and provide measurable microclimate relief.";
      prescription = [
        "Interconnect existing tree canopies into uninterrupted biophilic wildlife corridors.",
        "Introduce misting zones and water evaporation features around civic plazas.",
        "Encourage neighborhood buildings to adopt vertical living facades."
      ];
    } else {
      tierTitle = "Zero-Heat Oasis Pioneer (Optimal Climate)";
      desc = "Congratulations! Your district represents the gold standard of biophilic urban cooling. Natural transpiration, high-albedo envelopes, and water retention keep surface heat at benign levels.";
      prescription = [
        "Host neighborhood workshops to teach surrounding districts your cooling blueprint.",
        "Install citizen IoT microclimate sensors to track real-time canopy cooling metrics.",
        "Serve as a CoolCity ambassador for city-wide climate policy forums."
      ];
    }

    if (resultTierBadge) resultTierBadge.textContent = tierTitle;
    if (resultDescription) resultDescription.textContent = desc;

    if (resultPrescription) {
      resultPrescription.innerHTML = prescription.map(item => `
        <li style="display:flex; align-items:flex-start; gap:0.75rem; margin-bottom:0.75rem;">
          <span style="color:var(--color-lime-500); font-weight:bold;">✦</span>
          <span>${item}</span>
        </li>
      `).join('');
    }

    if (window.CoolCityAudio) {
      window.CoolCityAudio.playSuccess();
    }
  }

  function handleNext() {
    if (selectedOptionIndex === null) return;
    const currentQ = quizQuestions[currentQuestionIndex];
    totalScore += currentQ.options[selectedOptionIndex].points;

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    selectedOptionIndex = null;
    totalScore = 0;
    if (quizResultView) quizResultView.style.display = 'none';
    if (quizActiveView) quizActiveView.style.display = 'block';
    renderQuestion();
  }

  function copyBadge() {
    const text = `🏆 My neighborhood scored ${resultScoreVal?.textContent || '80'}/100 on the COOLCITY Heat Resiliency Diagnostic! Check how cool your neighborhood is at COOLCITY.`;
    navigator.clipboard.writeText(text).then(() => {
      if (window.showToast) {
        window.showToast("Citizen Diagnostic result copied to clipboard!");
      }
    }).catch(() => {
      if (window.showToast) {
        window.showToast("Copied diagnostic score!");
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (nextBtn) nextBtn.addEventListener('click', handleNext);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (copyBadgeBtn) copyBadgeBtn.addEventListener('click', copyBadge);
    renderQuestion();
  });
})();
