import translations from "./translations.json";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setLanguage, SupportedLanguage } from "@/store/slices/languageSlice";

export function useTranslation() {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  const languageData = useMemo(() => translations[language], [language]);

  const changeLanguage = (lang: SupportedLanguage) => {
    dispatch(setLanguage(lang));
  };

  return {
    language,
    languageData,
    setLanguage: changeLanguage,
  };
}
