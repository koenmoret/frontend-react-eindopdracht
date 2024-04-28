import React from "react";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Elearning() {
    const { id } = useParams(); // Haal het ID van de URL-parameter op

    // Je zou hier productgegevens kunnen ophalen op basis van het ID, maar in dit voorbeeld gebruiken we het ID als titel
    return (
        <div>
            <h1>{id}</h1> {/* Toon het ID (in dit geval de producttitel) */}
            {/* Hier kun je meer details van het product weergeven */}
        </div>
    );
}
export default Elearning;
