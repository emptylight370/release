// ==UserScript==
// @name              SCNU SSO redirect
// @name:zh-CN        SCNU统一认证登录跳转
// @namespace         https://github.com/emptylight370/release/blob/main/user-script/scnu-sso.user.js
// @version           1.1.0
// @description       Auto redirect to SSO login page
// @description:zh-CN 自动跳转到统一登录界面
// @author            Emptylight
// @match             https://moodle.scnu.edu.cn/login/index.php
// @match             https://jwxt.scnu.edu.cn/xtgl/login_slogin.html
// @match             https://jwxt.scnu.edu.cn/xtgl/index_initMenu.html
// @icon              https://sso.scnu.edu.cn/AccountService/static/fullscreen/images/scnulogo-icon.png
// @grant             none
// @run-at            document-start
// ==/UserScript==

var time = 0;

(() => {
  delivery();
})();

/**
 * 处理不同域名的分拣
 */
function delivery() {
  try {
    if (location.href.includes("moodle")) {
      moodleResolve();
    } else if (location.href.includes("jwxt")) {
      jwxtResolve();
    }
  } catch (error) {
    setTimeout(delivery, 300);
  }
}

/**
 * 进行砺儒云跳转
 */
function moodleResolve() {
  var btn = document.querySelector("#ssobtn");
  if (btn) {
    var href = btn.getAttribute("href");
    if (href) {
      location.href = href;
    } else {
      throw new Error("No such href included in the button!");
    }
  } else {
    throw new Error("No such button in the page!");
  }
}

/**
 * 进行教务系统跳转
 */
function jwxtResolve() {
  var btn = null;
  if (location.href.includes("login_slogin")) {
    btn = document.querySelector("#tysfyzdl");
    if (btn) {
      btn.click();
    } else {
      throw new Error("No such login button found!");
    }
  } else if (location.href.includes("index_initMenu")) {
    btn = document.querySelector("#btn_yd");
  } else {
    if (btn) {
      if (btn.innerText !== "已阅读") {
        setTimeout(jwxtResolve, 250);
      } else {
        btn.click();
      }
    } else {
      throw new Error("No any button found in the page!");
    }
  }
}
