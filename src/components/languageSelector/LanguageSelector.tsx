import React from "react";
import { Select } from "antd";
import deIcon from "../../assets/Images/de_icon.webp";
import enIcon from "../../assets/Images/en_icon.webp";
import "./LanguageSelector.css";
import useLanguage from "../../context/language/useLanguage";
export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, handleLanguageChange, availableLanguages } =
    useLanguage();
  const onLanguageChange = (value: "en" | "de") => {
    handleLanguageChange(value);
  };
  return (
    <Select
      value={selectedLanguage}
      onChange={onLanguageChange}
      className="!bg-transparent language-selector-antd w-24"
    >
      {availableLanguages.map((language) => (
        <Select.Option key={language} value={language}>
          <div className="flex gap-2 items-center">
            <div className="border-2 h-5 flex">
              <img
                src={language === "en" ? enIcon : deIcon}
                alt="flag"
                className="my-[-4px]"
                width="30px"
              />
            </div>
            <p className="">{language}</p>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};
