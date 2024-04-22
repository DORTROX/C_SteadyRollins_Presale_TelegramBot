import { Telegraf, Scenes, Context } from "telegraf";
import { session } from "telegraf/session";
import { configDotenv } from "dotenv";
configDotenv();

interface UserState extends Scenes.SceneContext, Context {}

const bot = new Telegraf<UserState>(process.env.TELEGRAM_BOT_TOKEN as string);
bot.use(session());

export { bot };
