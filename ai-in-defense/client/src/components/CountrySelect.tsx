import React from "react";

interface Country {
  code: string;
  name: string;
  flagUrl: string;
}

interface Props {
  countries: Country[];
  selected: string;
  onChange: (code: string) => void;
}

export const CountrySelect: React.FC<Props> = ({
  countries,
  selected,
  onChange,
}) => (
  <div className="w-full max-w-sm">
    <label className="block text-sm font-medium mb-1">Select Country</label>
    <select
      className="w-full border rounded p-2"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        -- Choose a Country --
      </option>
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name}
        </option>
      ))}
    </select>
  </div>
);
