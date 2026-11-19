# Malyna Tech

Сайт компанії: публічне портфоліо проєктів і приватний кабінет власника з документацією.
Статичний сайт на GitHub Pages, база даних — Firestore (Firebase, Google Cloud).

- Сайт: https://sergii21.github.io/malyna-tech/
- Кабінет власника: https://sergii21.github.io/malyna-tech/admin/

## Структура

| Файл | Що це |
|---|---|
| `index.html`, `assets/app.js` | Публічна сторінка: послуги, проєкти, стек |
| `assets/data.js` | Стартовий список проєктів і тексти UA/EN |
| `admin/index.html`, `assets/admin.js` | Кабінет власника: документація (Markdown) і редактор проєктів |
| `assets/firebase-config.js` | Конфіг Firebase (вставити свій) |
| `firestore.rules` | Правила доступу до бази |

Поки Firebase не підключено, сайт показує проєкти з `assets/data.js`, а кабінет — інструкцію з налаштування.

## Підключення бази (один раз, ~5 хв)

1. Відкрийте https://console.firebase.google.com → **Add project** (Google Analytics можна вимкнути).
2. **Build → Firestore Database → Create database** → режим *Production*, регіон `europe-west` (або найближчий).
3. **Build → Authentication → Get started → Sign-in method → Google → Enable**.
4. **Authentication → Settings → Authorized domains → Add domain** → `sergii21.github.io`.
5. **Project settings (⚙) → Your apps → Web (`</>`)** → зареєструйте застосунок і скопіюйте `firebaseConfig`.
6. Вставте значення у `assets/firebase-config.js`, закомітьте й запуште.
7. Відкрийте `/admin/`, увійдіть через Google. Сторінка покаже «Немає доступу» і ваш **UID** — скопіюйте його.
8. **Firestore Database → Rules** → вставте вміст `firestore.rules`, замініть `OWNER_UID` на свій UID → **Publish**.
9. Поверніться в кабінет → «Перевірити ще раз». У вкладці «Проєкти» натисніть «Імпортувати стартовий список».

## Як влаштована приватність

- Код сторінки `/admin/` публічний (це GitHub Pages), але **дані** лежать у Firestore.
- Документи з колекції `docs` сервер віддає лише акаунту з вашим UID — це перевіряють правила Firestore, а не браузер.
- Колекцію `projects` читають усі, змінюєте лише ви.
- `firebaseConfig` не є секретом — це ідентифікатор проєкту, а не пароль.

## Локальний запуск

```bash
python3 -m http.server 8080
```

Потім відкрийте http://localhost:8080. Для входу через Google локально домен `localhost` уже дозволений у Firebase.
