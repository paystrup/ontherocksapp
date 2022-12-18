import React, { useState } from 'react'
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
    WhatsappShareButton,
} from "react-share";

import {
    PaperAirplaneIcon,
    XMarkIcon,
    ClipboardDocumentIcon
} from "@heroicons/react/24/outline";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTranslation } from "react-i18next";

export default function ShareSocialModal({ article }) {
    const { t } = useTranslation(); // import translations

    // states for opening and closing modals
    const [showShareModal, setShowShareModal] = useState(false);
    const handleShareModal = (event) => {
        setShowShareModal(!showShareModal);
        console.log(showShareModal);
    };

    // For the social media share btn -> get current URL to share -> dynamic
    const shareURL = window.location.href;
    const handleCopyLink = (event) => {
    navigator.clipboard.writeText(shareURL);
        alert(t("cocktailPage.alert"));
    };
    return (
        <div>
            <div
                onClick={handleShareModal}
                className="cursor-pointer border-[1px] rounded-full p-1 h-9 w-9 flex items-center justify-center"
            >
                <PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
            </div>
            
            {/* SHARE MODAL STARTS HERE - IF CLICKED -> STATE TRUE -> SHOW MODAL */}
            {showShareModal && (
                <dialog className="flex items-center justify-center fixed w-full z-[99999] top-0 left-0 h-full bg-primaryBlack bg-opacity-80 px-2">
                    <div className="bg-lightBlack border-2 border-primaryGray-900 py-8 px-5 w-full rounded-2xl flex justify-center items-center flex-col gap-8 text-primaryWhite">
                        <XMarkIcon
                        className="h-10 w-10 cursor-pointer hover:opacity-50"
                        onClick={handleShareModal}
                        />
                        <h3 className="font-displayBook text-2xl text-center">
                        {t("cocktailPage.copyModalTitle")}
                        </h3>

                        {/* SOCIAL ICONS + SHARE FUNCTION -> shares on selected social media via. popup -> dynamic with url and cocktail titles etc. */}
                        <div className="flex gap-5">
                        <FacebookShareButton url={shareURL} quote={article.title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareURL} title={article.title}>
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
                            <ClipboardDocumentIcon className="h-6 w-6" />
                            {t("cocktailPage.copyBtnText")}
                        </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}
