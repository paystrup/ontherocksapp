// 🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝
// Scroll to top on route change, wrapped around routes in App.js
// When creating a SPA in React, it stays at the same y-height when changing pages, unless you do this..
// Inspiration: https://stackoverflow.com/questions/33188994/scroll-to-the-top-of-the-page-after-render-in-react-js

import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  // useLocation, so depencecy array can listen after location change / page change and run effect
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // scroll to the top of the screen, 0 x 0 y
  }, [location]); // listen for path change and run effect

  return (
    <>
        {props.children}
    </>
  );
};

export default ScrollToTop;
