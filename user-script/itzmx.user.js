// ==UserScript==
// @name         Itzmx签到脚本
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/itzmx.user.js
// @version      1.0.0
// @description  自动完成itzmx论坛的签到
// @author       Emptylight
// @match        https://bbs.itzmx.com/*
// @icon         http://itzmx.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(async function () {
    'use strict';

    // Your code here...
    var check = await getElement("qiandao");
    if (check) {
        var time = new Date().getMilliseconds();
        var id = time % 9;
        var emo;
        if (id == 0) {
            emo = await getElement("kx");
        } else if (id == 1) {
            emo = await getElement("ng");
        } else if (id == 2) {
            emo = await getElement("ym");
        } else if (id == 3) {
            emo = await getElement("wl");
        } else if (id == 4) {
            emo = await getElement("nu");
        } else if (id == 5) {
            emo = await getElement("ch");
        } else if (id == 6) {
            emo = await getElement("fd");
        } else if (id == 7) {
            emo = await getElement("yl");
        } else if (id == 8) {
            emo = await getElement("shuai");
        }
        emo.click();
        var say = await getElement("todaysay");
        var day = new Date().getDate().toString().padStart(2, '0');
        say.value = "签到qd" + day;
    }
})();

async function getElement(id, timeout = 5000) {
    return new Promise((resolve, reject) => {
        var startTime = Date.now();

        var checkElement = () => {
            var element = document.getElementById(id);

            if (element) {
                resolve(element);
                return;
            }

            if (Date.now() - startTime >= timeout) {
                reject(new Error(`Timeout waiting for element: ${id}`));
                return;
            }

            setTimeout(checkElement, 100);
        };

        checkElement();
    });
}
