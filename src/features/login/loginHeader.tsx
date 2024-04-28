import React from "react";
import useLanguage from "../../context/language/useLanguage";
import { LoginTrans } from "./LoginTrans";

export const LoginHeader: React.FC = () => {
  const { selectedLanguage } = useLanguage();

  return (
    <div className="form-header">
      <h1>{LoginTrans.header.title[selectedLanguage]}</h1>
      <h2>{LoginTrans.header.subtitle[selectedLanguage]}</h2>
    </div>
  );
};
