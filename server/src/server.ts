import express from 'express';
import cors from 'cors';
import { Prisma, PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: { _count: { select: { ads: true } } },
  });
  return res.json(games);
});

app.get('/games/:id/ads', async (req, res) => {
  const { id: gameId } = req.params;

  const ads = await prisma.ad.findMany({
    where: { gameId: Number(gameId) },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return res.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    }),
  );
});

app.get('/ads/:id/discord', async (req, res) => {
  const { id } = req.params;

  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: { discord: true },
    where: { id: Number(id) },
  });

  return res.json({ discord });
});

app.post('/games/:id/ads', async ({ body, params }, res) => {
  const data: Prisma.AdCreateInput = {
    ...body,
    gameId: Number(params.id),
    weekDays: body.weekDays.join(','),
    hourStart: convertHourStringToMinutes(body.hourStart),
    hourEnd: convertHourStringToMinutes(body.hourEnd),
  };

  const ads = await prisma.ad.create({ data });

  return res.json(ads);
});

app.listen(3333);
