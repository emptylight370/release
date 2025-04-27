// ==UserScript==
// @name         Bangumi Enhanced
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/bangumi_enhanced.user.js
// @version      1.1.1
// @description  Add some actions to bangumi.
// @author       Emptylight
// @match        https://bgm.tv/*
// @match        https://bangumi.tv/*
// @icon         http://bgm.tv/favicon.ico
// @grant        GM_addStyle
// @grant        GM_notification
// ==/UserScript==

(function () {
  'use strict';

  if (location.href.match(/subject\/\d+\/ep$/i)) {
    // 查看动漫章节
    let eps = document.querySelector("div.line_detail");
    let titles = eps.querySelectorAll("h6");
    titles.forEach(title => {
      let aElement = title.querySelector("a");
      let spanElement = title.querySelector("span.tip");
      if (aElement && aElement.textContent.length > 0) {
        let copyBtn = copyTitle(aElement, /(?<=\d\.)(.+)/);
        title.insertBefore(copyBtn, spanElement);
      }
      if (spanElement && spanElement.textContent.length > 0) {
        let copyBtn = copyTitle(spanElement, /(?<=\/\s+)(.+)/);
        title.appendChild(copyBtn);
      }
    });
  }
})();

/**
 * 向文档中插入脚本的style标签
 */
function insertStyles() {
  var style = `
    .hints {
      width: fit-content;
      max-width: 150px;
      height: fit-content;
      border: 1px solid black;
      border-radius: 15px;
      position: fixed;
      right: 20px;
      top: 15px;
      background-color: white;
      padding: 5px 5px;
    }

    .hints.info {
      color: black;
    }

    .hints.warning {
      color: #bfbf00;
    }

    .hints.success {
      color: #009f00;
    }

    .hints.error {
      color: #6f0000;
    }
  `;
  GM_addStyle(style);
}

/**
 * 传入元素生成一个复制按钮用于复制元素文本
 * @param {HTMLAnchorElement | HTMLSpanElement} element 要复制的元素
 * @param {RegExpMatchArray | null} regex 填入 {@link String.prototype.match} 进行匹配的正则表达式
 * @returns 复制传入元素的textContent的按钮
 */
function copyTitle(element, regex) {
  // 创建复制按钮
  var copyBtn = document.createElement("a");
  copyBtn.className = "copy";
  copyBtn.innerHTML = "📋";
  copyBtn.title = "复制标题文本";
  copyBtn.style.cursor = "pointer";
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(element.textContent.match(regex)[1]).then(() => {
      GM_notification("复制标题成功");
    }).catch(err => {
      GM_notification("复制标题失败，使用开发者工具查看报错", undefined, "error");
      console.error(err);
    });
  });
  return copyBtn;
}