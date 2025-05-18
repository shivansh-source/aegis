import React from "react";

interface Weapon {
  id: string;
  type: string;
  modernizationLevel: number; // 0–100
}

export const WeaponCard: React.FC<{ weapon: Weapon }> = ({ weapon }) => (
  <div className="border rounded p-4 shadow-sm">
    <h3 className="font-semibold">{weapon.type}</h3>
    <p>Modernization: {weapon.modernizationLevel}%</p>
  </div>
);
