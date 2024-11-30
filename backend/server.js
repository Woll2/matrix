const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(cors());
app.use(express.json());

// Верификация данных от Telegram
app.post('/verify', (req, res) => {
  const { initData } = req.body;
  try {
    // Добавьте верификацию initData здесь
    // https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app
    res.json({ verified: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API для сохранения прогресса
app.post('/progress', (req, res) => {
  const { userId, lessonId, progress } = req.body;
  try {
    // Здесь будет логика сохранения прогресса
    res.json({ saved: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обработка команд бота
bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать в Matrix Learning!', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Открыть приложение', web_app: { url: process.env.WEBAPP_URL } }
      ]]
    }
  });
});

// Обработка платежей
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));
bot.on('successful_payment', async (ctx) => {
  const userId = ctx.from.id;
  // Здесь будет логика обработки успешного платежа
  await ctx.reply('Спасибо за покупку! Теперь у вас есть доступ ко всем урокам.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.launch();
