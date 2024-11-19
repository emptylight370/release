// ==UserScript==
// @name         SCNU moodle sso redirect
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/scnu-sso.user.js
// @version      1.0.6
// @description  自动跳转到统一登录界面
// @author       Emptylight
// @match        https://moodle.scnu.edu.cn/login/index.php
// @match        https://jwxt.scnu.edu.cn/xtgl/login_slogin.html
// @icon         https://sso.scnu.edu.cn/AccountService/static/fullscreen/images/scnulogo-icon.png
// @grant        none
// ==/UserScript==

var time = 0;

window.addEventListener("load", function () {
    try {
        redirect();
    } catch {
        setTimeout(redirect, 300);
    }
});

function redirect() {
    var btn = null;
    if (location.href.includes("moodle")) {
        btn = document.querySelector("#ssobtn");
        var href = btn.getAttribute('href');
        if (href) {
            location.href = href;
        } else {
            throw new Error('no href can redirect!');
        }
    } else if (location.href.includes("jwxt")) {
        btn = document.querySelector("#tysfyzdl");
        if (btn) {
            btn.click();
        } else {
            throw new Error('login button not found!');
        }
    }
}
