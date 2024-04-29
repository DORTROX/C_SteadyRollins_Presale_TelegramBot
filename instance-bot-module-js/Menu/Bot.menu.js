import { MenuMiddleware, MenuTemplate } from "telegraf-inline-menu";
import { find_bot } from "../lib/prisma.js";
import { SceneLauncer } from "../Main/Bot.commands.js";
import { bot, botDetails } from "../Main/Bot.launcher.js";

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

export const PresaleStageBuilderUi = async (ctx, bot) => {
  const PresaleStageData = {
    Date: ctx.session.PresaleStage_Date || null,
    Price: ctx.session.PresaleStage_Price || null,
    Tokens: ctx.session.PresaleStage_Tokens || null,
  }
  const PresaleStage = new MenuTemplate(() => `Create Presale Stage`);
  PresaleStage.interact(PresaleStageData.Date ? "✅ Add Date" : "Add Date", "Add Date", {
    do: async (ctx) => {
      SceneLauncer(ctx, "PresaleToken");

      await ctx.deleteMessage();

      return false;
    },
  });
  return PresaleStage;
}

export const PresaleBuilderUi = async (ctx, bot) => {
  const HideMenu = false;
  const PresaleData = {
    Presale_Token: ctx.session.Presale_Token || null,
  }
  const Presale = new MenuTemplate(() => `Create Presale`);
  Presale.interact(PresaleData.Presale_Token ? "✅ Add Presale Token" : "Add Presale Token", "Add Presale Token", {
    do: async (ctx) => {
      SceneLauncer(ctx, "PresaleToken");

      await ctx.deleteMessage();
      
      return false;
    },
    hide: () => HideMenu,
  });
  Presale.interact("Add Owner Private key", "Add Owner Private key", {
    do: async (ctx) => {
      SceneLauncer(ctx, "PresaleOwnerKey");

      await ctx.deleteMessage();

      return false;
    }
  } )
  Presale.interact("Add Presale Stage", "Add Presale Stage", {
    do: async (ctx) => {
      const menu = await PresaleStageBuilder(ctx);
      menu.replyToContext(ctx);
      bot.use(menu.middleware());
      return false;
    }
  } )
  return Presale;
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

export const PresaleBuilder = async (ctx) => {
  const menu = await PresaleBuilderUi(ctx,botDetails);
  const menuUi = new MenuMiddleware("/", menu);
  return menuUi;
};

export const PresaleStageBuilder = async (ctx) => {
  console.o
  const menu = await PresaleStageBuilderUi(ctx, bot);
  const menuUi = new MenuMiddleware("/", menu);
  console.log(menuUi.tree());
  return menuUi;
};