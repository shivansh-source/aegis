import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TroopPosition {
  lat: number;
  lng: number;
  side: 'A' | 'B'; // Using side instead of quantity for troop positions
}

interface Props {
  center: [number, number];
  troops: TroopPosition[];
}

export const MapView: React.FC<Props> = ({ center, troops }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Only initialize map if it doesn't already exist
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView(center, 3);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);
    } else {
      // If map exists, just update the view
      mapInstance.current.setView(center, 3);
    }

    const map = mapInstance.current;

    // Create circle groups for easier management
    const circleGroup = L.layerGroup().addTo(map);

    // Create circles with fixed radius, using color to indicate side
    troops.forEach((t) => {
      const radius = 50000; // Fixed radius to avoid NaN issues
      const color = t.side === 'A' ? 'blue' : 'red';
      
      L.circle([t.lat, t.lng], {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: 0.3
      }).addTo(circleGroup);
    });

    // Fix for resizing issues
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      // Only remove circles, not the map
      circleGroup.clearLayers();
    };
  }, [center, troops]);

  return <div ref={mapContainer} className="w-full h-96 rounded" />;
};
