import { Telegraf } from 'telegraf';
import { getLlmResponse } from '../services/llmService.js';
import {companyName} from "../../constants.js";


export const launchTelegramBot = () => {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  bot.start((ctx) => ctx.reply(`Welcome to ${companyName}'s Demo bot`));
  bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to Innovatech.', {
    })
  })

  bot.on('text', async (ctx) => {
    const incomingText = ctx.message.text;
    console.log(incomingText);
    const responseText = await getLlmResponse(incomingText);
    ctx.reply(responseText);
  });

  bot.launch();
}
