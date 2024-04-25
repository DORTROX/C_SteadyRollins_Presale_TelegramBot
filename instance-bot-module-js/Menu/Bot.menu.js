import { MenuMiddleware, MenuTemplate } from "telegraf-inline-menu";
import { find_bot } from "../lib/prisma.js";
import { bot } from "../Main/Bot.launcher.js";
import { SceneLauncer } from "../Main/Bot.commands.js";

export const WelcomeBuilderUi = async (bot) => {
  const welcome = new MenuTemplate(() => `${bot.WelcomeMessage}`);
  welcome.interact("Edit Welcome Message", "Edit Welcome Message", {
    do: async (ctx) => {
      SceneLauncer(ctx, "WelcomeMessage");

      await ctx.deleteMessage();

      return false;
    },
  });
  return welcome;
};

export const SuccessBuilderUi = async (bot) => {
  const Success = new MenuTemplate(() => `${bot.SuccessMessage}`);
  Success.interact("Edit Success Message", "Edit Success Message", {
    do: async (ctx) => {
      SceneLauncer(ctx, "SuccessMessage");

      await ctx.deleteMessage();

      return false;
    },
  });
  return Success;
};

export const WelcomeBuilder = async (ctx) => {
  const x = await bot.telegram.getMe();
  const bot_data = await find_bot(x.id.toString());
  const menu = await WelcomeBuilderUi(bot_data);
  const menuUi = new MenuMiddleware("/", menu);
  console.log(menuUi.tree());
  return menuUi;
};

export const SuccessBuilder = async (ctx) => {
  const x = await bot.telegram.getMe();
  const bot_data = await find_bot(x.id.toString());
  const menu = await SuccessBuilderUi(bot_data);
  const menuUi = new MenuMiddleware("/", menu);
  console.log(menuUi.tree());
  return menuUi;
};
