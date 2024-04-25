import { SuccessBuilder, WelcomeBuilder } from "../Menu/Bot.menu.js";
import { SceneLauncer } from "./Bot.commands.js";

export default function HearEvenHandlers(bot) {
  bot.hears("⟩ Admin Panel", async (ctx) => {
    return await ctx.reply(
      "What do you want to modify?",
      Markup.keyboard([
        ["⟩ AirDrop Tasks", "⟩ Welcome Message"],
        ["⟩ Create Presale", "⟩ Create Airdrop"],
        ["⟩ Account Button", "⟩ Success Message"], // Row2 with 2 buttons
        ["⟩ Promote Airdrop", "⟩ Leaderboard Button", "⟩ Balance Settings"], // Row3 with 3 buttons
      ])
        .oneTime()
        .resize()
    );
  });

  bot.hears("⟩ Create Presale", async (ctx) => {
    return await ctx.reply(
      "Presale Manager",
      Markup.keyboard([
        ["⟩ Add Presale Stage"]
      ])
        .oneTime()
        .resize()
    );
  });
  bot.hears("⟩ Welcome Message", async (ctx) => {
    const MenuUI = await WelcomeBuilder(ctx);
    MenuUI.replyToContext(ctx);
    bot.use(MenuUI.middleware());
  });

  bot.hears("⟩ Success Message", async (ctx) => {
    const MenuUI = await SuccessBuilder(ctx);
    MenuUI.replyToContext(ctx);
    bot.use(MenuUI.middleware());
  });
}
