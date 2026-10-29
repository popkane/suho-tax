// 방문 통계 (구글 애널리틱스 GA4)
// 사무실·집·직원 기기는 주소 뒤에 ?internal=1 로 한 번 들어오면 그 기기는 통계에서 빠진다 (?internal=off 로 해제)
(function () {
  var ID = 'G-GLK7XW7Q9C';
  try {
    var q = location.search;
    if (/[?&]internal=off/.test(q)) localStorage.removeItem('suho_internal');
    else if (/[?&]internal=1/.test(q)) localStorage.setItem('suho_internal', '1');
    if (localStorage.getItem('suho_internal')) return;
  } catch (e) {}
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ID);
  // 전화·카톡 버튼 누른 횟수 (문의 의도)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (/^tel:/.test(h)) gtag('event', 'phone_click', { page: location.pathname });
    else if (/pf\.kakao\.com/.test(h)) gtag('event', 'kakao_click', { page: location.pathname });
  });
})();
