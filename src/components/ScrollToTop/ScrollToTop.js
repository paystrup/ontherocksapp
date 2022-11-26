// 🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝
// Scroll to top on route change, wrapped around routes in App.js
// Inspiration: https://stackoverflow.com/questions/33188994/scroll-to-the-top-of-the-page-after-render-in-react-js
import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
        {props.children}
    </>
  );
};

export default ScrollToTop;