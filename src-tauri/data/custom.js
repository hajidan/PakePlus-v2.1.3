window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}
// ==UserScript==
// @name        ESC 返回上一页（PakePlus 专用）
// @match       *://*/*
// @run-at      document-end
// ==/UserScript==

(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;          // 只关心 ESC
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    e.preventDefault();                      // 阻止浏览器默认 ESC 行为
    window.history.back();                   // 返回上一页
  });
})();
// ==UserScript==
// @name        R键刷新 - PakePlus
// @match       *://*/*
// @run-at      document-end
// ==/UserScript==
(function () {
  document.addEventListener('keydown', function (e) {
    // 只在按下 R 且不在输入场景
    if (e.key !== 'r') return;
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    e.preventDefault();          // 阻止浏览器默认 R 行为
    location.reload(true);       // 强制刷新（跳过缓存）
  });
})();
/* 增强版 ESC，兼容搜索后丢失历史 */
(function () {
  const SEARCH_KEY = 'bewly_search_url';

  /* 1. 离开搜索页时存住 URL */
  if (location.pathname.includes('/search')) {
    sessionStorage.setItem(SEARCH_KEY, location.href);
  }

  /* 2. 监听 ESC */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    e.preventDefault();

    /* 有上一帧就退，没有就跳回搜索页 */
    if (history.length > 1) {
      history.back();
    } else {
      const url = sessionStorage.getItem(SEARCH_KEY);
      if (url) location.href = url;
      else history.back();        // 兜底
    }
  });
})();
window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
