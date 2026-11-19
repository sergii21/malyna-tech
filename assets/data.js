// Стартовий список проєктів. Сайт показує його, доки в Firestore (колекція `projects`)
// немає власних записів. Після імпорту в адмінці редагуйте проєкти вже там.

export const GITHUB_USER = "sergii21";

export const CATEGORIES = ["web", "mobile", "fintech", "dashboard"];

export const PROJECTS = [
  {
    id: "alert-nearby",
    title: "Тривога Поруч / Alert Nearby",
    year: 2026,
    category: "mobile",
    private: false,
    repo: "https://github.com/sergii21/life_saver_air_alert_nearby",
    stack: ["React Native", "Expo", "TypeScript", "Maps", "Push"],
    desc_uk:
      "Мобільний застосунок для iOS та Android. Читає публічні Telegram-канали з локальними сповіщеннями, порівнює названі райони з поточним місцем користувача і показує повноекранне попередження, коли небезпека саме поруч. Перше місто — Вінниця.",
    desc_en:
      "A mobile app for iOS and Android. It reads public Telegram channels with local alerts, matches the districts they name against the user's current location and shows a full-screen warning when the danger is nearby. First target city: Vinnytsia.",
  },
  {
    id: "ledger-lens",
    title: "Ledger Lens",
    year: 2026,
    category: "fintech",
    private: false,
    repo: "https://github.com/sergii21/open-banking",
    stack: ["Angular", "TypeScript", "Node.js", "SQLite", "Playwright"],
    desc_uk:
      "Open Banking proof of concept: особисті фінанси на реальних банківських даних. Підключає monobank, ПриватБанк і Wise, зводить усе в гривні, рахує звіт ФОП 3-ї групи, знаходить регулярні платежі та формує платіжні QR-коди НБУ. Дані лишаються локально.",
    desc_en:
      "An Open Banking proof of concept: personal finance on real bank data. Connects monobank, PrivatBank and Wise, totals everything in hryvnias, builds a sole-proprietor tax report, detects regular payments and generates NBU payment QR codes. Data stays local.",
  },
  {
    id: "platform-workspace",
    title: "Angular Workspace — платформа з адмінкою",
    title_en: "Angular Workspace — platform with back office",
    year: 2025,
    category: "web",
    private: true,
    repo: "",
    stack: ["Angular", "NgRx", "Angular Material", "Tailwind", "AG Grid", "ApexCharts", "GitLab CI"],
    desc_uk:
      "Монорепозиторій із кількох застосунків: адмін-панель, клієнтський фронтенд і спільна UI-бібліотека з власними бекендами. Єдиний стан на NgRx, таблиці на AG Grid, графіки, CI-збірка.",
    desc_en:
      "A monorepo with several apps: an admin panel, a customer-facing front end and a shared UI library, each with its own backend. NgRx state, AG Grid tables, charts and a CI pipeline.",
  },
  {
    id: "business-builder",
    title: "Business Builder",
    year: 2025,
    category: "web",
    private: true,
    repo: "",
    stack: ["Angular", "NgRx", "Angular Material", "Tailwind"],
    desc_uk:
      "Бек-офіс для керування операторами, іграми та користувачами: авторизація, генератор форм, універсальні таблиці, діалоги та резолвери даних.",
    desc_en:
      "A back office for managing operators, games and users: authentication, a form generator, reusable tables, dialogs and data resolvers.",
  },
  {
    id: "grid-app",
    title: "Data Grid App",
    year: 2025,
    category: "dashboard",
    private: true,
    repo: "",
    stack: ["Angular", "AG Grid", "RxJS", "Node.js"],
    desc_uk:
      "Корпоративний застосунок для роботи з великими таблицями: AG Grid, пошукові контроли з typeahead, HTTP-інтерцептори та проксі-сервер для інтеграції з бекендом.",
    desc_en:
      "An enterprise app for working with large tables: AG Grid, searchable typeahead controls, HTTP interceptors and a proxy server for backend integration.",
  },
  {
    id: "fresh-react-next",
    title: "Fresh React Next",
    year: 2025,
    category: "web",
    private: false,
    repo: "https://github.com/sergii21/fresh-react-next",
    stack: ["Next.js", "React", "Firebase", "Tailwind", "TypeScript"],
    desc_uk:
      "Застосунок на Next.js з реєстрацією та входом через Firebase, власним UI-набором і завантаженням файлів drag-and-drop.",
    desc_en:
      "A Next.js app with Firebase sign-up and sign-in, its own UI kit and drag-and-drop file upload.",
  },
  {
    id: "budget",
    title: "Budget",
    year: 2024,
    category: "fintech",
    private: false,
    repo: "https://github.com/sergii21/budget",
    stack: ["React", "Redux Toolkit", "Express", "MongoDB", "styled-components"],
    desc_uk:
      "Full-stack застосунок для ведення бюджету: клієнт на React з Redux Toolkit і REST-сервер на Express з MongoDB.",
    desc_en:
      "A full-stack budgeting app: a React client with Redux Toolkit and an Express REST server on MongoDB.",
  },
  {
    id: "users-angular-app",
    title: "Users Angular App",
    year: 2024,
    category: "web",
    private: false,
    repo: "https://github.com/sergii21/users-angular-app",
    stack: ["Angular", "NgRx", "RxJS", "SCSS"],
    desc_uk:
      "Керування користувачами на Angular: feature-модулі, стан на NgRx Entity, спільні компоненти й директиви, покриття тестами.",
    desc_en:
      "User management in Angular: feature modules, NgRx Entity state, shared components and directives, covered with tests.",
  },
  {
    id: "vue-booking",
    title: "Vue Booking",
    year: 2024,
    category: "web",
    private: true,
    repo: "",
    stack: ["Vue 3", "Pinia", "Vite", "Vitest", "Cypress"],
    desc_uk:
      "Застосунок бронювання на Vue 3 з Pinia та Vue Router, юніт-тестами на Vitest і e2e-тестами на Cypress.",
    desc_en:
      "A booking app on Vue 3 with Pinia and Vue Router, unit tests in Vitest and end-to-end tests in Cypress.",
  },
  {
    id: "desp",
    title: "DESP — аналітичний дашборд",
    title_en: "DESP — analytics dashboard",
    year: 2023,
    category: "dashboard",
    private: true,
    repo: "",
    stack: ["Angular", "NgRx", "Highcharts", "AG Grid", "ngx-translate"],
    desc_uk:
      "Дашборд із налаштовуваними віджетами: treemap, графіки Highcharts, таблиці AG Grid, довідники об'єктів і товарів, багатомовний інтерфейс.",
    desc_en:
      "A dashboard with configurable widgets: treemaps, Highcharts graphs, AG Grid tables, site and commodity directories and a multilingual interface.",
  },
  {
    id: "angular-tdd",
    title: "Angular TDD",
    year: 2023,
    category: "web",
    private: false,
    repo: "https://github.com/sergii21/angular-tdd",
    stack: ["Angular", "NgRx", "Angular Material", "Tailwind", "Jasmine"],
    desc_uk:
      "Застосунок, написаний через тести: каталог товарів, дашборд і динамічні форми зі станом на NgRx.",
    desc_en:
      "An app built test-first: a product catalogue, a dashboard and dynamic forms with NgRx state.",
  },
  {
    id: "ordering",
    title: "Ordering App",
    year: 2020,
    category: "web",
    private: true,
    repo: "",
    stack: ["React", "Redux Toolkit", "TypeScript", "Storybook", "Bootstrap", "Express"],
    desc_uk:
      "Система замовлень: товари, замовлення та адмін-розділ. Компоненти задокументовані в Storybook, є сервер на Express і mock-сервер для розробки.",
    desc_en:
      "An ordering system: products, orders and an admin area. Components are documented in Storybook, with an Express server and a mock server for development.",
  },
  {
    id: "angular-chart",
    title: "Angular Chart",
    year: 2020,
    category: "dashboard",
    private: false,
    repo: "https://github.com/sergii21/angular-chart",
    stack: ["Angular", "D3.js", "TypeScript"],
    desc_uk: "Інтерактивні графіки на D3.js, вбудовані в Angular-компоненти.",
    desc_en: "Interactive D3.js charts wrapped in Angular components.",
  },
  {
    id: "auto-booking",
    title: "AutoBooking",
    year: 2020,
    category: "web",
    private: false,
    repo: "https://github.com/sergii21/autoBooking",
    stack: ["React", "Material UI", "Axios", "Sass"],
    desc_uk:
      "Інтерфейс бронювання на React і Material UI з маршрутизацією та роботою з API.",
    desc_en: "A booking interface in React and Material UI with routing and API integration.",
  },
];

