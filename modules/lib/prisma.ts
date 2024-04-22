import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create_user(user_Id: string, telegram_username: string | undefined) {
  const User = await find_user(user_Id);
  console.log("User", User);
  await prisma.user
    .create({
      data: {
        id: user_Id,
        Telegram_Username: "dortrox",
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
}

const find_user = async (user_Id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_Id,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
  }
};

const create_bot = async (bot_token: string, bot_Name: string, bot_description: string, user_Id: string) => {
  try {
    const bot = await prisma.bot.create({
      data: {
        bot_token: bot_token,
        bot_name: bot_Name,
        bot_description: bot_description,
        user_Id: user_Id,
      },
    });
    return bot;
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
  }
};

// async function create_bot() {

// }

export { create_user };
