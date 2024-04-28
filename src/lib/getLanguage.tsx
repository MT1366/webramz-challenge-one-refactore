export const getLanguage: () => "de" | "en" = () => {
  try {
    const LocalstorageLanguage = localStorage.getItem("selectedLanguage");
    if (!LocalstorageLanguage) {
      const preferredLanguage = navigator.language.split("-")[0];
      if (preferredLanguage === "de" || preferredLanguage === "en") {
        return preferredLanguage;
      }
    }
    if (LocalstorageLanguage === "de" || LocalstorageLanguage === "en") {
      return LocalstorageLanguage;
    }
    localStorage.removeItem("selectedLanguage");
    return "en";
  } catch (error) {
    localStorage.removeItem("selectedLanguage");
    return "en";
  }
};
