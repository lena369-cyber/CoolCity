# COOLCITY — Urban Heat Island Mitigation OS

> **Editorial, modern, and bold sustainability platform inspired by BLITZ design aesthetics.**  
> Focused on green cities, reducing urban heat, bioclimatic architecture, and citizen climate mobilization.

---

## 🎨 Visual Identity & Design System

- **Palette**: Deep Forest Green (`#050e08`, `#0d2216`), Electric Lime Green (`#c8f331`), Crisp Off-White (`#f4f7f2`), and Thermal Hotspot Accents (`#ef4444`, `#f97316`).
- **Typography**: 
  - Display: **Syne** (Ultra-bold, architectural display face)
  - Headings: **Space Grotesk** (Clean, geometric grotesque)
  - Body: **Plus Jakarta Sans** (Legible, contemporary sans-serif)
  - Telemetry / HUD: **JetBrains Mono** (Precision monospace tags, coordinates, and brackets `[ ]`)
- **Aesthetic**:
  - Asymmetrical bento grid layouts
  - Rounded rectangular sections (`border-radius: 28px` to `38px`)
  - Continuous animated ticker tapes (`✦ URBAN HEAT ISLAND PROTOCOL 2026`)
  - Interactive Before/After thermal comparison slider
  - Precision glassmorphism and subtle glowing lime accents

---

## ⚡ Interactive Features

1. **Real Interactive World Heat Map (Section 3)**:
   - **Full Planetary Earth View**: Powered by **Leaflet.js** and **OpenStreetMap (OSM)**, showing all continents and countries with smooth dragging, zooming in/out, and panning.
   - **Initial Full-World View**: Opens centered on Earth with global visibility.
   - **Pulsing Heat Hotspots**: Over 30 sample cities across North America, South America, Europe, Asia, Africa, and Oceania.
   - **Color-Coded Heat Categories**:
     - 🔴 **Critical Hotspot**: Sample surface temperatures > 42.0°C (e.g. Kuwait City, New Delhi, Phoenix, Jacobabad, Riyadh, Seville, Mexicali).
     - 🟠 **Elevated Heat Zone**: Sample temperatures 36.0°C – 41.9°C (e.g. Athens, Bangkok, Tokyo, Rome, Houston, São Paulo, Sydney, Paris).
     - 🟢 **Biophilic Resilient Zone**: Sample temperatures < 35.0°C (e.g. Singapore, Medellín, Vienna, Freiburg, Curitiba, Vancouver, Copenhagen).
   - **Interactive Location Inspector**: Clicking any marker flies to the city, opens an editorial popup, and updates the telemetry sidebar with population exposed, canopy %, surface albedo, thermal drivers, and bioclimatic prescriptions.
   - **Live Search & Autocomplete**: Search by city or country name with instant dropdown matching and 1-click camera flight.
   - **Category Filter Pills & Layer Switcher**: Filter by Critical, Elevated, or Resilient zones, reset to full world view, or toggle between Dark Cyber OSM and Standard OSM.
   - **Floating Map Legend**: Clear color keys and demonstration data indicators.
   - **Sample Data Notice**: Explicitly labeled throughout the interface as educational demonstration data.

2. **Interactive Before/After Thermal Comparison Slider (Section 2)**:
   - Real-time drag slider comparing conventional asphalt heat islands (44.8°C) against the COOLCITY biophilic protocol (28.2°C).

3. **Macro Policy Cooling Simulator (Section 5)**:
   - Dynamic range sliders for *Urban Canopy Coverage* (10%–60%), *Cool Roof Retrofit Rate* (0%–100%), and *Blue & Green Corridors* (5–120 km).
   - Instant calculation of projected temperature reduction (°C), annual MWh electrical grid savings, metric tons of CO₂ sequestered, and emergency heatstroke hospitalization reductions.
   - Animated scroll-triggered numerical counters.

