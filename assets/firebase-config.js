// Конфігурація Firebase (Google Cloud).
// Вставте сюди об'єкт із Firebase Console → Project settings → Your apps → Web app.
// Ці значення не є секретом: доступ до даних обмежують правила Firestore (див. firestore.rules).

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: "",
};

export const FIREBASE_VERSION = "12.0.0";

export const isConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const fb = (name) =>
  import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-${name}.js`);
