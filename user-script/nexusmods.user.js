// ==UserScript==
// @name         Better Nexus Mods
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/nexusmods.user.js
// @version      1.3.0
// @description  Try to do something on nexusmods website.
// @author       Emptylight
// @match        https://www.nexusmods.com/*
// @icon         http://nexusmods.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  removeADs();
  setTimeout(checkProblems,3000);
})();

window.addEventListener("popstate", checkProblems());

function removeADs() {
  let adsContainer = document.querySelector(".ads");
  let flag = false;
  if (!adsContainer) {
    adsContainer = document.querySelector("[data-testid=\"ad-container-player\"]");
    if (adsContainer) {
      adsContainer.parentElement.parentElement.removeChild(adsContainer.parentElement);
      flag = true;
    }
  } else {
    adsContainer.parentElement.removeChild(adsContainer);
    flag = true;
  }
  if (flag) {
    setTimeout(removeADs,3000);
  }
}

function checkProblems() {
  var center = document.querySelector(".text-center");
  console.log(center);
  if (center?.firstChild?.textContent === "Oops!") {
    location.reload();
    console.log("error occurs! reload page!");
    setTimeout(checkProblems,3000);
  }
}