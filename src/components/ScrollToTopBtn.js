import { useEffect, useState } from "react";
import { ChevronUpIcon } from '@heroicons/react/24/solid'

export default function ScrollToTopBtn() {
    const [showButton, setShowButton] = useState(false);
    
    useEffect(() => {
        // Button is displayed after scrolling down 500px
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 500 ? setShowButton(true) : setShowButton(false);
        };

        // add eventlistener 😎
        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.addEventListener('scroll', handleScrollButtonVisibility);
        };

    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behaviour: 'smooth' });
    };

    return (
        <>
            {showButton && (
                <div className="scrollToTop">
                    <button
                        onClick={handleScrollToTop}
                    >
                    <ChevronUpIcon />
                    </button>
                </div>
            )}
        </>

    );
}