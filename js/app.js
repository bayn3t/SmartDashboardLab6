// Initialize map
let map;
let activeFilters = {
    modes: ['bus', 'light-rail', 'bike-lanes', 'park-ride'],
    accessibility: 'all',
    neighborhood: ''
};

// Sample Seattle transit data
const transitData = {
    busRoutes: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [-122.332, 47.606],
                        [-122.330, 47.610],
                        [-122.328, 47.615]
                    ]
                },
                properties: { route: 'Route 1', mode: 'bus' }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [-122.335, 47.605],
                        [-122.340, 47.608],
                        [-122.345, 47.612]
                    ]
                },
                properties: { route: 'Route 2', mode: 'bus' }
            }
        ]
    },
    busStops: {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.332, 47.606] }, properties: { name: 'Stop 1', mode: 'bus' } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.330, 47.610] }, properties: { name: 'Stop 2', mode: 'bus' } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.335, 47.605] }, properties: { name: 'Stop 3', mode: 'bus' } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.340, 47.608] }, properties: { name: 'Stop 4', mode: 'bus' } }
        ]
    },
    lightRailLines: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [-122.305, 47.595],
                        [-122.310, 47.603],
                        [-122.315, 47.612]
                    ]
                },
                properties: { route: 'Link Light Rail', mode: 'light-rail' }
            }
        ]
    },
    lightRailStops: {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.305, 47.595] }, properties: { name: 'Airport Station', mode: 'light-rail' } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.310, 47.603] }, properties: { name: 'SeaTac Station', mode: 'light-rail' } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.315, 47.612] }, properties: { name: 'Downtown Station', mode: 'light-rail' } }
        ]
    },
    bikeLanes: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [-122.345, 47.620],
                        [-122.340, 47.615],
                        [-122.335, 47.610]
                    ]
                },
                properties: { route: 'Bike Lane A', mode: 'bike-lanes' }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [-122.320, 47.600],
                        [-122.325, 47.605],
                        [-122.330, 47.610]
                    ]
                },
                properties: { route: 'Bike Lane B', mode: 'bike-lanes' }
            }
        ]
    },
    parkAndRides: {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.350, 47.625] }, properties: { name: 'P&R 1', mode: 'park-ride', spaces: 250 } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.300, 47.590] }, properties: { name: 'P&R 2', mode: 'park-ride', spaces: 180 } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.325, 47.620] }, properties: { name: 'P&R 3', mode: 'park-ride', spaces: 320 } }
        ]
    }
};

function initMap() {
    map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycW1nOG1qNXQ0MjYifQ.rJcFIG214AriISLbB6B5aw',
        center: [-122.3321, 47.6062], // Seattle center
        zoom: 12
    });

    map.on('load', () => {
        addTransitLayers();
        setupLayerClickHandlers();
    });

    map.on('error', (error) => {
        console.error('Map loading error:', error);
        // Fallback to simpler style if satellite fails
        map.setStyle('https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json');
    });
}

function addTransitLayers() {
    // Bus Routes (lines)
    map.addSource('bus-routes', {
        type: 'geojson',
        data: transitData.busRoutes
    });

    map.addLayer({
        id: 'bus-routes-layer',
        type: 'line',
        source: 'bus-routes',
        paint: {
            'line-color': '#FF0000',
            'line-width': 3,
            'line-opacity': 0.8
        }
    });

    // Bus Stops (points)
    map.addSource('bus-stops', {
        type: 'geojson',
        data: transitData.busStops
    });

    map.addLayer({
        id: 'bus-stops-layer',
        type: 'circle',
        source: 'bus-stops',
        paint: {
            'circle-radius': 6,
            'circle-color': '#FF0000',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
            'circle-opacity': 0.9
        }
    });

    // Light Rail Lines
    map.addSource('light-rail-lines', {
        type: 'geojson',
        data: transitData.lightRailLines
    });

    map.addLayer({
        id: 'light-rail-lines-layer',
        type: 'line',
        source: 'light-rail-lines',
        paint: {
            'line-color': '#00FF00',
            'line-width': 4,
            'line-opacity': 0.8
        }
    });

    // Light Rail Stops
    map.addSource('light-rail-stops', {
        type: 'geojson',
        data: transitData.lightRailStops
    });

    map.addLayer({
        id: 'light-rail-stops-layer',
        type: 'circle',
        source: 'light-rail-stops',
        paint: {
            'circle-radius': 8,
            'circle-color': '#00FF00',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000',
            'circle-opacity': 0.95
        }
    });

    // Bike Lanes
    map.addSource('bike-lanes', {
        type: 'geojson',
        data: transitData.bikeLanes
    });

    map.addLayer({
        id: 'bike-lanes-layer',
        type: 'line',
        source: 'bike-lanes',
        paint: {
            'line-color': '#0000FF',
            'line-width': 2,
            'line-dasharray': [4, 4],
            'line-opacity': 0.8
        }
    });

    // Park & Ride
    map.addSource('park-ride', {
        type: 'geojson',
        data: transitData.parkAndRides
    });

    map.addLayer({
        id: 'park-ride-layer',
        type: 'circle',
        source: 'park-ride',
        paint: {
            'circle-radius': 10,
            'circle-color': '#FFD700',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000',
            'circle-opacity': 0.9
        }
    });

    // Make layers interactive
    ['bus-stops-layer', 'light-rail-stops-layer', 'park-ride-layer'].forEach(layerId => {
        map.on('mouseenter', layerId, () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerId, () => {
            map.getCanvas().style.cursor = '';
        });
    });
}

