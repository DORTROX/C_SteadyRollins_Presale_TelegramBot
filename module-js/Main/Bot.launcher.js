import { session } from "telegraf/session";
import { configDotenv } from "dotenv";
import { Telegraf } from "telegraf";
configDotenv();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
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

export { bot };
