// ==UserScript==
// @name         Bangumi Enhanced
// @namespace    https://github.com/emptylight370/release/blob/main/user-script/bangumi_enhanced.user.js
// @version      1.0.0
// @description  Add some actions to bangumi.
// @author       Emptylight
// @match        https://bgm.tv/*
// @icon         http://bgm.tv/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (location.href.match(/subject\/\d+\/ep/gi)) {
        // 查看动漫章节
        var eps = document.querySelector("div.line_detail");
        var titles = eps.querySelectorAll("h6");
        var copyBtn = document.createElement("a");
        copyBtn.className = "copy";
        copyBtn.innerHTML = "📋";
        copyBtn.title = "复制标题文本";
        titles.forEach(title => {
            var aElement = title.querySelector("a");
            var spanElement = title.querySelector("span.tip");
            var copy_a = copyBtn.cloneNode(true);
            copy_a.addEventListener("click", () => {
                navigator.clipboard.writeText(aElement.textContent).then(() => {
                    showHints("复制标题成功");
                }).catch(err => {
                    showHints("复制标题失败", undefined, "error");
                    console.error(err);
                });
            });
            title.insertBefore(copy_a, spanElement);
            var copy_b = copyBtn.cloneNode(true);
            copy_b.addEventListener("click", () => {
                navigator.clipboard.writeText(spanElement.textContent).then(() => {
                    showHints("复制标题成功");
                }).catch(err => {
                    showHints("复制标题失败", undefined, "error");
                    console.error(err);
                });
            });
            title.appendChild(copy_b);
        });
    }
})();

/**
 * 显示一个提示，不想用alert
 * @param {String} text 显示的文本
 * @param {Number} time 显示的时长
 * @param {"info"|"warning"|"success"|"error"} type 显示的类型
 */
function showHints(text, time = 5000, type = "info") {
    var hint = document.createElement("div");
    hint.style.width = "fit-content";
    hint.style.maxWidth = "150px";
    hint.style.height = "fit-content";
    hint.style.border = "1px solid black";
    hint.style.borderRadius = "15px";
    hint.textContent = text;
    hint.style.position = "fixed";
    hint.style.right = "20px";
    hint.style.top = "15px";
    hint.style.backgroundColor = "white";
    switch (type) {
        case "info":
            hint.style.color = "black";
            break;
        case "warning":
            hint.style.color = "#bfbf00";
            break;
        case "success":
            hint.style.color = "#009f00";
            break;
        case "error":
            hint.style.color = "#6f0000";
            break;
    }
    document.body.appendChild(hint);
    setTimeout(() => {
        document.body.removeChild(hint);
    }, time);
}