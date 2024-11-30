export const lessons = [
  {
    id: 1,
    title: "Знакомство с Telegram Mini Apps",
    content: "Базовое понимание что такое Telegram Mini Apps и зачем они нужны",
    tasks: [
      {
        id: "1.1",
        title: "Что такое Telegram Mini Apps?",
        description: "Узнайте основы и возможности Telegram Mini Apps",
        code: `// Telegram Mini Apps - это веб-приложения внутри Telegram
// Они позволяют:
// - Создавать интерактивные приложения
// - Использовать данные пользователя
// - Принимать платежи
// - Работать с ботами
// - И многое другое!`
      },
      {
        id: "1.2",
        title: "Установка необходимых инструментов",
        description: "Установим всё необходимое для разработки",
        code: `// 1. Установите Node.js с официального сайта
// https://nodejs.org/

// 2. Установите редактор кода (например, VS Code)
// https://code.visualstudio.com/

// 3. Создайте бота в Telegram
// Найдите @BotFather в Telegram
// Отправьте команду /newbot
// Следуйте инструкциям`
      }
    ]
  },
  {
    id: 2,
    title: "Создание первого Mini App",
    content: "Создадим простейшее приложение и подключим его к боту",
    tasks: [
      {
        id: "2.1",
        title: "Создание проекта",
        description: "Создадим базовую структуру проекта",
        code: `// Создаем новый React проект
npx create-react-app my-first-mini-app
cd my-first-mini-app

// Устанавливаем SDK Telegram Mini Apps
npm install @twa-dev/sdk`
      },
      {
        id: "2.2",
        title: "Подключение к боту",
        description: "Настроим бота для работы с нашим приложением",
        code: `// В @BotFather выполните:
/mybots
Выберите вашего бота
Bot Settings > Menu Button
Выберите Menu Button URL
Укажите URL вашего приложения`
      }
    ]
  },
  {
    id: 3,
    title: "Основы разработки",
    content: "Изучим базовые компоненты и функции Telegram Mini Apps",
    tasks: [
      {
        id: "3.1",
        title: "Инициализация приложения",
        description: "Научимся правильно инициализировать Mini App",
        code: `import WebApp from '@twa-dev/sdk';

// Сообщаем Telegram, что приложение готово
WebApp.ready();

// Получаем данные пользователя
const user = WebApp.initDataUnsafe?.user;
console.log('Привет,', user?.username);`
      },
      {
        id: "3.2",
        title: "Основные компоненты UI",
        description: "Изучим встроенные компоненты Telegram",
        code: `// Главная кнопка
WebApp.MainButton
  .setText('Нажми меня')
  .show()
  .onClick(() => {
    WebApp.showAlert('Привет!');
  });

// Всплывающие сообщения
WebApp.showAlert('Важное сообщение');
WebApp.showConfirm('Вы уверены?');`
      }
    ]
  },
  {
    id: 4,
    title: "Работа с данными пользователя",
    content: "Научимся получать и использовать данные пользователя",
    tasks: [
      {
        id: "4.1",
        title: "Получение данных пользователя",
        description: "Изучим какие данные доступны о пользователе",
        code: `const user = WebApp.initDataUnsafe?.user;

// Доступные данные:
console.log('ID:', user?.id);
console.log('Имя:', user?.first_name);
console.log('Фамилия:', user?.last_name);
console.log('Язык:', user?.language_code);`
      },
      {
        id: "4.2",
        title: "Верификация данных",
        description: "Научимся проверять подлинность данных",
        code: `// На бэкенде:
const crypto = require('crypto');

function verifyTelegramWebAppData(initData) {
  const encoded = decodeURIComponent(initData);
  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN)
    .digest();
  // ... проверка подписи
}`
      }
    ]
  },
  {
    id: 5,
    title: "Дизайн и UI компоненты",
    content: "Создадим красивый интерфейс в стиле Telegram",
    tasks: [
      {
        id: "5.1",
        title: "Основы дизайна Telegram",
        description: "Изучим принципы дизайна Telegram Mini Apps",
        code: `// Цветовая схема Telegram
:root {
  --tg-theme-bg-color: var(--tg-theme-bg-color);
  --tg-theme-text-color: var(--tg-theme-text-color);
  --tg-theme-hint-color: var(--tg-theme-hint-color);
  --tg-theme-link-color: var(--tg-theme-link-color);
  --tg-theme-button-color: var(--tg-theme-button-color);
  --tg-theme-button-text-color: var(--tg-theme-button-text-color);
}`
      },
      {
        id: "5.2",
        title: "Адаптивный дизайн",
        description: "Создадим адаптивный интерфейс",
        code: `// Получение размеров экрана
const viewportHeight = WebApp.viewportHeight;
const viewportStableHeight = WebApp.viewportStableHeight;

// CSS для адаптивности
.container {
  max-width: 100%;
  padding: 16px;
  margin: 0 auto;
  min-height: viewportHeight;
}`
      }
    ]
  },
  {
    id: 6,
    title: "Интеграция с ботом",
    content: "Научимся взаимодействовать с ботом из Mini App",
    tasks: [
      {
        id: "6.1",
        title: "Отправка сообщений боту",
        description: "Научимся отправлять данные боту",
        code: `// В Mini App:
WebApp.sendData(JSON.stringify({
  action: 'order',
  items: ['item1', 'item2']
}));

// В боте:
bot.on('web_app_data', (ctx) => {
  const data = JSON.parse(ctx.webAppData.data);
  ctx.reply('Получены данные: ' + data.items.join(', '));
});`
      },
      {
        id: "6.2",
        title: "Команды бота",
        description: "Создадим команды для управления Mini App",
        code: `// Обработка команд
bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать!', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Открыть приложение', 
          web_app: { url: process.env.WEBAPP_URL } 
        }
      ]]
    }
  });
});`
      }
    ]
  },
  {
    id: 7,
    title: "Работа с платежами",
    content: "Научимся принимать платежи через Telegram",
    tasks: [
      {
        id: "7.1",
        title: "Настройка платежей",
        description: "Подключим платежную систему к боту",
        code: `// 1. Получите платежный токен у @BotFather
// /mybots > выберите бота > Payments

// 2. Настройте платежи в боте:
bot.command('buy', (ctx) => {
  ctx.replyWithInvoice({
    title: 'Товар',
    description: 'Описание товара',
    payload: 'unique_payload',
    provider_token: process.env.PAYMENT_TOKEN,
    currency: 'RUB',
    prices: [{ label: 'Товар', amount: 10000 }] // 100.00 RUB
  });
});`
      },
      {
        id: "7.2",
        title: "Обработка платежей",
        description: "Научимся обрабатывать платежи",
        code: `// Предварительная проверка платежа
bot.on('pre_checkout_query', (ctx) => {
  ctx.answerPreCheckoutQuery(true);
});

// Обработка успешного платежа
bot.on('successful_payment', (ctx) => {
  ctx.reply('Спасибо за покупку!');
});`
      }
    ]
  },
  {
    id: 8,
    title: "Продвинутые функции",
    content: "Изучим продвинутые возможности Mini Apps",
    tasks: [
      {
        id: "8.1",
        title: "Работа с файлами",
        description: "Научимся работать с файлами в Mini Apps",
        code: `// Открытие файла
WebApp.showPopup({
  title: 'Выберите файл',
  message: 'Поддерживаются изображения и документы',
  buttons: [
    {id: 'choose', type: 'default', text: 'Выбрать файл'},
    {id: 'cancel', type: 'cancel'},
  ]
});`
      },
      {
        id: "8.2",
        title: "Хранение данных",
        description: "Изучим способы хранения данных",
        code: `// Cloud Storage
await WebApp.CloudStorage.setItem('key', 'value');
const value = await WebApp.CloudStorage.getItem('key');

// Local Storage
localStorage.setItem('key', 'value');
const localValue = localStorage.getItem('key');`
      }
    ]
  },
  {
    id: 9,
    title: "Оптимизация и безопасность",
    content: "Научимся оптимизировать и защищать наше приложение",
    tasks: [
      {
        id: "9.1",
        title: "Оптимизация производительности",
        description: "Изучим способы оптимизации Mini App",
        code: `// 1. Используйте lazy loading
const HeavyComponent = React.lazy(() => 
  import('./HeavyComponent'));

// 2. Оптимизируйте изображения
<img 
  loading="lazy"
  srcSet="img-small.jpg 300w,
          img-large.jpg 600w"
  sizes="(max-width: 300px) 300px,
         600px"
  src="img-large.jpg"
  alt="Оптимизированное изображение"
/>`
      },
      {
        id: "9.2",
        title: "Безопасность",
        description: "Изучим основы безопасности",
        code: `// 1. Проверка данных
function validateInitData(initData) {
  // Проверка подписи
  const data = parseInitData(initData);
  if (!data.auth_date || 
      Date.now() / 1000 - data.auth_date > 86400) {
    throw new Error('Data expired');
  }
  return data;
}

// 2. Защита от XSS
const userInput = WebApp.initDataUnsafe?.user?.first_name;
const safeInput = escapeHtml(userInput);`
      }
    ]
  },
  {
    id: 10,
    title: "Публикация и монетизация",
    content: "Научимся публиковать и монетизировать Mini Apps",
    tasks: [
      {
        id: "10.1",
        title: "Подготовка к публикации",
        description: "Изучим процесс публикации Mini App",
        code: `// 1. Оптимизируйте сборку
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  }
});

// 2. Настройте CI/CD
name: Deploy Mini App
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run build`
      },
      {
        id: "10.2",
        title: "Монетизация",
        description: "Изучим способы монетизации Mini App",
        code: `// 1. Платные функции
function checkPremium(userId) {
  return isPremiumUser(userId);
}

// 2. Подписка
bot.command('subscribe', (ctx) => {
  ctx.replyWithInvoice({
    title: 'Премиум подписка',
    description: 'Доступ ко всем функциям',
    payload: 'premium_subscription',
    provider_token: process.env.PAYMENT_TOKEN,
    currency: 'RUB',
    prices: [
      { label: 'Месяц премиума', amount: 29900 }
    ]
  });
});`
      }
    ]
  }
];
