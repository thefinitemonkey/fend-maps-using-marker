# FEND Project 7 (Maps)

## Overview
This is an alternative version of the final code from the FEND Project 7 walkthrough available at fend-maps-walkthrough. This was created to illustrate how the project can be done using the <Marker> component from google-maps-react and still fulfill all the rubric requirements. Other elements have been simplified as well so it does only what is necessary to pass.

This code utilizes the following components and services beyond the standard React library:

* Google Maps
* FourSquare
* Font Awesome
* React Material-UI for the Drawer
* google-maps-react for primary map display

## Features
A list of Mexican restaurants in the Katy, TX area has been created. These locations display as markers on the map. Clicking a marker displays an info box containing the name of the restaurant, a link to its web site (if avaialble), and a picture from FourSquare related to the restaurant (if available). Clicking the hamburger button on the left of the screen opens a drawer with a list of the venues and a text box at the top. Typing into the box filter the list of restaurants accordingly. Clicking a restaurant in the list closes the drawer and activates the marker on the map as if it had been clicked. Clicking anywhere outside the drawer closes the drawer. Clicking anywhere on the map closes any active info display.

## Setup
* Clone this repo from https://github.com/thefinitemonkey/fend-project-7-map
* Run `npm install`
* Run `npm start`

Note that the default service worker is used in this app (bootstrapped with create-react-app) and so only works in production build.
