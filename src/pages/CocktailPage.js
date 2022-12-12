// Inspiration from https://youtu.be/_7gdsAfFV9o
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import {
  BookmarkIcon,
  ClockIcon,
  PaperAirplaneIcon,
  ClipboardDocumentIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import TypeWriterEffect from "../components/TypeWriterEffect";
import ArticlesFeatured from "../components/ArticlesFeatured";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeCocktailRound from "../components/LikeCocktailRound";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// react social media share npm
// source: https://github.com/nygardk/react-share
import {
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  EmailShareButton,
  WhatsappShareButton
} from "react-share";

export default function CocktailPage() {
  // authentication auth and db are found in the firestore config, ref to our projekt in firebase
  const [user] = useAuthState(auth);

  // For the social media share btn -> get current URL to share -> dynamic
  const shareURL = window.location.href;
  const handleCopyLink = (event) => {
    navigator.clipboard.writeText(shareURL);
    alert(t("cocktailPage.alert"));

  }
  const [showShareModal, setShowShareModal] = useState(false);
  const handleShareModal = (event) => {
    setShowShareModal(!showShareModal);
    console.log(showShareModal);
  }

  // import translations
  const { t, i18n } = useTranslation();

  // navigation
  const navigate = useNavigate();

  // fetch depending on i18n language chosen
  const fetchLng = i18n.language;

  // Read more btn - onclick changes state to show more lines
  // If open -> change state back
  const [readMore, setReadMore] = useState(false);

  const handleReadMoreClick = (event) => {
    setReadMore(!readMore);
    console.log(readMore);
  }

  const [article, setArticle] = useState([]);
  const params = useParams();
  console.log(params); //Returns the slug-name of the url you're navigated to
  const id = params.id; // and the ID

  // Fetch book data based on the id from the slug
  // This way we don't have to loop through the array
  // We can fetch directly from the ID in fireStore with queries
  // Dependency array listens for a new ID and rerenders

  // articles = our fireStore collection, id = the query
  useEffect(() => {
    const docRef = doc(db, fetchLng, id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, [id, fetchLng, t]);

  return (
    <div className="text-primaryWhite mt-16 mb-32">

      {/* SHARE MODAL STARTS HERE - IF CLICKED -> STATE TRUE -> SHOW MODAL */}
      {showShareModal && (
        <div className="flex items-center justify-center fixed w-full z-[99999] top-0 left-0 h-full bg-primaryBlack bg-opacity-80 px-2">
          <div className="bg-lightBlack border-2 border-primaryGray-900 py-8 px-5 w-full rounded-2xl flex justify-center items-center flex-col gap-8">
            <XMarkIcon className="h-10 w-10 cursor-pointer hover:opacity-50" onClick={handleShareModal}/>
            <h3 className="font-displayBook text-2xl text-center">
              {t("cocktailPage.copyModalTitle")}
            </h3>
            <div className="flex gap-5">
              <FacebookShareButton
                url={shareURL}
                quote={article.title}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareURL}
                title={article.title}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <PinterestShareButton
                url={shareURL}
                media={`${article?.image?.srcMin}`}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>

              <WhatsappShareButton
                url={shareURL}
                title={article.title}
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <EmailShareButton
                url={shareURL}
                subject={article.title}
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
            <div className="bg-primaryGray-900 px-3 py-5 flex flex-wrap rounded-xl">
              <p>{shareURL}</p>
            </div>
            <div className="relative">
              <ReactTooltip
                anchorId="copyBtn"
                place="top"
                content={t("cocktailPage.copyBtnToolTip")}
              />
              <button 
                onClick={handleCopyLink}
                id="copyBtn"
                className="border-[1px] text-primaryYellow px-4 py-2 rounded-xl flex gap-1"
              >
                  <ClipboardDocumentIcon className="h-6 w-6"/>
                  {t("cocktailPage.copyBtnText")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECIPE STARTS HERE */}
      <div
        className="h-96 rounded-b-[30px] flex items-end"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${article?.image?.srcMin})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex gap-2 font-regular px-5 py-8">
          <p className="uppercase text-sm border-[1.2px] rounded-xl py-1 px-5">
            {article?.taste?.title}
          </p>
          <p className="uppercase text-sm border-[1.2px] rounded-xl py-1 px-5">
            {article?.liqour?.type}
          </p>
        </div>
      </div>
      <div className="mt-14 px-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center font-thin text-primaryYellow">
            <ClockIcon className="h-5 w-5" />
            <p>{article?.time} min</p>
          </div>

          <div className="flex gap-3">
            <div onClick={handleShareModal} className="cursor-pointer border-[1px] rounded-full p-1 h-9 w-9 flex items-center justify-center">
              <PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
            </div>

            {user && <LikeCocktailRound id={id} likes={article.likes} />}
            {!user && (
              <div className="bookmarkIcon bg-primaryBlack bg-opacity-60 rounded-full px-2 py-2 shadow-primaryBlack shadow-2xl">
                  <BookmarkIcon
                      className="h-7 w-7 text-primaryYellow shadow-2xl cursor-pointer"
                      onClick={() => navigate("/likes")}
                  />
              </div>
            )}
          </div>
        </div>

        <div className="mt-7">
          <h2 className="text-5xl font-displayBook">{article?.title}</h2>
          <p className={readMore ? "line-clamp-none text-base text-primaryGray-500 font-thin leading-7 mt-4" : "text-base text-primaryGray-500 font-thin leading-7 mt-4 line-clamp-4"}>
            {article?.body}
          </p>
          <p
            className={readMore ? "mt-3 text-primaryGray-700" : "mt-3"}
            onClick={handleReadMoreClick}
          >{readMore ? "Se mindre" : "... Læs mere"}</p>
          <div className="mt-6 font-thin text-md flex flex-col gap-2">
            <div className="flex justify-between">
              <p>{article?.ingredients?.liqour?.amount}</p>
              <a
                className="font-regular uppercase w-5/6 underline underline-offset-4 decoration-primaryYellow"
                href={article?.ingredients?.liqour?.link}
                target="_blank" rel="noreferrer"
              >
                {article?.ingredients?.liqour?.title}
              </a>
            </div>

            {article?.ingredients?.first && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.first?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.first?.title}
                </p>
              </div>
            )}

            {article?.ingredients?.second && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.second?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.second?.title}
                </p>
              </div>
            )}

            {article?.ingredients?.third && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.third?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.third?.title}
                </p>
              </div>
            )}

            {article?.ingredients?.fourth && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.fourth?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.fourth?.title}
                </p>
              </div>
            )}

            {article?.ingredients?.fifth && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.fifth?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.fifth?.title}
                </p>
              </div>
            )}

            {article?.ingredients?.sixth && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.sixth?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.sixth?.title}
                </p>
              </div>
            )}

            {article?.ingredients?.seventh && (
              <div className="flex justify-between">
                <p>{article?.ingredients?.seventh?.amount}</p>
                <p className="uppercase w-5/6">
                  {article?.ingredients?.seventh?.title}
                </p>
              </div>
            )}
          </div>

          <h2 className="mt-10 text-3xl font-displayBook">
            {t("cocktailPage.recipeTitle")}
          </h2>

          <div className="mt-6 text-md flex flex-col gap-3">
            {article?.recipe?.recipe1 && (
              <div className="flex justify-between">
                <div className=" flex items-center justify-center border-[1px] rounded-full p-1 h-7 w-7">
                  <p>1</p>
                </div>
                <p className="w-5/6">{article?.recipe?.recipe1}</p>
              </div>
            )}

            {article?.recipe?.recipe2 && (
              <div className="flex justify-between">
                <div className=" flex items-center justify-center border-[1px] rounded-full p-1 h-7 w-7">
                  <p>2</p>
                </div>
                <p className="w-5/6">{article?.recipe?.recipe2}</p>
              </div>
            )}

            {article?.recipe?.recipe3 && (
              <div className="flex justify-between">
                <div className=" flex items-center justify-center border-[1px] rounded-full p-1 h-7 w-7">
                  <p>3</p>
                </div>
                <p className="w-5/6">{article?.recipe?.recipe3}</p>
              </div>
            )}

            {article?.recipe?.recipe4 && (
              <div className="flex justify-between">
                <div className=" flex items-center justify-center border-[1px] rounded-full p-1 h-7 w-7">
                  <p>4</p>
                </div>
                <p className="w-5/6">{article?.recipe?.recipe4}</p>
              </div>
            )}

            {article?.recipe?.recipe5 && (
              <div className="flex justify-between">
                <div className=" flex items-center justify-center border-[1px] rounded-full p-1 h-7 w-7">
                  <p>5</p>
                </div>
                <p className="w-5/6">{article?.recipe?.recipe5}</p>
              </div>
            )}

            {article?.recipe?.recipe6 && (
              <div className="flex justify-between">
                <div className=" flex items-center justify-center border-[1px] rounded-full p-1 h-7 w-7">
                  <p>6</p>
                </div>
                <p className="w-5/6">{article?.recipe?.recipe6}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <button className="text-primaryYellow border-[1px] w-full py-3 rounded-xl">
            {t("cocktailPage.addflavorBtn")}
          </button>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-medium">
            {t("cocktailPage.carouselTitle")}
          </h3>
          <p>Carousel her</p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-medium">
            {t("cocktailPage.carouselTitle2")} {article?.liqour?.type}
          </h3>
          <p>Carousel her</p>
        </div>

        <div className="mt-14">
          <TypeWriterEffect
            words={[
              "din kæreste",
              "din hund",
              "din håndværker",
              "dit postbud",
              "din ven",
              "din morfar",
              "din kollega",
            ]}
          />
        </div>
      </div>
      <ArticlesFeatured />
    </div>
  );
}
