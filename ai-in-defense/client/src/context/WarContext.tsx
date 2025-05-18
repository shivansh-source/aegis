import React, { createContext, useState, useContext } from "react";

interface WarConfig {
  countryA: string;
  countryB: string;
  troopsA: any[];
  troopsB: any[];
  weaponsA: any[];
  weaponsB: any[];
}

interface WarContextType {
  config: WarConfig;
  setConfig: React.Dispatch<React.SetStateAction<WarConfig>>;
}

const WarContext = createContext<WarContextType | undefined>(undefined);

export const WarProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [config, setConfig] = useState<WarConfig>({
    countryA: "",
    countryB: "",
    troopsA: [],
    troopsB: [],
    weaponsA: [],
    weaponsB: [],
  });

  return (
    <WarContext.Provider value={{ config, setConfig }}>
      {children}
    </WarContext.Provider>
  );
};

export const useWar = (): WarContextType => {
  const ctx = useContext(WarContext);
  if (!ctx) throw new Error("useWar must be used within WarProvider");
  return ctx;
};
