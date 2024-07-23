import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-raffle.ts
import { z } from "zod";
async function createRaffle(app) {
  app.withTypeProvider().post("/raffles", {
    schema: {
      summary: "Cadastrar uma rifa",
      tags: ["Raffles"],
      body: z.object({
        title: z.string().min(4),
        email: z.string().email(),
        password: z.string(),
        maximumNumbers: z.number().positive().int(),
        drawDate: z.string().nullish(),
        prizePool: z.string().nullish()
      }),
      response: {
        201: z.object({
          raffleId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      email,
      password,
      maximumNumbers,
      drawDate,
      prizePool
    } = request.body;
    const raffle = await prisma.raffle.create({
      data: {
        title,
        email,
        password,
        maximumNumbers,
        drawDate,
        prizePool
      }
    });
    return reply.status(201).send({ raffleId: raffle.id });
  });
}

export {
  createRaffle
};
