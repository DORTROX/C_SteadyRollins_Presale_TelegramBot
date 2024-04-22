import { Scenes } from "telegraf";
import { TokenAuthenticationScene } from "./Scenes/Bot.scenes.js";

export const stage = new Scenes.Stage([TokenAuthenticationScene], {
    ttl: 10
})