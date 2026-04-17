// ==UserScript==
// @name         Itzmx签到脚本
// @namespace    https://github.com/emptylight370/release/blob/main/user-script
// @version      1.2.2
// @description  自动完成itzmx论坛的签到
// @author       Emptylight
// @homepageURL  https://github.com/emptylight370/release/blob/main/user-script
// @source       https://github.com/emptylight370/release/blob/main/user-script/itzmx.user.js
// @supportURL   https://github.com/emptylight370/release/issues
// @match        https://bbs.itzmx.com/*
// @icon         https://bbs.itzmx.com/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// @require      https://scriptcat.org/lib/513/2.1.0/ElementGetter.js#sha256=aQF7JFfhQ7Hi+weLrBlOsY24Z2ORjaxgZNoni7pAz5U=
// ==/UserScript==

(async function () {
  "use strict";

  const lastrun = GM_getValue("lastrun", "0000");
  const day = new Date().getDate().toString().padStart(2, "0");
  const month = new Date().getMonth().toString().padStart(2, "0");
  const today = month + day;
  if (lastrun === today && GM_getValue("hasCheckin", false)) {
    return;
  }

  // Your code here...
  const check = await elmGetter.get("#qiandao", document, 10000);
  if (check) {
    const time = new Date().getMilliseconds();
    const id = time % 9;
    let emo;
    if (id == 0) {
      emo = await elmGetter.get("#kx");
    } else if (id == 1) {
      emo = await elmGetter.get("#ng");
    } else if (id == 2) {
      emo = await elmGetter.get("#ym");
    } else if (id == 3) {
      emo = await elmGetter.get("#wl");
    } else if (id == 4) {
      emo = await elmGetter.get("#nu");
    } else if (id == 5) {
      emo = await elmGetter.get("#ch");
    } else if (id == 6) {
      emo = await elmGetter.get("#fd");
    } else if (id == 7) {
      emo = await elmGetter.get("#yl");
    } else if (id == 8) {
      emo = await elmGetter.get("#shuai");
    }
    emo.click();
    const say = await elmGetter.get("#todaysay");
    say.value = "签到qd" + day;
    if (GM_getValue("clickCheckin", false)) {
      const checkin = await elmGetter.get("#qiandao > p > button > strong");
      checkin.click();
      GM_setValue("hasCheckin", true);
    } else {
      GM_setValue("hasCheckin", false);
    }
    GM_setValue("lastrun", today);
  } else {
    GM_setValue("hasCheckin", false);
  }
})();

if (GM_getValue("clickCheckin", false)) {
  var isClick = GM_registerMenuCommand("✅点击签到按钮", () => {
    switchCheckout();
  });
} else {
  isClick = GM_registerMenuCommand("❌点击签到按钮", () => {
    switchCheckout();
  });
}

function switchCheckout() {
  GM_setValue("clickCheckin", !GM_getValue("clickCheckin", false));
  if (GM_getValue("clickCheckin", false)) {
    GM_registerMenuCommand(
      "✅点击签到按钮",
      () => {
        switchCheckout();
      },
      { id: isClick },
    );
  } else {
    GM_registerMenuCommand(
      "❌点击签到按钮",
      () => {
        switchCheckout();
      },
      { id: isClick },
    );
  }
}
