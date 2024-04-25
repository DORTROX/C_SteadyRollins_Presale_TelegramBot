import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const find_bot = async (bot_id) => {
  try {
    const user = await prisma.bot.findUnique({
      where: {
        bot_id: bot_id,
      },
      include: {
        Presale: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
  }
};

const find_bot_by_presale = async (presale_id) => {
  try {
    const user = await prisma.bot.findUnique({
      where: {
        presale_id: presale_id,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
  }
}

const update_bot = async (bot_id, value, key) => {
  try {
    const user = await prisma.bot.findUnique({
      where: {
        bot_id: bot_id,
      },
    });
    if (user) {
      await prisma.bot.update({
        where: {
          bot_id: bot_id,
        },
        data: {
          [key]: value,
        },
      });
      return true;
    }
    return false;
  } catch (e) {
    await prisma.$disconnect();

    return false;
  }
};

export { find_bot, update_bot };
