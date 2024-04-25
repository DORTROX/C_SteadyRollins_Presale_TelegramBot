import { Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { find_bot, update_bot } from "../../lib/prisma.js";
import { bot } from "../../Main/Bot.launcher.js";

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
  ctx.session.PrivateKey = "";
  ctx.session.TokenAmount = "";
  ctx.session.Presale_Token_Contract = "";
  ctx.reply("OK. Send me the new Presale Token.");
});
PresaleToken.leave(async (ctx) => {});
PresaleToken.on(message("text"), async (ctx) => {
  // const x = await bot.telegram.getMe();
  // const resp = await find_bot(x.id.toString());
  // console.log(resp);
  if (ctx.session.Presale_Token == "") {
    ctx.session.Presale_Token = ctx.message.text;
    ctx.reply("Alright, Provide your wallet private key which contains your custom token which has to be presaled");
    return (ctx.session.Presale_Token = ctx.message.text);
  } else if (ctx.session.PrivateKey == "") {
    ctx.session.PrivateKey = ctx.message.text;
    ctx.reply("Alright, Provide the amount of tokens you want to send");
    return (ctx.session.PrivateKey = ctx.message.text);
  }
  // ctx.session.Presale_Token = ctx.message.text;
});
