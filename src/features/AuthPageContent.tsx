import React from "react";
import { Link } from "react-router-dom";
import { AuthPageContentTrans } from "./AuthPageContentTrans";
import useLanguage from "../context/language/useLanguage";
import { PrimaryButton } from "../components/ui/buttons/PrimaryButton";

export const AuthPageContent: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  return (
    <div className="flex gap-2 w-full">
      <Link className="grow" to="/register">
        <PrimaryButton className="w-full justify-center">
          {AuthPageContentTrans.registerLinkLabel[selectedLanguage]}
        </PrimaryButton>
      </Link>
      <Link className="grow" to="/login">
        <PrimaryButton className="w-full">
          {AuthPageContentTrans.loginLinkLabel[selectedLanguage]}
        </PrimaryButton>
      </Link>
    </div>
  );
};
