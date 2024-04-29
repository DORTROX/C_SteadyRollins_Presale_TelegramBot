import { PresaleBuilder, SuccessBuilder, WelcomeBuilder } from "../Menu/Bot.menu.js";
import { SceneLauncer } from "./Bot.commands.js";
import { Markup } from "telegraf";
import { botDetails } from "./Bot.launcher.js";

export default function HearEvenHandlers(bot) {
  bot.hears("⟩ Admin Panel", async (ctx) => {
    if (botDetails.user_Id != ctx.from.id) return ctx.reply("You are not an admin");
    return await ctx.reply(
      "What do you want to modify?",
      Markup.keyboard([
        ["⟩ AirDrop Tasks", "⟩ Welcome Message"],
        ["⟩ Create Presale", "⟩ Create Airdrop"],
        ["⟩ Modify Presale"],
        ["⟩ Account Button", "⟩ Success Message"], // Row2 with 2 buttons
        ["⟩ Promote Airdrop", "⟩ Leaderboard Button", "⟩ Balance Settings"], // Row3 with 3 buttons
      ])
        .oneTime()
        .resize()
    );
  });

  bot.hears("⟩ Modify Presale", async (ctx) => {
    if (botDetails.user_Id != ctx.from.id) return ctx.reply("You are not an admin");
    if (botDetails.presale == null) return ctx.reply("No Presale to modify!");

    // const MenuUI = SceneLauncer(ctx, "Presale");
    // MenuUI.replyToContext(ctx);
    // bot.use(MenuUI.middleware());
  });

  bot.hears("⟩ Create Presale", async (ctx) => {
    if (botDetails.presale != null) return ctx.reply("Cannot create multiple Presale! ");
    if (botDetails.user_Id != ctx.from.id) return ctx.reply("You are not an admin");
    const menuUI = await PresaleBuilder(ctx);
    menuUI.replyToContext(ctx);
    bot.use(menuUI.middleware());
  });

  bot.hears("⟩ Welcome Message", async (ctx) => {
    if (botDetails.user_Id != ctx.from.id) return ctx.reply("You are not an admin");

    const MenuUI = await WelcomeBuilder(ctx);
    MenuUI.replyToContext(ctx);
    bot.use(MenuUI.middleware());
  });

  bot.hears("⟩ Success Message", async (ctx) => {
    if (botDetails.user_Id != ctx.from.id) return ctx.reply("You are not an admin");

    const MenuUI = await SuccessBuilder(ctx);
    MenuUI.replyToContext(ctx);
    bot.use(MenuUI.middleware());
  });
}
