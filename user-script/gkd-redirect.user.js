// ==UserScript==
// @name         GKD快照审查器跳转
// @namespace    https://github.com/emptylight370/release/blob/main/user-script
// @version      1.0.0
// @description  重定向 i.gkd.li 到第三方快照审查器
// @author       Emptylight
// @homepageURL  https://github.com/emptylight370/release/blob/main/user-script
// @source       https://github.com/emptylight370/release/blob/main/user-script/bangumi_enhanced.user.js
// @supportURL   https://github.com/emptylight370/release/issues
// @match        https://i.gkd.li/*
// @match        https://li.chenge.eu.org/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  "use strict";

  if (location.hostname !== "i.gkd.li") return;

  const target = GM_getValue("gkd_target", "https://li.chenge.eu.org");
  const path = location.pathname;
  location.href = target + path;
})();

GM_registerMenuCommand("设置自定义目标域名", () => {
  const input = prompt(
    "请输入自定义域名 (含协议)，例如 https://example.com",
    GM_getValue("gkd_target", "https://li.chenge.eu.org"),
  );
  if (!input) return;
  try {
    const parsed = new URL(input);
    GM_setValue("gkd_target", parsed.origin);
    alert("已保存，将在刷新后生效：" + parsed.origin);
  } catch (e) {
    alert("域名格式不正确，请包含 http/https");
  }
});
