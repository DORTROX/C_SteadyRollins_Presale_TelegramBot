import { Scenes } from "telegraf";
import { TokenAuthenticationScene } from "./Scenes/Bot.scenes";



export const stage = new Scenes.Stage<Scenes.SceneContext>([TokenAuthenticationScene], {
  ttl: 10,
});
