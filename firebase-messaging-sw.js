// ============================================================
//  firebase-messaging-sw.js
//  백그라운드 푸시 수신 (앱이 꺼져 있거나 다른 화면을 볼 때)
//  ★ 이 파일은 viewer.html 과 "같은 폴더"에 올라가야 합니다.
//     (GitHub Pages 기준: /yjsw/firebase-messaging-sw.js)
// ============================================================

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDbQyd-b5StGfOf33kDYQZd8-bw3mJETPg",
  authDomain: "yjsw-grand.firebaseapp.com",
  projectId: "yjsw-grand",
  storageBucket: "yjsw-grand.firebasestorage.app",
  messagingSenderId: "572650294249",
  appId: "1:572650294249:web:c55f616bf51707154f9978"
});

const messaging = firebase.messaging();

// 백그라운드에서 푸시 도착 시 알림 표시
messaging.onBackgroundMessage(function(payload) {
  const title = (payload.notification && payload.notification.title) ||
                (payload.data && payload.data.title) || "그랜드 캐디";
  const body  = (payload.notification && payload.notification.body) ||
                (payload.data && payload.data.body) || "새 소식이 있습니다";

  self.registration.showNotification(title, {
    body: body,
    icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26f3.png", // ⛳
    badge: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26f3.png",
    tag: "grand-caddie-board", // 같은 tag는 덮어씀 (중복 알림 방지)
    renotify: true,
    data: payload.data || {}
  });
});

// 알림 클릭 시 앱 열기 (이미 열려 있으면 그 탭으로 포커스)
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(list) {
      for (const c of list) {
        if ("focus" in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow("./");
    })
  );
});
