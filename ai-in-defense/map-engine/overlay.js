// map-engine/overlay.js

import L from "leaflet";

// Load and draw country polygons, color‐coded by side
export async function drawCountryOverlays(map, countryCodes) {
  // countryCodes = { countryA: 'USA', countryB: 'RUS' }
  const response = await fetch("/map-engine/assets/countries.geojson");
  const geojson = await response.json();

  function style(feature) {
    const code = feature.properties.ISO_A3;
    let color = "#999"; // neutral
    if (code === countryCodes.countryA) color = "rgba(0, 123, 255, 0.4)"; // blue
    if (code === countryCodes.countryB) color = "rgba(220, 53, 69, 0.4)"; // red
    return { fillColor: color, weight: 1, color: "#333", fillOpacity: 0.4 };
  }

  L.geoJSON(geojson, { style }).addTo(map);
}

// Create a custom Leaflet icon from an SVG asset
export function createUnitIcon(type, size = [32, 32]) {
  return L.icon({
    iconUrl: `/map-engine/assets/markers/${type}.svg`,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
  });
}
