// ==UserScript==
// @name               Liu Yun forum video auto mute
// @name:zh-CN         链滴社区视频自动静音
// @icon64             data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+9hhAPQAAAdBJREFUWIXt1j1rFFEYhuFrPzAhavyMEkRSSMQiiGUkYKOFlZ2NtsoW0UILEUULURCDKMYY9wcIdtqK2BjSrNhYKIJJQJC1sFghQojursVMYBl3ktmdqWJuGJg5Zw7PPXPgfQ8b/O/kWh/Gjh2Pe+8c7mBPyrwmKrNv34yuDBQTLBrGJHpThhN88GLrQD7BoicZhcMyLnYicBYnMgqHCXxKKrAd9zMMn8Pt6OBqAnexN0OBcSwlFTiK8xmGP8erdhPtBIp4GjPXDTVcjptsF3IJhzMKh+uoJhUYws0MwyuCvxlLVGASWzIK/4MSGqu9FK2EpzIKT8w/pbgcv12ZMdJyH92ClyWDzZLBRk1hRtA8ur3qGLUGUYFx/ERuwu79Io2jQ/KYtkbDiwp8w1X4IT80a/P7FAJwBBc6EYAyZuCZ/rFluS8pJW5hX2KBsmpTUIaX6hSn7VzZ027ZigeJBUKJz8LO9dGm4Xk9abfiNE4mFgi5hw8wZcdII6jpaXiszcEmVqCs+ltwFqwvyvW+sO17SoEDuJZYIJR4h0fwWt+hmsJcSokrOJhYIOQGFpqYsmtAUOO7pQcPOxIoq/7CGcx/Veiv6FtIIQADKddvsM74C39HauiRz2ijAAAAAElFTkSuQmCC
// @namespace          https://github.com/emptylight370/release/blob/main/user-script
// @version            1.0.0
// @description        Auto mute video after load page
// @description:zh-CN  页面加载后自动静音视频
// @author             Emptylight
// @homepageURL        https://github.com/emptylight370/release/blob/main/user-script
// @source             https://github.com/emptylight370/release/blob/main/user-script/ld246-mute.user.js
// @supportURL         https://github.com/emptylight370/release/issues
// @match              https://ld246.com/article/*
// @match              https://liuyun.io/article/*
// @run-at             document-end
// @grant              none
// ==/UserScript==

(function () {
  "use strict";

  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.muted = true;
  });
})();
