// ==UserScript==
// @name         SCNU moodle sso redirect
// @namespace    https://github.com/lingfengyu-dreaming/release/blob/main/user-script/scnu-sso.user.js
// @version      1.0.2
// @description  自动跳转到统一登录界面
// @author       lingfengyu-dreaming
// @match        https://moodle.scnu.edu.cn/login/index.php
// @icon         https://sso.scnu.edu.cn/AccountService/static/fullscreen/images/scnulogo-icon.png
// @grant        none
// ==/UserScript==

window.onload =  function () {
    var count = 0;
    try {
        redirect();
    }
    catch {
        if (count < 30) {
            setTimeout(redirect, 100);
            count++;
        }
    }
};

function redirect() {
    var btn = document.querySelector("#ssobtn");
    var href = btn.href;
    location.href = href;
}
