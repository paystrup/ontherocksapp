import React from 'react'
import splashPic from "../assets/images/cocktails/Screw_Driver_1080x.webp"

export default function SplashPage() {
  return (
        <section>
            <div
            className="splashBackground"
            style={{
                backgroundImage: `url(${splashPic})`,
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center" 
            }}>
            <div>
                <h2>Er du over 18 år?</h2>
            </div>
            </div>
        </section>
    )
}
