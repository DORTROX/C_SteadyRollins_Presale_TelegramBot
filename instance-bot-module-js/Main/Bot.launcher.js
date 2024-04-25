import { session } from "telegraf/session";
import { configDotenv } from "dotenv";
import { Telegraf } from "telegraf";

configDotenv();
let bot;

const initializeBot = (token) => {
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

  bot.launch();

  
  // Start the bot with the provided token
};

export { bot, initializeBot };
