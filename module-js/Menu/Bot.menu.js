import { MenuMiddleware, MenuTemplate, createBackMainMenuButtons } from "telegraf-inline-menu";
import { find_user_bots } from "../../module-js/lib/prisma.js";

let mainMenuToggle = true;
let deleteMenu = true;

const ManagerBuilderUi = async (bot) => {
  const ManagerMenu = new MenuTemplate(`@${bot.bot_name}\n\nWhat do you want to do with this airdrop?`);
  const EditMenu = new MenuTemplate(
    `To change your bot's profile picture, description and about section:\n⟩ Go to @BotFather\n⟩ Send command /mybots\n⟩ Select your bot you want to edit\n⟩ Click on the "Edit Bot" button\n\nTo change the welcome message (message that appears after users start the bot or complete captcha) and success message (message that appears after user finishes all tasks in the airdrop) and to add tasks in your airdrop bot:\n⟩ Start your bot @${bot.bot_name} and click on "🔐 Admin Panel" button`
  );
  EditMenu.manualRow(createBackMainMenuButtons());

  const DeleteMenu = new MenuTemplate(`Are you sure you want to delete ${bot.bot_name} airdrop?`);

  DeleteMenu.interact("Yes", `delete_${bot.bot_name}`, {
    do: async (ctx) => {
      await ctx.deleteMessage();

      ctx.reply("Deleted...");
      return false;
    },
  }),
    DeleteMenu.interact("No", `cancel_${bot.bot_name}`, {
      joinLastRow: true,
      do: async (ctx) => {
        await ctx.deleteMessage();

        ctx.reply("Cancelling delete...");
        return false;
      },
    });
  ManagerMenu.submenu("Edit Airdrop", `edit_${bot.bot_name.slice(0, 3)}`, EditMenu);
  ManagerMenu.submenu("Delete Airdrop", `Delete_${bot.bot_name.slice(0, 3)}`, DeleteMenu, {
    joinLastRow: true,
  });

  ManagerMenu.manualRow(createBackMainMenuButtons());

  return ManagerMenu;
};

export const MenuBuilderUI = async (ctx) => {
  const AirdropList = new MenuTemplate(() => "Please choose an Airdrop");
  const userBots = await find_user_bots(ctx.from.id.toString());
  userBots.Bots.map(async (bot) => {
    const manager = await ManagerBuilderUi(bot, ctx);
    AirdropList.submenu(bot.bot_name, `manager-${bot.bot_name}`, manager, {
      hide: () => !mainMenuToggle,
    });
    // AirdropList.interact(bot.bot_name, bot.id, {
    //   hide: () => !mainMenuToggle,
    //   do: async (ctx) => {
    //     ctx.session.s_bot_id = bot.id;
    //     mainMenuToggle = false;
    //     // Do not update the menu afterwards
    //     return true;
    //   },
    // });
  });

  // Add back and main menu buttons if needed
  AirdropList.manualRow(createBackMainMenuButtons());

  return AirdropList;
};

export const MenuBuilder = async (ctx) => {
  const menuMiddleware = await MenuBuilderUI(ctx);
  const menuUi = new MenuMiddleware("/", menuMiddleware);
  console.log(menuUi.tree());
  return menuUi;
};