function setupLayerClickHandlers() {
    // Bus stop popups
    map.on('click', 'bus-stops-layer', (e) => {
        const feature = e.features[0];
        new maplibregl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`<div><strong>${feature.properties.name}</strong><br/>Bus Stop</div>`)
            .addTo(map);
    });

    // Light rail stop popups
    map.on('click', 'light-rail-stops-layer', (e) => {
        const feature = e.features[0];
        new maplibregl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`<div><strong>${feature.properties.name}</strong><br/>Light Rail Station</div>`)
            .addTo(map);
    });

    // Park & ride popups
    map.on('click', 'park-ride-layer', (e) => {
        const feature = e.features[0];
        new maplibregl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`<div><strong>${feature.properties.name}</strong><br/>Available spaces: ${feature.properties.spaces}<br/>Park & Ride Lot</div>`)
            .addTo(map);
    });
}

function applyFilters() {
    // Get current filter values
    const modes = Array.from(document.querySelectorAll('.mode-filter:checked'))
        .map(cb => cb.value);
    
    const accessibility = document.getElementById('accessibility-filter').value;
    const neighborhood = document.getElementById('neighborhood-filter').value;

    activeFilters = { modes, accessibility, neighborhood };

    // Update map layers based on filters
    updateMapLayers();

    // Optional: Fetch filtered data from backend
    // fetchTransitData();
}

function updateMapLayers() {
    const modes = activeFilters.modes;

    // Define layer-mode mapping
    const layerModeMap = {
        'bus-routes-layer': 'bus',
        'bus-stops-layer': 'bus',
        'light-rail-lines-layer': 'light-rail',
        'light-rail-stops-layer': 'light-rail',
        'bike-lanes-layer': 'bike-lanes',
        'park-ride-layer': 'park-ride'
    };

    // Show/hide layers based on active filters
    Object.entries(layerModeMap).forEach(([layerId, mode]) => {
        if (modes.includes(mode)) {
            map.setLayoutProperty(layerId, 'visibility', 'visible');
        } else {
            map.setLayoutProperty(layerId, 'visibility', 'none');
        }
    });
}

async function fetchTransitData() {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/transit-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activeFilters)
        });
        
        const data = await response.json();
        updateMapData(data);
    } catch (error) {
        console.error('Error fetching transit data:', error);
    }
}

function updateMapData(data) {
    // Update map sources with new data
    if (data.busRoutes) {
        map.getSource('bus-routes').setData(data.busRoutes);
    }
    if (data.busStops) {
        map.getSource('bus-stops').setData(data.busStops);
    }
    if (data.lightRailLines) {
        map.getSource('light-rail-lines').setData(data.lightRailLines);
    }
    if (data.lightRailStops) {
        map.getSource('light-rail-stops').setData(data.lightRailStops);
    }
    if (data.bikeLanes) {
        map.getSource('bike-lanes').setData(data.bikeLanes);
    }
    if (data.parkAndRides) {
        map.getSource('park-ride').setData(data.parkAndRides);
    }
}

// Modal functions
function showAbout() {
    showModal('About', `
        <h2>Seattle Transportation Access Dashboard</h2>
        <p>This dashboard provides an interactive view of Seattle's transportation infrastructure, 
        helping residents understand transit accessibility across different neighborhoods.</p>
        <p><strong>Key Features:</strong></p>
        <ul>
            <li>Real-time transit mode visualization</li>
            <li>Accessibility filtering (walking distances)</li>
            <li>Neighborhood-specific information</li>
            <li>ADA compliance indicators</li>
        </ul>
    `);
}

function showTeam() {
    showModal('Team', `
        <h2>Project Team</h2>
        <p>This project is developed by a dedicated team of transportation and tech professionals.</p>
        <p><strong>Contributing to:</strong></p>
        <ul>
            <li>Improving transit accessibility</li>
            <li>Data-driven transportation planning</li>
            <li>Community engagement</li>
        </ul>
    `);
}

function showGoal() {
    showModal('Project Goal', `
        <h2>Project Goal</h2>
        <p>To provide transparent, data-driven insights into Seattle's transportation infrastructure 
        and help identify areas where accessibility improvements are needed.</p>
        <p><strong>Mission:</strong></p>
        <p>Empower residents and city planners with visualization tools that highlight transportation 
        access disparities and support evidence-based policy decisions.</p>
    `);
}

function showModal(title, content) {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// Event Listeners
document.querySelectorAll('.mode-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

document.getElementById('accessibility-filter').addEventListener('change', applyFilters);
document.getElementById('neighborhood-filter').addEventListener('change', applyFilters);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('infoModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initMap);