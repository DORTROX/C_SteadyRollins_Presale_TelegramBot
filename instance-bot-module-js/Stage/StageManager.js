import { Scenes } from "telegraf";
import { WelcomeMessageScene, SuccessMessageScene,PresaleToken, PresaleOwnerKey, PresaleStageDate, PresaleStagePrice, PresaleStageTokens } from "./Scenes/Bot.scenes.js";

export const stage = new Scenes.Stage([WelcomeMessageScene, SuccessMessageScene,PresaleToken, PresaleOwnerKey, PresaleStageDate, PresaleStageDate, PresaleStagePrice, PresaleStageTokens], {
  ttl: 50,
});
