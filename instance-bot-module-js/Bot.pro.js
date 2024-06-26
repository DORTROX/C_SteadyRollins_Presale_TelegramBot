import { bot, initializeBot } from "./Main/Bot.launcher.js";
import { Markup } from "telegraf";
import yargs from "yargs";

const { argv } = yargs(process.argv.slice(2));
const { token } = argv;
import { stage } from "./Stage/StageManager.js";
import { find_bot } from "./lib/prisma.js";
import HearEvenHandlers from "./Main/Bot.hears.js";

initializeBot(token);
bot.use(stage.middleware());

bot.start(async (ctx) => {
  const d = await bot.telegram.getMe();
  const x = await find_bot(d.id.toString());
  return ctx.reply(
    x.WelcomeMessage,
    Markup.keyboard([
      ["⟩ Admin Panel", "⟩ Submit Details"], // Row1 with 2 buttons
    ])
      .oneTime()
      .resize()
  );
});

HearEvenHandlers(bot);

// bot.start(async (ctx) => {
//   const d = await bot.telegram.getMe();
//   const x = await find_bot(d.id.toString());
//   return (
//     ctx.reply(x.WelcomeMessage),
//     Markup.keyboard([
//       ["⟩ Admin Panel", "⟩ Submit Details"], // Row1 with 2 buttons
//     ])
//       .oneTime()
//       .resize()
//   );
// });

// bot.on("message", async (ctx) => {
//   const MenuUI = await WelcomeBuilder(ctx);
//   MenuUI.replyToContext(ctx);
//   bot.use(MenuUI.middleware());
// });

// Start the bot with the provided token
