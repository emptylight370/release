// ==UserScript==
// @name         Better Nexus Mods
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/nexusmods.user.js
// @version      1.0.0
// @description  Try to do something on nexusmods website.
// @author       Emptylight
// @match        https://www.nexusmods.com/*
// @icon         http://nexusmods.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...
  let adsContainer = document.querySelector(".ads");
  adsContainer.parentElement.removeChild(adsContainer);
})();