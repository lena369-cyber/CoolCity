/* ==========================================================================
   COOLCITY — REAL INTERACTIVE WORLD HEAT MAP (LEAFLET.JS & OPENSTREETMAP)
   Sample Data: Demonstration heat profiles for educational microclimate simulation
   ========================================================================== */

(function () {
  'use strict';

  // Global sample dataset representing urban heat island characteristics
  // NOTE: These are simulated sample metrics for educational & demonstration purposes
  const sampleHotspots = [
    // CRITICAL RED HOTSPOTS (> 42°C Sample)
    {
      id: "kuwait-city",
      name: "Kuwait City",
      country: "Kuwait",
      continent: "Asia",
      coords: [29.3759, 47.9774],
      temp: 48.9,
      category: "critical",
      delta: "+9.2°C UHI Anomaly",
      population: "3.1 Million",
      canopy: 3,
      albedo: 0.12,
      drivers: "Extreme solar radiation, low vegetation cover, heavy air-conditioning heat rejection into street canyons.",
      solutions: "Mandatory high-albedo white roof membranes, district cooling systems, and misted shade corridors."
    },
    {
      id: "jacobabad",
      name: "Jacobabad",
      country: "Pakistan",
      continent: "Asia",
      coords: [28.2810, 68.4376],
      temp: 48.1,
      category: "critical",
      delta: "+8.7°C UHI Anomaly",
      population: "210,000",
      canopy: 5,
      albedo: 0.15,
      drivers: "Surpasses wet-bulb heat thresholds; dense unshaded brickwork and asphalt radiating extreme heat.",
      solutions: "Passive earth-sheltered cooling, community microforests, and solar-reflective public shade canopies."
    },
    {
      id: "riyadh",
      name: "Riyadh",
      country: "Saudi Arabia",
      continent: "Asia",
      coords: [24.7136, 46.6753],
      temp: 47.3,
      category: "critical",
      delta: "+8.4°C UHI Anomaly",
      population: "7.6 Million",
      canopy: 4,
      albedo: 0.14,
      drivers: "Expansive multi-lane asphalt freeways and glazed skyscrapers creating deep thermal traps.",
      solutions: "Green Riyadh Initiative (7.5M native trees), cool asphalt coatings, and linear oasis corridors."
    },
    {
      id: "new-delhi",
      name: "New Delhi",
      country: "India",
      continent: "Asia",
      coords: [28.6139, 77.2090],
      temp: 46.8,
      category: "critical",
      delta: "+8.1°C UHI Anomaly",
      population: "33.8 Million",
      canopy: 9,
      albedo: 0.16,
      drivers: "Extreme population density, extensive concrete sprawl, vehicle exhaust, and pre-monsoon heat trapping.",
      solutions: "Reflective cool roof painting blitzes, Miyawaki pocket microforests, and restoration of water baolis."
    },
    {
      id: "phoenix",
      name: "Phoenix, AZ",
      country: "United States",
      continent: "North America",
      coords: [33.4484, -112.0740],
      temp: 46.4,
      category: "critical",
      delta: "+7.8°C UHI Anomaly",
      population: "1.7 Million",
      canopy: 8,
      albedo: 0.15,
      drivers: "Expansive asphalt parking lots and dark roofing radiating heat far past midnight.",
      solutions: "Cool Pavement Program (reflective asphalt seals), desert-adapted ironwood tree canopies, and solar parking shades."
    },
    {
      id: "mexicali",
      name: "Mexicali",
      country: "Mexico",
      continent: "North America",
      coords: [32.6245, -115.4523],
      temp: 45.3,
      category: "critical",
      delta: "+7.5°C UHI Anomaly",
      population: "1.0 Million",
      canopy: 6,
      albedo: 0.14,
      drivers: "Desert valley topography trapping stagnant hot air over dark unshaded industrial roofs.",
      solutions: "Cool roof tax credits, xeriscape green corridors, and permeable reflective sidewalk retrofits."
    },
    {
      id: "cairo",
      name: "Cairo",
      country: "Egypt",
      continent: "Africa",
      coords: [30.0444, 31.2357],
      temp: 44.5,
      category: "critical",
      delta: "+7.2°C UHI Anomaly",
      population: "22.1 Million",
      canopy: 5,
      albedo: 0.18,
      drivers: "Narrow concrete street canyons, dust heat absorption, and severe lack of open urban green space.",
      solutions: "Rooftop agriculture gardens, Nile breeze corridor unblocking, and vertical vegetation trellises."
    },
    {
      id: "seville",
      name: "Seville",
      country: "Spain",
      continent: "Europe",
      coords: [37.3891, -5.9845],
      temp: 44.2,
      category: "critical",
      delta: "+6.9°C UHI Anomaly",
      population: "700,000",
      canopy: 12,
      albedo: 0.22,
      drivers: "Guadalquivir basin heat dome; dense historic stone buildings retaining extreme daytime solar energy.",
      solutions: "CartujaQanat ancient underground water-chilled air circulation, shaded awnings, and tree canopy expansion."
    },
    {
      id: "marrakech",
      name: "Marrakech",
      country: "Morocco",
      continent: "Africa",
      coords: [31.6295, -7.9811],
      temp: 42.8,
      category: "critical",
      delta: "+6.5°C UHI Anomaly",
      population: "1.0 Million",
      canopy: 8,
      albedo: 0.20,
      drivers: "Red earth masonry thermal inertia, intense solar irradiance, and high summer ambient heat.",
      solutions: "Traditional shaded riad courtyards, evaporative fountain networks, and date palm shading avenues."
    },
    {
      id: "las-vegas",
      name: "Las Vegas, NV",
      country: "United States",
      continent: "North America",
      coords: [36.1699, -115.1398],
      temp: 42.1,
      category: "critical",
      delta: "+6.2°C UHI Anomaly",
      population: "660,000",
      canopy: 9,
      albedo: 0.16,
      drivers: "High concentration of asphalt parking and continuous casino air-conditioning thermal plumes.",
      solutions: "Shade tree canopy ordinances, solar canopy park-and-rides, and reflective pavement coatings."
    },

    // ELEVATED ORANGE HOTSPOTS (36°C – 41°C Sample)
    {
      id: "athens",
      name: "Athens",
      country: "Greece",
      continent: "Europe",
      coords: [37.9838, 23.7275],
      temp: 41.6,
      category: "elevated",
      delta: "+5.8°C UHI Anomaly",
      population: "3.1 Million",
      canopy: 11,
      albedo: 0.22,
      drivers: "Attica basin topography trapping stagnant heat over dense concrete apartment blocks.",
      solutions: "Pocket parks on vacant urban lots, white high-reflectance roof retrofits, and coastal breeze corridors."
    },
    {
      id: "bangkok",
      name: "Bangkok",
      country: "Thailand",
      continent: "Asia",
      coords: [13.7563, 100.5018],
      temp: 39.7,
      category: "elevated",
      delta: "+5.4°C UHI Anomaly",
      population: "11.2 Million",
      canopy: 13,
      albedo: 0.21,
      drivers: "High tropical humidity combined with paved-over historic canals and continuous vehicle congestion.",
      solutions: "Chao Phraya sky park connections, green stormwater retention wetlands, and living green façades."
    },
    {
      id: "houston",
      name: "Houston, TX",
      country: "United States",
      continent: "North America",
      coords: [29.7604, -95.3698],
      temp: 39.5,
      category: "elevated",
      delta: "+5.2°C UHI Anomaly",
      population: "2.3 Million",
      canopy: 18,
      albedo: 0.20,
      drivers: "Massive highway interchange networks and high Gulf humidity creating severe perceived heat stress.",
      solutions: "Bayou greenway expansion, reflective commercial cool roof policies, and tree-lined transit stops."
    },
    {
      id: "melbourne",
      name: "Melbourne",
      country: "Australia",
      continent: "Oceania",
      coords: [-37.8136, 144.9631],
      temp: 39.2,
      category: "elevated",
      delta: "+5.1°C UHI Anomaly",
      population: "5.1 Million",
      canopy: 15,
      albedo: 0.22,
      drivers: "Northern inland hot winds and lower tree canopy density in western suburban growth corridors.",
      solutions: "Urban Forest Strategy targeting 40% canopy cover, green roofs, and water-sensitive urban design (WSUD)."
    },
    {
      id: "rome",
      name: "Rome",
      country: "Italy",
      continent: "Europe",
      coords: [41.9028, 12.4964],
      temp: 38.6,
      category: "elevated",
      delta: "+4.8°C UHI Anomaly",
      population: "2.8 Million",
      canopy: 16,
      albedo: 0.24,
      drivers: "Ancient masonry and asphalt radiating heat; historical district restrictions on roof modifications.",
      solutions: "Tiber riverfront cooling parks, historical tree preservation, and permeable stone piazza pavers."
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      continent: "Asia",
      coords: [35.6762, 139.6503],
      temp: 38.4,
      category: "elevated",
      delta: "+4.6°C UHI Anomaly",
      population: "37.4 Million",
      canopy: 14,
      albedo: 0.23,
      drivers: "World's largest continuous urban mass; high density severely retards nighttime radiative cooling.",
      solutions: "Wind path corridors from Tokyo Bay, solar-reflective thermal barrier pavements, and sky gardens."
    },
    {
      id: "santiago",
      name: "Santiago",
      country: "Chile",
      continent: "South America",
      coords: [-33.4489, -70.6693],
      temp: 38.3,
      category: "elevated",
      delta: "+4.5°C UHI Anomaly",
      population: "6.2 Million",
      canopy: 15,
      albedo: 0.25,
      drivers: "Mountain basin inversion layer traps warm stagnant air over broad asphalt transit corridors.",
      solutions: "Santiago Green Belt project, urban reforestation of degraded hillsides, and bioswales."
    },
    {
      id: "sao-paulo",
      name: "São Paulo",
      country: "Brazil",
      continent: "South America",
      coords: [-23.5505, -46.6333],
      temp: 37.6,
      category: "elevated",
      delta: "+4.3°C UHI Anomaly",
      population: "12.4 Million",
      canopy: 17,
      albedo: 0.22,
      drivers: "High-density skyscraper canyons and vast impermeable surface areas slowing natural cooling.",
      solutions: "Linear river parks along Pinheiros river, green wall retrofits on buildings, and pocket forests."
    },
    {
      id: "sydney",
      name: "Sydney (West)",
      country: "Australia",
      continent: "Oceania",
      coords: [-33.8688, 151.2093],
      temp: 37.5,
      category: "elevated",
      delta: "+4.2°C UHI Anomaly",
      population: "5.3 Million",
      canopy: 19,
      albedo: 0.24,
      drivers: "Western Sydney basin traps heat up to 10°C hotter than coastal ocean beaches.",
      solutions: "Cool Suburbs rating tool, lighter-colored roof tiles mandate, and urban tree canopy targets."
    },
    {
      id: "paris",
      name: "Paris",
      country: "France",
      continent: "Europe",
      coords: [48.8566, 2.3522],
      temp: 37.2,
      category: "elevated",
      delta: "+4.0°C UHI Anomaly",
      population: "2.1 Million",
      canopy: 12,
      albedo: 0.26,
      drivers: "Dark zinc Mansard roofs absorb intense solar radiation, heating upper-level living quarters.",
      solutions: "Oasis schoolyards (unpaved green micro-forests), green avenues, and Seine misting refuges."
    },
    {
      id: "new-york",
      name: "New York City",
      country: "United States",
      continent: "North America",
      coords: [40.7128, -74.0060],
      temp: 36.8,
      category: "elevated",
      delta: "+3.9°C UHI Anomaly",
      population: "8.3 Million",
      canopy: 21,
      albedo: 0.25,
      drivers: "Deep concrete skyscraper street canyons and extensive flat bitumen commercial rooftops.",
      solutions: "NYC °CoolRoofs program (over 10M sq ft coated white), bioswale rain gardens, and MillionTrees initiative."
    },
    {
      id: "johannesburg",
      name: "Johannesburg",
      country: "South Africa",
      continent: "Africa",
      coords: [-26.2041, 28.0473],
      temp: 35.2,
      category: "elevated",
      delta: "+3.5°C UHI Anomaly",
      population: "5.9 Million",
      canopy: 24,
      albedo: 0.26,
      drivers: "High-altitude solar radiation; strong contrast between wealthy forested suburbs and unshaded townships.",
      solutions: "Township canopy equity campaigns, passive cool roofing subsidies, and stormwater park restorations."
    },

    // BIOPHILIC RESILIENT GREEN ZONES (< 35°C Sample)
    {
      id: "singapore",
      name: "Singapore",
      country: "Singapore",
      continent: "Asia",
      coords: [1.3521, 103.8198],
      temp: 30.2,
      category: "resilient",
      delta: "-2.4°C Cooling Buffer",
      population: "5.9 Million",
      canopy: 47,
      albedo: 0.42,
      drivers: "Equatorial humidity successfully buffered by multi-tiered biophilic architecture and vertical foliage.",
      solutions: "LUSH (Landscaping for Urban Spaces and High-Rises) policy, Gardens by the Bay, and park connectors."
    },
    {
      id: "medellin",
      name: "Medellín",
      country: "Colombia",
      continent: "South America",
      coords: [6.2442, -75.5812],
      temp: 28.7,
      category: "resilient",
      delta: "-3.5°C Cooling Buffer",
      population: "2.6 Million",
      canopy: 38,
      albedo: 0.38,
      drivers: "Pioneered 30 interconnected 'Green Corridors' along major roads, slashing citywide surface temperatures.",
      solutions: "Continuous vegetated boulevards, thermal soil insulation, and native shade tree networks."
    },
    {
      id: "vienna",
      name: "Vienna",
      country: "Austria",
      continent: "Europe",
      coords: [48.2082, 16.3738],
      temp: 28.1,
      category: "resilient",
      delta: "-2.2°C Cooling Buffer",
      population: "1.9 Million",
      canopy: 34,
      albedo: 0.36,
      drivers: "City-wide biophilic master plan; expansive Danube wetlands and preserved green cooling boulevards.",
      solutions: "Over 100 'Cooling Streets' with ultrasonic misting steles, green building façades, and unpaved plazas."
    },
    {
      id: "freiburg",
      name: "Freiburg",
      country: "Germany",
      continent: "Europe",
      coords: [47.9990, 7.8421],
      temp: 27.5,
      category: "resilient",
      delta: "-3.1°C Cooling Buffer",
      population: "230,000",
      canopy: 44,
      albedo: 0.45,
      drivers: "Vauban eco-district with car-free streets, mandatory green roofs, and running mountain stream channels.",
      solutions: "Black Forest wind corridor preservation, solar-shaded community squares, and permeable pavers."
    },
    {
      id: "curitiba",
      name: "Curitiba",
      country: "Brazil",
      continent: "South America",
      coords: [-25.4284, -49.2733],
      temp: 27.2,
      category: "resilient",
      delta: "-3.4°C Cooling Buffer",
      population: "1.9 Million",
      canopy: 42,
      albedo: 0.40,
      drivers: "World model for green urbanism with over 52 square meters of public green space per resident.",
      solutions: "Extensive flood-control lake park system, native tree preservation, and transit green belts."
    },
    {
      id: "nairobi",
      name: "Nairobi",
      country: "Kenya",
      continent: "Africa",
      coords: [-1.2921, 36.8219],
      temp: 26.5,
      category: "resilient",
      delta: "-1.8°C Cooling Buffer",
      population: "4.4 Million",
      canopy: 32,
      albedo: 0.34,
      drivers: "High elevation natural convective breezes and substantial green lung buffering from Karura Forest.",
      solutions: "Urban river basin rehabilitation, green belt zoning protection, and indigenous tree planting."
    },
    {
      id: "vancouver",
      name: "Vancouver",
      country: "Canada",
      continent: "North America",
      coords: [49.2827, -123.1207],
      temp: 26.1,
      category: "resilient",
      delta: "-2.5°C Cooling Buffer",
      population: "675,000",
      canopy: 36,
      albedo: 0.35,
      drivers: "Maritime airflow combined with Stanley Park temperate rainforest buffer moderates summer heat spikes.",
      solutions: "Rain City Strategy (nature-based green stormwater infrastructure) and street canopy equity targets."
    },
    {
      id: "auckland",
      name: "Auckland",
      country: "New Zealand",
      continent: "Oceania",
      coords: [-36.8485, 174.7633],
      temp: 25.4,
      category: "resilient",
      delta: "-2.1°C Cooling Buffer",
      population: "1.6 Million",
      canopy: 33,
      albedo: 0.36,
      drivers: "Narrow isthmus with continuous dual-harbor sea breezes and interconnected volcanic park networks.",
      solutions: "Urban Ngahere (Forest) Strategy, daylighted urban streams, and permeable pavement guidelines."
    },
    {
      id: "copenhagen",
      name: "Copenhagen",
      country: "Denmark",
      continent: "Europe",
      coords: [55.6761, 12.5683],
      temp: 24.2,
      category: "resilient",
      delta: "-2.8°C Cooling Buffer",
      population: "650,000",
      canopy: 29,
      albedo: 0.38,
      drivers: "Historical 'Five Finger' regional green wedges direct cool Baltic winds directly into city center.",
      solutions: "Cloudburst pocket parks, mandatory green roofs on flat structures, and clean harbor bathing zones."
    }
  ];

  // Map state
  let map = null;
  let currentLayer = null;
  let activeMarkers = [];
  let currentFilter = 'all';
  let selectedHotspot = sampleHotspots[0];

  // DOM Elements
  const searchInput = document.getElementById('world-map-search');
  const searchDropdown = document.getElementById('world-search-dropdown');
  const searchBtn = document.getElementById('world-search-btn');
  const filterPills = document.querySelectorAll('.map-filter-pill');
  const resetBtn = document.getElementById('world-reset-btn');
  const baseToggleBtn = document.getElementById('map-base-toggle');

  // Telemetry DOM elements
  const telemCity = document.getElementById('telem-city-name');
  const telemCountry = document.getElementById('telem-country-name');
  const telemTemp = document.getElementById('telem-temp-val');
  const telemDelta = document.getElementById('telem-temp-delta');
  const telemCategory = document.getElementById('telem-category-badge');
  const telemPop = document.getElementById('telem-pop-val');
  const telemCanopy = document.getElementById('telem-canopy-val');
  const telemAlbedo = document.getElementById('telem-albedo-val');
  const telemDrivers = document.getElementById('telem-drivers-text');
  const telemSolutions = document.getElementById('telem-solutions-text');
  const telemFlyBtn = document.getElementById('telem-fly-btn');

  // Helper: Create custom HTML divIcon for markers
  function createMarkerIcon(spot) {
    const tempRounded = Math.round(spot.temp);
    return L.divIcon({
      className: `heat-marker-custom heat-pin--${spot.category}`,
      html: `
        <div class="heat-pin-wrapper" title="${spot.name}: ${spot.temp}°C [Sample]">
          <div class="heat-pin-pulse"></div>
          <div class="heat-pin-core">${tempRounded}°</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  }

  // Update telemetry sidebar with selected spot data
  function updateTelemetry(spot) {
    selectedHotspot = spot;

    if (telemCity) telemCity.textContent = spot.name;
    if (telemCountry) telemCountry.textContent = `${spot.country} // ${spot.continent}`;
    if (telemTemp) {
      telemTemp.textContent = `${spot.temp.toFixed(1)}°C`;
      if (spot.category === 'critical') telemTemp.style.color = '#ef4444';
      else if (spot.category === 'elevated') telemTemp.style.color = '#f97316';
      else telemTemp.style.color = '#10b981';
    }
    if (telemDelta) {
      telemDelta.textContent = spot.delta;
      telemDelta.style.color = spot.category === 'resilient' ? 'var(--color-lime-500)' : '#ffdd59';
    }
    if (telemCategory) {
      telemCategory.className = `popup-badge popup-badge--${spot.category}`;
      if (spot.category === 'critical') telemCategory.textContent = 'Critical Heat Hotspot [Sample]';
      else if (spot.category === 'elevated') telemCategory.textContent = 'Elevated Heat Zone [Sample]';
      else telemCategory.textContent = 'Biophilic Resilient [Sample]';
    }
    if (telemPop) telemPop.textContent = spot.population;
    if (telemCanopy) telemCanopy.textContent = `${spot.canopy}%`;
    if (telemAlbedo) telemAlbedo.textContent = `${spot.albedo.toFixed(2)}`;
    if (telemDrivers) telemDrivers.textContent = spot.drivers;
    if (telemSolutions) telemSolutions.textContent = spot.solutions;
  }

  // Focus and open popup for a specific hotspot
  function selectHotspot(spot, zoomLevel = 8) {
    if (!map) return;
    updateTelemetry(spot);

    map.flyTo(spot.coords, zoomLevel, {
      duration: 1.4,
      easeLinearity: 0.25
    });

    // Find marker and open popup
    const targetMarkerObj = activeMarkers.find(m => m.spot.id === spot.id);
    if (targetMarkerObj && targetMarkerObj.marker) {
      setTimeout(() => {
        targetMarkerObj.marker.openPopup();
      }, 700);
    }

    if (window.CoolCityAudio) {
      window.CoolCityAudio.playClick(680);
    }
  }

  // Render all hotspot markers on the Leaflet map
  function renderMarkers() {
    activeMarkers.forEach(item => {
      map.removeLayer(item.marker);
    });
    activeMarkers = [];

    sampleHotspots.forEach(spot => {
      if (currentFilter !== 'all' && spot.category !== currentFilter) {
        return;
      }

      const icon = createMarkerIcon(spot);
      const marker = L.marker(spot.coords, { icon: icon });

      // Editorial popup content with clear SAMPLE DATA labels
      const popupHtml = `
        <div style="min-width: 220px;">
          <span class="popup-badge popup-badge--${spot.category}">
            ${spot.category.toUpperCase()} ZONE // DEMO SAMPLE
          </span>
          <div class="popup-title">${spot.name}</div>
          <div class="popup-country">${spot.country} • ${spot.continent}</div>
          
          <div class="popup-temp-row">
            <span class="popup-temp-val" style="color: ${spot.category === 'critical' ? '#ef4444' : (spot.category === 'elevated' ? '#f97316' : '#10b981')}">
              ${spot.temp.toFixed(1)}°C
            </span>
            <span class="popup-sample-tag">[DEMO DATA]</span>
          </div>
          
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-lime-500); margin-bottom: 0.8rem;">
            ${spot.delta}
          </div>
          
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 0.8rem; line-height: 1.4;">
            ${spot.drivers.slice(0, 95)}...
          </p>
          
          <button type="button" class="btn btn-primary btn-sm btn-popup-inspect" data-spot-id="${spot.id}" style="width: 100%; font-size: 0.75rem; padding: 0.4rem 0.8rem;">
            Inspect Telemetry ↗
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 290,
        className: 'custom-coolcity-popup'
      });

      marker.on('click', () => {
        updateTelemetry(spot);
        if (window.CoolCityAudio) {
          window.CoolCityAudio.playClick(620);
        }
      });

      marker.addTo(map);
      activeMarkers.push({ spot, marker });
    });
  }

  // Initialize Leaflet Map
  function initMap() {
    const mapContainer = document.getElementById('world-map');
    if (!mapContainer || typeof L === 'undefined') return;

    // Requirement 1 & 11: Full world view initially (Center [20, 0], Zoom 2)
    // Requirement 3: Allow users to zoom in/out and drag freely around Earth
    map = L.map('world-map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      worldCopyJump: true,
      scrollWheelZoom: true,
      zoomControl: true,
      maxBounds: [[-85, -200], [85, 200]],
      maxBoundsViscosity: 0.8
    });

    // Dark Matter tile layer powered by OpenStreetMap data
    const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/" target="_blank" rel="noopener">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    // Standard OpenStreetMap tile layer
    const standardOsmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    // Default to dark tile layer (matches BLITZ design palette)
    currentLayer = darkTileLayer;
    currentLayer.addTo(map);

    // Render Markers
    renderMarkers();

    // Invalidate map size on window resize/orientation change for mobile & laptop responsiveness
    window.addEventListener('resize', () => {
      if (map) map.invalidateSize();
    });
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 400);

    // Populate initial telemetry sidebar with first city
    if (sampleHotspots.length > 0) {
      updateTelemetry(sampleHotspots[0]);
    }

    // Delegate click for popup "Inspect Telemetry" button
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-popup-inspect');
      if (btn) {
        const spotId = btn.getAttribute('data-spot-id');
        const target = sampleHotspots.find(s => s.id === spotId);
        if (target) {
          updateTelemetry(target);
          if (window.showToast) {
            window.showToast(`Inspecting ${target.name} [Sample Telemetry Profile]`);
          }
        }
      }
    });

    // Base Layer Toggle (Dark Cyber OSM vs Standard OSM)
    if (baseToggleBtn) {
      let isDark = true;
      baseToggleBtn.addEventListener('click', () => {
        map.removeLayer(currentLayer);
        if (isDark) {
          currentLayer = standardOsmLayer;
          baseToggleBtn.textContent = "Standard OSM";
          isDark = false;
        } else {
          currentLayer = darkTileLayer;
          baseToggleBtn.textContent = "Dark Cyber OSM";
          isDark = true;
        }
        currentLayer.addTo(map);
        if (window.CoolCityAudio) window.CoolCityAudio.playClick(500);
      });
    }

    // Reset Full World View Button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        map.flyTo([20, 0], 2, { duration: 1.2 });
        if (window.CoolCityAudio) window.CoolCityAudio.playClick(440);
      });
    }

    // Telemetry Panel Fly Button
    if (telemFlyBtn) {
      telemFlyBtn.addEventListener('click', () => {
        if (selectedHotspot) {
          selectHotspot(selectedHotspot, 9);
        }
      });
    }

    // Quick jump chips
    document.querySelectorAll('.city-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const spotId = chip.getAttribute('data-spot-id');
        const target = sampleHotspots.find(s => s.id === spotId);
        if (target) {
          selectHotspot(target, 8);
        }
      });
    });

    // Setup Search & Autocomplete
    setupSearch();

    // Setup Category Filter Pills
    setupFilters();
  }

  // Search Function for Countries and Cities (Requirement 8)
  function setupSearch() {
    if (!searchInput || !searchDropdown) return;

    function doSearch(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        searchDropdown.classList.remove('show');
        return;
      }

      // Filter matches by city name, country, or continent
      const matches = sampleHotspots.filter(spot => {
        return spot.name.toLowerCase().includes(q) ||
               spot.country.toLowerCase().includes(q) ||
               spot.continent.toLowerCase().includes(q);
      });

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div style="padding: 1rem 1.2rem; color: var(--color-text-muted); font-size: 0.85rem;">
            No sample hotspot matching "<strong style="color:#fff;">${query}</strong>". Try Tokyo, Phoenix, India, Spain, or Singapore.
          </div>
        `;
        searchDropdown.classList.add('show');
        return;
      }

      searchDropdown.innerHTML = matches.map(spot => `
        <div class="map-search-item" data-spot-id="${spot.id}">
          <div>
            <div class="item-city">${spot.name}</div>
            <div class="item-country">${spot.country} // ${spot.continent}</div>
          </div>
          <span class="item-temp" style="background: ${spot.category === 'critical' ? 'rgba(239,68,68,0.2)' : (spot.category === 'elevated' ? 'rgba(249,115,22,0.2)' : 'rgba(16,185,129,0.2)')}; color: ${spot.category === 'critical' ? '#ef4444' : (spot.category === 'elevated' ? '#f97316' : '#10b981')}">
            ${spot.temp}°C Sample
          </span>
        </div>
      `).join('');

      searchDropdown.classList.add('show');

      // Bind click on dropdown items
      searchDropdown.querySelectorAll('.map-search-item').forEach(item => {
        item.addEventListener('click', () => {
          const spotId = item.getAttribute('data-spot-id');
          const target = sampleHotspots.find(s => s.id === spotId);
          if (target) {
            searchInput.value = `${target.name}, ${target.country}`;
            searchDropdown.classList.remove('show');
            selectHotspot(target, 9);
          }
        });
      });
    }

    searchInput.addEventListener('input', (e) => {
      doSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstMatch = searchDropdown.querySelector('.map-search-item');
        if (firstMatch) {
          firstMatch.click();
        } else if (searchInput.value.trim()) {
          doSearch(searchInput.value);
        }
      } else if (e.key === 'Escape') {
        searchDropdown.classList.remove('show');
      }
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (searchInput.value.trim()) {
          doSearch(searchInput.value);
        } else {
          searchInput.focus();
        }
      });
    }

    // Hide dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.map-search-wrapper')) {
        searchDropdown.classList.remove('show');
      }
    });
  }

  // Category Filter Pills
  function setupFilters() {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        currentFilter = pill.getAttribute('data-filter') || 'all';
        renderMarkers();

        if (window.CoolCityAudio) {
          window.CoolCityAudio.playClick(600);
        }
      });
    });
  }

  // Initialize when DOM and Leaflet are ready
  function checkAndInit() {
    if (typeof L !== 'undefined' && document.getElementById('world-map')) {
      initMap();
    } else {
      setTimeout(checkAndInit, 100);
    }
  }

  document.addEventListener('DOMContentLoaded', checkAndInit);

  // Expose API for external links
  window.CoolCityWorldMap = {
    selectCity: function (cityId) {
      const spot = sampleHotspots.find(s => s.id === cityId);
      if (spot) selectHotspot(spot, 9);
    },
    resetView: function () {
      if (map) map.flyTo([20, 0], 2);
    }
  };
})();
