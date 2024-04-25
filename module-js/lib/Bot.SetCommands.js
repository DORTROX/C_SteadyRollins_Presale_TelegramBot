import { bot } from "../Main/Bot.launcher.js";

export const SlashCommand = () => {
  bot.telegram.setMyCommands([
    {
      command: "help",
      description: "Get answers to basic questions",
    },
    {
      command: "manage",
      description: "Manage your bots",
    },
    {
      command: "create",
      description: "Create a new bot",
    },
    {
      command: "account",
      description: "Manage your account",
    },
  ]);
};
