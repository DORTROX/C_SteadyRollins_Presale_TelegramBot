import { bot } from "./modules/Main/Bot.launcher";
import { stage } from "./modules/Stage/StageManager";
import { SceneLauncher } from "./modules/Main/Bot.commands";
import { create_user } from "./modules/lib/prisma";

bot.use(stage.middleware());

bot.start((ctx) => {
  const referralId = ctx.payload;
  create_user(ctx.from.id.toString(), ctx.from?.username);
  if (referralId) {
    return ctx.reply(`Referral added for : ${referralId}`);
  }
  ctx.reply("Welcome to the Presale");
});

bot.command("token", (ctx) => SceneLauncher(ctx, "TokenAuth"));
bot.on("message", (ctx) => {
  // ctx.reply(`Session storage ${ctx.props.count}`)
});

bot.launch();
