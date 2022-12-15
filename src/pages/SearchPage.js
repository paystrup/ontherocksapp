import { React } from "react";
import { useTranslation } from "react-i18next";
import CategoryCarousel from "../components/CategoryCarousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchPage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className="mt-20 mb-32 lg:mt-36 fadeInAnimation">
      <div className="px-5 w-full lg:px-14 flex flex-col lg:flex-col-reverse lg:gap-12">
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

        <div className="mt-5 lg:mt-0 lg:flex lg:flex-col lg:gap-5">
          <h3 className="text-xl font-medium lg:font-displayBook lg:text-6xl">
            {t("searchpage.title")}
          </h3>

          <p className="text-base text-primaryGray-500 font-thin leading-relaxed mt-2 lg:mt-0 lg:text-xl">
            {t("searchpage.body")}
          </p>
        </div>
      </div>

      <CategoryCarousel />
    </section>
  );
}
