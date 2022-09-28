import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.GameCreateInput[] = [
  {
    title: 'League of Legends',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg',
  },
  {
    title: 'Grand Theft Auto V',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg',
  },
  {
    title: 'Counter Strike: GO',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg',
  },
  {
    title: 'Fortnite',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg',
  },
  {
    title: 'Lost Ark',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/490100-285x380.jpg',
  },
  {
    title: 'Apex Legends',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  userData.forEach(async u => {
    const game = await prisma.game.create({
      data: u,
    });
    console.log(`Created user with id: ${game.id}`);
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
