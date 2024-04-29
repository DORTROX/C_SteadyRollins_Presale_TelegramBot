import { Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { update_bot } from "../../lib/prisma.js";
import { bot } from "../../Main/Bot.launcher.js";
import { PresaleBuilder, PresaleStageBuilder } from "../../Menu/Bot.menu.js";

export const WelcomeMessageScene = new Scenes.BaseScene("WelcomeMessage");
WelcomeMessageScene.enter((ctx) =>
  ctx.reply(
    "OK. Send me the new welcome message for your airdrop. Users will see this message after they start the bot or complete captcha."
  )
);
WelcomeMessageScene.leave(async (ctx) => {
  const x = await bot.telegram.getMe();
  const resp = await update_bot(x.id.toString(), ctx.session.welcome_message, "WelcomeMessage");
  if (resp) return ctx.reply(`✔️ Welcome message updated.`);
});
WelcomeMessageScene.on(message("text"), async (ctx) => {
  ctx.session.welcome_message = ctx.message.text;
  return ctx.scene.leave();
});

export const SuccessMessageScene = new Scenes.BaseScene("SuccessMessage");
SuccessMessageScene.enter((ctx) =>
  ctx.reply(
    "OK. Send me the new Success message for your airdrop. Users will see this message after they start the bot or complete captcha."
  )
);
SuccessMessageScene.leave(async (ctx) => {
  const x = await bot.telegram.getMe();
  const resp = await update_bot(x.id.toString(), ctx.session.Success_message, "SuccessMessage");
  if (resp) return ctx.reply(`✔️ Success message updated.`);
});
SuccessMessageScene.on(message("text"), async (ctx) => {
  ctx.session.Success_message = ctx.message.text;
  return ctx.scene.leave();
});


export const PresaleToken = new Scenes.BaseScene("PresaleToken");
PresaleToken.enter((ctx) => {
  ctx.session.Presale_Token = "";
  ctx.reply("OK. Send me the new Presale Token.");
});
PresaleToken.leave(async (ctx) => {
  ctx.reply(`✔️ Presale Token updated.`);
  const menuUI = await PresaleBuilder(ctx);
  menuUI.replyToContext(ctx)
  bot.use(menuUI.middleware());
});
PresaleToken.on(message("text"), async (ctx) => {
  console.log(ctx)
  ctx.session.Presale_Token = ctx.message.text;
  console.log(ctx.session.Presale_Token)
  return ctx.scene.leave();
});

export const PresaleOwnerKey = new Scenes.BaseScene("PresaleOwnerKey");
PresaleOwnerKey.enter((ctx) => {
  ctx.session.Presale_OwnerKey = "";
  ctx.reply("OK. Send me the new Presale Owner Private Key.");
});
PresaleOwnerKey.leave(async (ctx) => {
  ctx.reply(`✔️ Presale Owner Private Key updated.`);
  const menuUI = await PresaleBuilder(ctx);
  menuUI.replyToContext(ctx)
  bot.use(menuUI.middleware());
});
PresaleOwnerKey.on(message("text"), async (ctx) => {
  console.log(ctx)
  ctx.session.Presale_OwnerKey = ctx.message.text;
  console.log(ctx.session.Presale_OwnerKey)
  return ctx.scene.leave();
});

export const PresaleStageDate = new Scenes.BaseScene("PresaleStageDate");
PresaleStageDate.enter((ctx) => {
  ctx.session.PresaleStage_Date = "";
  ctx.reply("OK. Send me the new Presale Stage Date.");
});
PresaleStageDate.leave(async (ctx) => {
  ctx.reply(`✔️ Presale Stage Date updated.`);
  const menuUI = await PresaleStageBuilder(ctx);
  menuUI.replyToContext(ctx)
  bot.use(menuUI.middleware());
});
PresaleStageDate.on(message("text"), async (ctx) => {
  console.log(ctx)
  ctx.session.PresaleStage_Date = ctx.message.text;
  console.log(ctx.session.PresaleStage_Date)
  return ctx.scene.leave();
});

export const PresaleStagePrice = new Scenes.BaseScene("PresaleStagePrice");
PresaleStagePrice.enter((ctx) => {
  ctx.session.PresaleStage_Price = "";
  ctx.reply("OK. Send me the new Presale Stage Price.");
});
PresaleStagePrice.leave(async (ctx) => {
  ctx.reply(`✔️ Presale Stage Price updated.`);
  const menuUI = await PresaleStageBuilder(ctx);
  menuUI.replyToContext(ctx)
  bot.use(menuUI.middleware());
});
PresaleStagePrice.on(message("text"), async (ctx) => {
  console.log(ctx)
  ctx.session.PresaleStage_Price = ctx.message.text;
  console.log(ctx.session.PresaleStage_Price)
  return ctx.scene.leave();
});
export const PresaleStageTokens = new Scenes.BaseScene("PresaleStageTokens");
PresaleStageTokens.enter((ctx) => {
  ctx.session.PresaleStage_Tokens = "";
  ctx.reply("OK. Send me the new Presale Stage Tokens.");
});
PresaleStageTokens.leave(async (ctx) => {
  ctx.reply(`✔️ Presale Stage Tokens updated.`);
  const menuUI = await PresaleStageBuilder(ctx);
  menuUI.replyToContext(ctx)
  bot.use(menuUI.middleware());
});
PresaleStageTokens.on(message("text"), async (ctx) => {
  console.log(ctx)
  ctx.session.PresaleStage_Tokens = ctx.message.text;
  console.log(ctx.session.PresaleStage_Tokens)
  return ctx.scene.leave();
});