export const I18N = {
  uk: {
    "nav.services": "Послуги",
    "nav.projects": "Проєкти",
    "nav.stack": "Стек",
    "nav.contact": "Контакти",
    "hero.kicker": "IT-компанія з України",
    "hero.title": "Робимо софт, який <em>дозріває</em> вчасно",
    "hero.lead":
      "Malyna Tech проєктує та розробляє вебзастосунки, мобільні продукти й фінтех-інтеграції — від першого прототипу до продакшену.",
    "hero.cta": "Переглянути проєкти",
    "hero.cta2": "Написати нам",
    "stat.projects": "проєктів",
    "stat.years": "рік першого проєкту",
    "stat.tech": "технологій у роботі",
    "services.title": "Що ми робимо",
    "s1.t": "Вебзастосунки",
    "s1.d": "SPA та адмін-панелі на Angular, React і Vue: складний стан, великі таблиці, форми, рольовий доступ.",
    "s2.t": "Мобільні продукти",
    "s2.d": "Кросплатформні застосунки на React Native та Expo з геолокацією, картами й push-сповіщеннями.",
    "s3.t": "Фінтех та Open Banking",
    "s3.d": "Інтеграції з банківськими API, облік, звітність і платіжні сценарії з увагою до безпеки даних.",
    "s4.t": "Дашборди й аналітика",
    "s4.d": "Візуалізація даних: графіки, віджети, data grid на мільйони рядків і багатомовні інтерфейси.",
    "projects.title": "Проєкти",
    "projects.lead": "Усе, що ми зробили як компанія. Частина коду закрита — для таких проєктів є лише опис.",
    "f.all": "Усі",
    "f.web": "Веб",
    "f.mobile": "Мобільні",
    "f.fintech": "Фінтех",
    "f.dashboard": "Дашборди",
    "p.private": "Закритий код",
    "p.code": "Код на GitHub",
    "p.empty": "У цій категорії поки немає проєктів.",
    "stack.title": "Технології",
    "contact.title": "Маєте ідею? Обговорімо",
    "contact.lead": "Розкажіть про задачу — повернемося з оцінкою та планом.",
    "contact.cta": "Написати на GitHub",
    "footer.admin": "Вхід для власника",
  },
  en: {
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.contact": "Contact",
    "hero.kicker": "IT company from Ukraine",
    "hero.title": "We build software that <em>ripens</em> on time",
    "hero.lead":
      "Malyna Tech designs and builds web apps, mobile products and fintech integrations — from the first prototype to production.",
    "hero.cta": "See the projects",
    "hero.cta2": "Get in touch",
    "stat.projects": "projects",
    "stat.years": "first project shipped",
    "stat.tech": "technologies in use",
    "services.title": "What we do",
    "s1.t": "Web applications",
    "s1.d": "SPAs and admin panels in Angular, React and Vue: complex state, large tables, forms, role-based access.",
    "s2.t": "Mobile products",
    "s2.d": "Cross-platform apps in React Native and Expo with geolocation, maps and push notifications.",
    "s3.t": "Fintech & Open Banking",
    "s3.d": "Bank API integrations, bookkeeping, reporting and payment flows with care for data security.",
    "s4.t": "Dashboards & analytics",
    "s4.d": "Data visualisation: charts, widgets, data grids with millions of rows and multilingual interfaces.",
    "projects.title": "Projects",
    "projects.lead": "Everything we have built as a company. Some code is closed — those projects come with a description only.",
    "f.all": "All",
    "f.web": "Web",
    "f.mobile": "Mobile",
    "f.fintech": "Fintech",
    "f.dashboard": "Dashboards",
    "p.private": "Closed source",
    "p.code": "Code on GitHub",
    "p.empty": "No projects in this category yet.",
    "stack.title": "Technologies",
    "contact.title": "Have an idea? Let's talk",
    "contact.lead": "Tell us about the task — we will come back with an estimate and a plan.",
    "contact.cta": "Message on GitHub",
    "footer.admin": "Owner sign-in",
  },
};
