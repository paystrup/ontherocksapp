import React from "react";
import { useTranslation } from "react-i18next";
import CategoryCarousel from "../components/CategoryCarousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchPage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className="mt-20 mb-32">
      <div className="px-6 w-full">
        <div className="relative flex">
          <div className="flex items-center">
            <MagnifyingGlassIcon className="h-6 w-6 absolute ml-3" />
          </div>
          <input
            className="placeholder-primaryGray-700 border-[1px] border-primaryGray-700 focus:border-primaryYellow w-full py-3 rounded-xl bg-primaryGray-900 bg-opacity-20 pl-12 focus-within:text-primaryWhite"
            type="text"
            id="search"
            name="search"
            placeholder={t("searchpage.searchPlaceholder")}
          />
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-medium">{t("searchpage.title")}</h3>

          <p className="text-base text-primaryGray-500 font-thin leading-relaxed mt-2">
            {t("searchpage.body")}
          </p>
        </div>
      </div>

      <CategoryCarousel />
    </section>
  );
}
