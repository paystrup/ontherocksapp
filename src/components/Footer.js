import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import footerLogo from "../assets/svg/logo-big3.svg"

export default function Footer() {
 const { t, i18n } = useTranslation();

  return (
   <footer className="hidden lg:block lg:px-12 xl:px-28 mt-56 mb-8">

    {/* ☀☀☀☀☀ A LITTLE EASTEREGG ☀☀☀☀☀ */}
    <ReactTooltip
      anchorId="solskinsøen"
      place="top"
      content={"Bornholm! Bornholm! Bornholm! Du, min dejlige ferieø!"}
    />

    <div className="flex flex-col gap-24 w-full">
      <div className="flex justify-between">
        <div>
          <img src={footerLogo} alt="OnTheRocks Logo" className="h-60 invert" />
        </div>

        <div className="flex gap-28">
          <div className="flex flex-col gap-4">
            <h4 className="uppercase underline underline-offset-8">{t("footer.contact.title")}</h4>
            <ul className="flex flex-col gap-2 text-primaryGray-500">
              <li>
                <a href="tel:4522561256" className="underline hover:opacity-50">+ 45 2256 1256</a>
              </li>
              
              <li>
                <a href="mailto:info@bornholmspirits.com" className="underline hover:opacity-50">info@bornholmspirits.com</a>
              </li>
              
              <li>
                <p>
                  Sdr Hammer 156
                  <br></br>
                  3730 Nexø
                  <br></br>
                  Bornholm
                </p>
              </li>
              <li>CVR: 37586757</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="uppercase underline underline-offset-8">Sitemap</h4>
            <ul className="flex flex-col gap-2 text-primaryGray-500">
              <li className="hover:opacity-50">
                <NavLink to="/home">{t("topnav.homeTitle")}</NavLink>
              </li>
              <li className="hover:opacity-50">
                <NavLink to="/search">{t("topnav.cocktailTitle")}</NavLink>
              </li>
              <li className="hover:opacity-50">
                <NavLink to="/likes">{t("topnav.likesNavTitle")}</NavLink>
              </li>
              <li className="hover:opacity-50">
                <NavLink to="/profile">{t("topnav.profileNavTitle")}</NavLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="uppercase underline underline-offset-8">Socials</h4>
            <ul className="flex flex-col gap-2 text-primaryGray-500">
              <li className="hover:opacity-50">
                 <a href="https://www.facebook.com/bornholmspirits" target="_blank" rel="noreferrer">Facebook</a>
              </li>
              <li className="hover:opacity-50">
               <a href="https://www.instagram.com/bornholmspirits/" target="_blank" rel="noreferrer">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <ul className="flex justify-between text-xs uppercase">
            <li>BY BORNHOLM SPIRITS © 2022</li>
            <li>MADE WITH LOVE FROM <span className="text-primaryYellow" id="solskinsøen">SOLSKINSØEN</span></li>
            <li>
             <a href="https://bornholmspirits.com/pages/handelsbetingelser" target="_blank" rel="noreferrer">Terms & rights</a>
            </li>
        </ul>
      <div>
        </div>
      </div>
    </div>

   </footer>
  );
}