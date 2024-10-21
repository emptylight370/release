// ==UserScript==
// @name         SCNU moodle sso redirect
// @namespace    https://github.com/lingfengyu-dreaming/release/blob/main/user-script/scnu-sso.user.js
// @version      1.0.4
// @description  自动跳转到统一登录界面
// @author       lingfengyu-dreaming
// @match        https://moodle.scnu.edu.cn/login/index.php
// @match        https://jwxt.scnu.edu.cn/xtgl/login_slogin.html
// @icon         https://sso.scnu.edu.cn/AccountService/static/fullscreen/images/scnulogo-icon.png
// @grant        none
// ==/UserScript==

window.onload = function () {
    redirect();
};

function redirect() {
    if (location.href.includes("moodle")) {
        var btn = document.querySelector("#ssobtn");
    } else if (location.href.includes("jwxt")) {
        var btn = document.querySelector("#tysfyzdl");
    }
    btn.click();
}
