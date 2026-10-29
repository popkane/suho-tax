// 방문 통계 (구글 애널리틱스 GA4 + 네이버 애널리틱스)
// 내부 방문 제외: ① 아래 INTERNAL_IP(사무실·집)에서 들어오면 빠짐 ② LTE 폰 등은 주소 뒤에 ?internal=1 로 한 번 들어오면 그 기기는 빠짐 (?internal=off 로 해제)
(function () {
  var GA_ID = 'G-GLK7XW7Q9C';
  var NAVER_ID = '1d37d077cc7b9c0';
  var INTERNAL_IP = ['125.242.52.78']; // 사무실

  try {
    var q = location.search;
    if (/[?&]internal=off/.test(q)) localStorage.removeItem('suho_internal');
    else if (/[?&]internal=1/.test(q)) localStorage.setItem('suho_internal', '1');
    if (localStorage.getItem('suho_internal')) return;
  } catch (e) {}

  function load(src, cb) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    if (cb) s.onload = cb;
    document.head.appendChild(s);
  }

  function start() {
    // GA4
    load('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
    // 네이버 애널리틱스
    window.wcs_add = window.wcs_add || {};
    wcs_add['wa'] = NAVER_ID;
    load('https://wcs.pstatic.net/wcslog.js', function () { if (window.wcs) wcs_do(); });
    // 전화·카톡 버튼 누른 횟수 (문의 의도)
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var h = a.getAttribute('href');
      if (/^tel:/.test(h)) gtag('event', 'phone_click', { page: location.pathname });
      else if (/pf\.kakao\.com/.test(h)) gtag('event', 'kakao_click', { page: location.pathname });
    });
  }

  // 내부 IP 확인 (1.5초 안에 답이 없으면 그냥 기록)
  var done = false;
  function go(ip) { if (done) return; done = true; if (INTERNAL_IP.indexOf(ip) < 0) start(); }
  setTimeout(function () { go(''); }, 1500);
  fetch('https://api.ipify.org?format=json').then(function (r) { return r.json(); })
    .then(function (d) { go(d.ip); }).catch(function () { go(''); });
})();
