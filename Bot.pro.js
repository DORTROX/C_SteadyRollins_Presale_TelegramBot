import { SceneLauncer } from "./module-js/Main/Bot.command.js";
import { bot } from "./module-js/Main/Bot.launcher.js";

import { stage } from "./module-js/Stage/StageManager.js";
import { create_user } from "./module-js/lib/prisma.js";
import { MenuBuilder } from "./module-js/Menu/Bot.menu.js";

bot.use(stage.middleware());

bot.use(async (ctx, next) => {
  next();
  ctx.session.count = ctx.session.count + 1 || 0;
});

bot.use(async (ctx, next) => {
  if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
    console.log("another callbackQuery happened", ctx.callbackQuery.data.length, ctx.callbackQuery.data);
  }

  return next();
});

bot.command("manage", async (ctx) => {
  const MenuUI = await MenuBuilder(ctx);
  MenuUI.replyToContext(ctx);
  bot.use(MenuUI.middleware());
});
// bot.use(ExpmenuMiddleware.middleware());

bot.start((ctx) => {
  const referralId = ctx.payload;
  create_user(ctx.from.id.toString(), ctx.from?.username);
  if (referralId) {
    return ctx.reply(`Referral added for : ${referralId}`);
  }
  ctx.reply("Welcome to the Presale");
});

//Scene Launcher
bot.command("create", (ctx) => SceneLauncer(ctx, "TokenAuth"));

bot.on("message", (ctx) => {
  ctx.session.count = ctx.session.count || 0;
  ctx.reply(`Session storage ${ctx.session.count}`);
});

bot.launch();
