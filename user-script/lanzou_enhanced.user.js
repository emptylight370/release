// ==UserScript==
// @name               Lanzou Enhanced
// @name:zh-CN         蓝奏云增强
// @namespace          https://github.com/emptylight370/release/blob/main/user-script
// @version            1.0.0
// @description        Add some actions to lanzou.
// @description:zh-CN  为蓝奏云添加一些功能。
// @author             Emptylight
// @homepage           https://github.com/emptylight370/release/blob/main/user-script
// @homepageURL        https://github.com/emptylight370/release/blob/main/user-script
// @source             https://github.com/emptylight370/release/blob/main/user-script/lanzou_enhanced.user.js
// @supportURL         https://github.com/emptylight370/release/issues
// @include            https://*.lanzou*.com/*
// @icon               https://images.bakstotre.com/assets/favicon.ico
// ==/UserScript==

(function () {
  "use strict";

  // 输入密码界面生效
  const pwd = document.getElementById("pwd");
  if (!pwd) return;
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const button = document.getElementById("sub");
      if (button) button.click();
    }
  });
})();
