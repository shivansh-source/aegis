// map-engine/simulation.js

import L from "leaflet";
import { drawCountryOverlays, createUnitIcon } from "./overlay";

/**
 * Run the war simulation on the given Leaflet map instance.
 * @param {L.Map} map
 * @param {Object[]} troopMovements
 *    e.g. [{ from: [lat, lng], to: [lat, lng], quantity: 5000, type: 'tank', side: 'A' }, …]
 * @param {Object} countryCodes { countryA, countryB }
 */
export async function runSimulation(map, troopMovements, countryCodes) {
  // 1) Clear existing layers
  map.eachLayer((layer) => {
    if (
      layer instanceof L.GeoJSON ||
      layer instanceof L.Marker ||
      layer instanceof L.Polyline
    ) {
      map.removeLayer(layer);
    }
  });

  // 2) Draw country overlays
  await drawCountryOverlays(map, countryCodes);

  // 3) Animate each troop movement
  troopMovements.forEach((move) => animateMovement(map, move));
}

/**
 * Animates a single troop movement as a moving marker along a polyline.
 */
function animateMovement(map, { from, to, quantity, type, side }) {
  // Create a smooth polyline path
  const path = L.polyline([from, to], {
    color: side === "A" ? "blue" : "red",
    weight: Math.max(1, Math.log(quantity)), // line thickness ∝ log(quantity)
    dashArray: "4,8",
  }).addTo(map);

  // Place a marker at the start
  const icon = createUnitIcon(type);
  const marker = L.marker(from, { icon, rotationAngle: 0 }).addTo(map);

  // Animation parameters
  const totalFrames = 200;
  let frame = 0;
  const latDelta = (to[0] - from[0]) / totalFrames;
  const lngDelta = (to[1] - from[1]) / totalFrames;

  function step() {
    frame++;
    const lat = from[0] + latDelta * frame;
    const lng = from[1] + lngDelta * frame;
    marker.setLatLng([lat, lng]);

    // Rotate the icon to face direction of travel
    const angle =
      (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI + 90;
    (marker.getElement() || {}).style.setProperty(
      "transform",
      `rotate(${angle}deg)`
    );

    if (frame < totalFrames) {
      requestAnimationFrame(step);
    }
  }

  // Start animation
  requestAnimationFrame(step);
}
