import { Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { create_bot } from "../../../module-js/lib/prisma.js";

export const TokenAuthenticationScene = new Scenes.BaseScene("TokenAuth");
TokenAuthenticationScene.enter((ctx) => ctx.reply("Drop your token below for the new bot"));
TokenAuthenticationScene.leave(async (ctx) => {
  ctx.reply("Token Accepted");
  const resp = await create_bot(ctx, ctx.session.bot);
  if (resp)
    return ctx.reply(
      `✔️ Done! Your airdrop bot is ready. You will find it at:\nhttps://t.me/${ctx.session.bot.username}\nYou can now edit  welcome message, add tasks and more to your airdrop. For that, start your bot and enter the admin panel`
    );
});
TokenAuthenticationScene.on(message("text"), async (ctx) => {
  fetch(`https://api.telegram.org/bot${ctx.message.text}/getMe`, {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      data.result.token = ctx.message.text;
      ctx.session.bot = data.result;
      return ctx.scene.leave();
    }
    ctx.reply("Invalid Token. Try again");
  });
});
