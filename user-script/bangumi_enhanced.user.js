// ==UserScript==
// @name         Bangumi Enhanced
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/bangumi_enhanced.user.js
// @version      1.3.2
// @description  Add some actions to bangumi.
// @description:zh-CN 为bangumi添加一些功能。
// @author       Emptylight
// @match        https://bgm.tv/*
// @match        https://bangumi.tv/*
// @icon         http://bgm.tv/img/favicon.ico
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// ANCHOR - 初始化函数
(function () {
  "use strict";

  if (location.href.match(/subject\/\d+\/ep$/i)) {
    // 查看动漫章节
    const eps = document.querySelector("div.line_detail");
    const titles = eps.querySelectorAll("h6");
    titles.forEach((title) => {
      const aElement = title.querySelector("a");
      const spanElement = title.querySelector("span.tip");
      if (aElement && aElement.textContent.length > 0) {
        const copyBtn = copyTitle(aElement, /(?<=\d\.)(.+)/);
        title.insertBefore(copyBtn, spanElement);
      }
      if (spanElement && spanElement.textContent.length > 0) {
        const copyBtn = copyTitle(spanElement, /(?<=\/\s+)(.+)/);
        title.appendChild(copyBtn);
      }
    });
  }
})();

// ANCHOR - 复制标题文本的函数
/**
 * 传入元素生成一个复制按钮用于复制元素文本
 * @param {HTMLAnchorElement | HTMLSpanElement} element 要复制的元素
 * @param {RegExpMatchArray | null} regex 填入 {@link String.prototype.match} 进行匹配的正则表达式
 * @returns 复制传入元素的textContent的按钮
 */
function copyTitle(element, regex) {
  // 创建复制按钮
  const copyBtn = document.createElement("a");
  copyBtn.className = "copy";
  copyBtn.innerHTML = "📋";
  copyBtn.title = "复制标题文本";
  copyBtn.style.cursor = "pointer";
  copyBtn.addEventListener("click", () => {
    GM_setClipboard(element.textContent.match(regex)[1], undefined, () => {
      if (GM_getValue("notification", true)) {
        GM_notification({
          title: "复制标题成功",
          text: element.textContent.match(regex)[1],
          tag: "copy-title-success",
          timeout: 3000,
        });
      }
    });
  });
  return copyBtn;
}

/**
 * NOTE - 添加油猴设置项
 */
// SECTION 添加设置项 - 通知设置
if (GM_getValue("notification", true)) {
  var notification_setting_name = "启用脚本通知：启用";
} else {
  notification_setting_name = "启用脚本通知：禁用";
}
var notification_setting = GM_registerMenuCommand(
  notification_setting_name,
  notification_setting_click,
);

// SECTION 通知设置的点击事件
function notification_setting_click() {
  // GM_unregisterMenuCommand(notification_setting);
  GM_setValue("notification", !GM_getValue("notification", true));
  if (GM_getValue("notification", true)) {
    var notification_setting_name = "启用脚本通知：启用";
  } else {
    notification_setting_name = "启用脚本通知：禁用";
  }
  notification_setting = GM_registerMenuCommand(
    notification_setting_name,
    notification_setting_click,
    {
      id: notification_setting,
    },
  );
}
// !SECTION 通知设置的点击事件
// !SECTION 添加设置项 - 通知设置