4. **Community Activities & Live Action Hub (Section 6)**:
   - Filter activities by category (*Tree Planting, Cool Roof Squads, Citizen Science, Workshops*).
   - Interactive **Volunteer Registration Modal**: Submitting decrements available spot counters live and triggers confirmation feedback!
   - **Community Action Pledge Wall**: Real-time form allowing citizens to post their neighborhood climate pledges directly into the live broadcast grid.

5. **"How Cool Is Your Neighborhood?" Eco Quiz (Section 7)**:
   - 5-step diagnostic quiz assessing local canopy, roofing materials, midnight thermal lag, green corridors, and municipal policies.
   - Instant score computation on a 0–100 scale with diagnostic tier classification (*Thermal Heat Sponge*, *Standard Concrete Grid*, *Resilient Eco-Corridor*, *Zero-Heat Oasis*).
   - Custom citizen action prescription checklist + clipboard badge sharing.

6. **Contact Hub & FAQ Accordion (Section 8)**:
   - Interactive partnership inquiry form with instant confirmation feedback.
   - Animated FAQ accordion addressing cool roof science, satellite telemetry, and public health impact.
   - Web Audio API sound telemetry feedback (subtle synthesized clicks and success chimes).

7. **Modern Icon-Based Slide-in Navigation Menu (Desktop & Mobile)**:
   - Hamburger menu button with animated bars accessible on all devices.
   - Smooth slide-in navigation drawer with dim blur backdrop.
   - Clean white rounded icon badges housing vibrant green Lucide SVG icons on the left with labels on the right.
   - All 9 items properly routed:
     1. **Home** — `house` icon (`#home`)
     2. **Global View** — `globe` icon (`#map` + auto-resets full world view)
     3. **Global Heat Map** — `map` icon (`#map`)
     4. **Heat Insights** — `thermometer-sun` icon (`#about`)
     5. **Green Solutions** — `leaf` icon (`#solutions`)
     6. **Our Impact** — `chart-no-axes-combined` icon (`#impact`)
     7. **Community** — `users` icon (`#community`)
     8. **Eco Quiz** — `brain` icon (`#quiz`)
     9. **Contact Us** — `mail` icon (`#contact`)
   - Subtle hover effects: card translation, glowing lime border, icon scale, and animated arrow.

---

## 🚀 How to Preview the Website

### Option 1: Direct Browser Launch (Easiest & Instant)
- Simply double-click **`preview.bat`** in this folder, or:
- Double-click **`index.html`** to open it directly in Google Chrome, Microsoft Edge, Firefox, or Brave.

### Option 2: Command Line (PowerShell)
```powershell
Start-Process "index.html"
```

### Option 3: Local HTTP Server (Optional)
If you have Python, Node, or an IDE extension (like VS Code Live Server):
```bash
# Using Python (if installed):
python -m http.server 8000

# Using Node (if installed):
npx serve .
```
Then visit `http://localhost:8000` in your web browser.

---

## 📁 File Structure

```
CoolCity/
├── index.html                 # Semantic HTML5 architecture & all 8 sections
├── preview.bat                # 1-click preview script for Windows
├── README.md                  # Project documentation & design manual
├── css/
│   ├── variables.css          # Color tokens, fonts, radii, and glassmorphic variables
│   ├── base.css               # Editorial typography, resets, scrollbar, utility classes
│   ├── components.css         # Navigation bar, buttons, bento cards, modals, sliders
│   ├── sections.css           # Custom layouts for all 8 website sections
│   └── responsive.css         # Media queries for tablet, mobile, and ultra-wide
└── js/
    ├── main.js                # Mobile drawer, active link tracking, live UTC clock
    ├── heatmap.js             # Vector SVG city heat map simulator engine
    ├── simulator.js           # Environmental impact calculator with real-time math
    ├── quiz.js                # Interactive Eco Diagnostic Quiz engine
    ├── community.js           # Event registration modal, filter, and live pledge wall
    └── interactions.js        # Thermal comparison slider, Web Audio API, form handling
```
