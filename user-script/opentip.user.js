// ==UserScript==
// @name              OpenTip Login
// @name:zh-CN        OpenTip登录
// @namespace         https://github.com/emptylight370/release/blob/main/user-script/opentip.user.js
// @version           1.0.0
// @description       Auto login to OpenTip.
// @description:zh-CN 自动登录到OpenTip.
// @author            Emptylight
// @match             https://opentip.kaspersky.com/
// @icon              https://opentip.kaspersky.com/favicon.ico
// @grant             none
// @run-at            document-end
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...
  click();
})();

function click() {
  try {
    if (document.querySelector("[data-testid='menu-navigation-footer-login']").textContent.match("@")) {
      return;
    } else {
      document.querySelector("[data-testid='menu-navigation-footer-login']").click();
    }
  } catch (error) {
    setTimeout(click, 300);
  }
  let inputs = document.querySelectorAll(".ant-checkbox-input");
  inputs.forEach((input) => {
    input.click();
  });
  document.querySelector(".ant-btn.AceptPrivacyMenu_loginButton_UDhpnVig").click();
}
