import { ReactNode, createContext, useState } from "react";
import { getLanguage } from "../../lib/getLanguage";

interface ILanguageContext {
  availableLanguages: ["en", "de"];
  selectedLanguage: "en" | "de";
  handleLanguageChange: (language: "en" | "de") => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  availableLanguages: ["en", "de"],
  selectedLanguage: "en",
  handleLanguageChange: (): "en" | "de" => "en",
});

type Props = {
  children: ReactNode;
};
export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const availableLanguages: ["en", "de"] = ["en", "de"];
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "de">(
    getLanguage()
  );

  const handleLanguageChange: (language: "en" | "de") => void = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, handleLanguageChange, availableLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
