import { session } from "telegraf/session";
import { configDotenv } from "dotenv";
import { Telegraf } from "telegraf";
import { find_bot } from "../lib/prisma.js";

configDotenv();
let bot;
let botDetails;

const initializeBot = async (token) => {
  bot = new Telegraf(token);
  bot.use(
    session({
      getSessionKey: (ctx) => {
        if (ctx && ctx.from && ctx.from.id) {
          return ctx.from.id;
        }

        return 0;
      },
    })
  );
  const BotInfo = await bot.telegram.getMe();

  find_bot(BotInfo.id.toString()).then((x) => {{
    botDetails = x;
    console.log("Bot is loaded")
  }})

  bot.launch();

  
  // Start the bot with the provided token
};

export { bot, initializeBot, botDetails };
