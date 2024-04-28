import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

const useLanguage = () => {
  return useContext(LanguageContext);
};
export default useLanguage;
