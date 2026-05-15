// ==UserScript==
// @name         Microsoft Learn跳转中文版本
// @namespace    https://github.com/emptylight370/release/blob/main/user-script
// @version      1.0.1
// @description  打开Microsoft Learn自动从英文跳转到中文版本
// @author       Emptylight
// @homepageURL  https://github.com/emptylight370/release/blob/main/user-script
// @source       https://github.com/emptylight370/release/blob/main/user-script/ms-learn.user.js
// @supportURL   https://github.com/emptylight370/release/issues
// @match        https://learn.microsoft.com/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  "use strict";

  if (location.pathname.includes(GM_getValue("target_language", "zh-cn")))
    return;

  const target = GM_getValue("target_language", "zh-cn");
  const href = location.href.replace(/(?<=\/)\w{2}-\w{2}(?=\/)/i, target);
  location.href = href;
})();

GM_registerMenuCommand("设置目标语言", () => {
  const input = prompt(
    "请输入自定义语言标识，例如 zh-cn",
    GM_getValue("target_language", "zh-cn"),
  );
  if (!input) {
    GM_deleteValue("target_language");
    return;
  }
  if (!input.match(/^\w{2}-\w{2}$/i))
    alert("语言标识格式不正确，请使用 xx-xx 格式");
  GM_setValue("target_language", input);
  alert("已保存，将在刷新后生效：" + input);
});
