 import React, { useState, createContext } from "react";
import { TemplateData } from "../data";
export const TemplateContext = createContext();
const TemplateContextProvider = ({ children }) => {
  const [template, setTemplate] = useState(TemplateData);
  const [loading, setLoading] = useState(false);

  return (
    <TemplateContext.Provider
      value={{
        template,
        loading,
        setTemplate,
        setLoading,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateContextProvider;
