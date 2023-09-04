import { Telegraf } from 'telegraf';
import { getLlmResponse } from '../services/llmService.js';


export const launchTelegramBot = () => {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  bot.start((ctx) => ctx.reply(`Welcome to SkyTalk's Demo bot`));
  bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id,  'Hi there! I\'m your virtual assistant. Welcome to ArtiQ School', {
    })
  })

  bot.on('text', async (ctx) => {
    const incomingText = ctx.message.text;
    const responseText = await getLlmResponse(incomingText);
    ctx.reply(responseText);
  });

  bot.launch();
}
