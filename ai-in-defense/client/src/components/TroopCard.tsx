import React from "react";

interface Troop {
  id: string;
  name: string;
  quantity: number;
}

export const TroopCard: React.FC<{ troop: Troop }> = ({ troop }) => (
  <div className="border rounded p-4 shadow-sm">
    <h3 className="font-semibold">{troop.name}</h3>
    <p>Units: {troop.quantity}</p>
  </div>
);
