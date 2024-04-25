import { Scenes } from "telegraf";
import { WelcomeMessageScene, SuccessMessageScene,PresaleToken } from "./Scenes/Bot.scenes.js";

export const stage = new Scenes.Stage([WelcomeMessageScene, SuccessMessageScene,PresaleToken], {
  ttl: 10,
});
