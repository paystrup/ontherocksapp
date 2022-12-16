import React from "react";
import { useState } from "react";
import MainButton from "../components/MainButton";

export default function OnboardingPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleAgeConfirmed = (event) => {
    setIsConfirmed(true);
    console.log(isConfirmed);
  };

  const handleAgeConfirmedDelete = (event) => {
    setIsConfirmed(false);
    console.log(isConfirmed);
  };

  return (
    <>
      {isConfirmed && (
        <section className="fixed h-full w-full top-0 left-0 bg-primaryGray-700 z-[9999]">
          <h2 className="font-displayBook text-7xl text-center">
            Er du over 18 år?
          </h2>
          <MainButton />

          <div className="flex gap-5">
            <button onClick={handleAgeConfirmed()} className="border-2">
              Klik her for at confirme
            </button>
            <button onClick={handleAgeConfirmedDelete()} className="border-2">
              Klik her for at slette
            </button>
          </div>
        </section>
      )}
    </>
  );
}
