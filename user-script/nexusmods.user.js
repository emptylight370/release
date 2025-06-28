// ==UserScript==
// @name         Better Nexus Mods
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/nexusmods.user.js
// @version      1.2.1
// @description  Try to do something on nexusmods website.
// @author       Emptylight
// @match        https://www.nexusmods.com/*
// @icon         http://nexusmods.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  for (var run = 0; run < 5; run++){
    var hasAD = removeADs();
    if (hasAD) {
      setTimeout(removeADs,3000);
    }
  }
})();

function removeADs() {
  let adsContainer = document.querySelector(".ads");
  if (!adsContainer) {
    adsContainer = document.querySelector("[data-testid=\"ad-container-player\"]");
    if (adsContainer) {
      adsContainer.parentElement.parentElement.removeChild(adsContainer.parentElement);
      return true;
    } else {
      return false;
    }
  } else {
    adsContainer.parentElement.removeChild(adsContainer);
    return true;
  }
}