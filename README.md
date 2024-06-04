# KAM ONLINE

Figma project: <br>
GitHub repository: https://github.com/koenmoret/frontend-react-eindopdracht

## Table of contents

* [Over dit project](#Over-dit-project)<br>
* [Requirements](#Requirements)<br>
* [Installatie](#Installatie)<br>
* [Aan de slag](#Aan-de-slag)<br>
  <br><br>
  ![alt text](https://github.com/koenmoret/frontend-react-eindopdracht/blob/main/src/assets/images/ScreenShot.png "screenshot")

## Over-dit-project
Dit project is onderdeel van de eindopdracht HBO-bachelor Software Development leerlijn Frontend.
Door deze opdracht uit te voeren toon ik aan een volwaardige webapplicatie te kunnen bouwen in de
frontend.

Ik heb een elektronische leeromgeving ontwikkeld waar gebruikers een training kunnen aanschaffen.  
Tevens biedt de leeromgeving een nieuwsomgeving waar de gebruiker op de hoogte kan blijven van de
laatste ontwikkelingen op hun vakgebied.

Een gebruiker kan:

* een account aanmaken en account informatie aanpassen
* eigen profiel bekijken in dashboard
* inloggen en uitloggen
* elearning producten aankopen
* elearning cursus volgen
* met een account, nieuws pagina bekijken
* zoeken op relevante artikelen en toevoegen als favoriet aan dashboard

## Requirements

### Runtime environment
Om dit project op uw lokale computer te installeren en uit te voeren, is Node.js vereist. Je kunt Node.js [hier](https://nodejs.org/en).

#### API

Deze webapplicatie maakt gebruik van de API [newsapi.org](https://newsapi.org/).
Hiervoor is de volgende apiKey noodzakelijk: 

"97c237fedab441e5919ed6cfa6aa5767";

#### Backend

De [NOVI Educational Backend](https://novi.datavortex.nl/) is beschikbaar gesteld door [NOVI Hogeschool](https://www.novi.nl/?utm_term=novi%20hogeschool&utm_campaign=SDIM+-+NOVI+-+Branded++-+22-12-2023&utm_source=adwords&utm_medium=ppc&hsa_acc=4280163138&hsa_cam=20882328921&hsa_grp=157473255015&hsa_ad=685547414547&hsa_src=g&hsa_tgt=aud-1929441721854:kwd-853861328135&hsa_kw=novi%20hogeschool&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjw_qexBhCoARIsAFgBlesmYcB3FUcXIxt_UghxIsCzDt7_GbSVXnr1MyhFws0Fahj6eG1AcxkaAms2EALw_wcB).

### react-router-dom
NavLink, useNavigate, Route, Routes, useLocation

### React
createContext, useContext, useState

### Axios
axios

### Iconen
react-icons/fa
react-icons/tb

### Database
https://novi.datavortex.nl/
Your X-Api-Key: kamonline:iTJlC19urHBbchBzvk7T

Add the following to the header of your POST USER request:

Headers: {
'Content-Type': 'application/json',
'X-Api-Key':kamonline:iTJlC19urHBbchBzvk7T
}

### jwt-decode
jwtDecode

### js-cookie
cookie

### sanitize-html
"Door de HTML-inhoud te saniteren voordat je deze rendert, minimaliseer je het risico op XSS-aanvallen (Cross-Site Scripting) en andere beveiligingsproblemen die kunnen optreden wanneer onveilige HTML wordt weergegeven in je toepassing" <br> 
sanitizeHtml 

### prop-types
PropTypes
