import { Scenes } from "telegraf";
import { message } from "telegraf/filters";

export const TokenAuthenticationScene = new Scenes.BaseScene<Scenes.SceneContext>("TokenAuth");
TokenAuthenticationScene.enter((ctx) => ctx.reply("Drop your token below for the new bot"));
TokenAuthenticationScene.leave((ctx) => ctx.reply("Token Accepted"));
TokenAuthenticationScene.on(message("text"), async (ctx) => {
  fetch(`https://api.telegram.org/bot${ctx.message.text}/getMe`, {
    method: "GET",
  }).then((res) => {
    if (res.status === 200) return ctx.scene.leave();
    ctx.reply("Invalid Token. Try again");
  });
});