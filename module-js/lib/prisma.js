import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create_user(user_Id, telegram_username) {
  const User = await find_user(user_Id);
  console.log("User", User);
  if (User) return;
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

const find_user = async (user_Id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_Id,
      },
    });
    return user;
  } catch (e) {
    await prisma.$disconnect();
  }
};

const create_bot = async (ctx, bot) => {
  try {
    await prisma.bot.create({
      data: {
        bot_token: bot.token,
        bot_name: bot.username,
        user_Id: ctx.from.id.toString(),
      },
    });
    prisma.$disconnect();
    return true;
  } catch (e) {
    await prisma.$disconnect();
    return false;
  }
};

const find_user_bots = async (user_Id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_Id,
      },
      include: {
        PresaleBots: true,
      },
    });
    console.log("user", user);
    return user;
  } catch (e) {
    await prisma.$disconnect();
  }
};

// async function create_bot() {

// }

export { create_user, create_bot,find_user_bots };
