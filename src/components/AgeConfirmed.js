import React, { useState } from 'react'

export default function AgeConfirmed() {
    const [ageConfirmed, setAgeConfirmed] = useState(false);

    const handleConfirmed = (event) => {
        localStorage.setItem(setAgeConfirmed(true))
        console.log("Age is confirmed!")
    }
    


    return (
        <div>AgeConfirmed</div>
    )
}
