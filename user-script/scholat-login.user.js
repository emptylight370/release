// ==UserScript==
// @name         Scholat login
// @namespace    https://github.com/lingfengyu-dreaming/release/blob/main/user-script/scholat-login.user.js
// @version      1.0.0
// @description  Auto redirect to login page when open scholat website.
// @author       Emptylight
// @match        https://www.scholat.com/
// @icon         http://scholat.com/favicon.ico
// @grant        none
// ==/UserScript==

window.onload = function() {
    var href = document.getElementById("loginHref").href;
    location.href = href;
}
