import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-raffle.ts
import { z } from "zod";
var infoTickets = z.object({
  number: z.number(),
  name: z.string(),
  email: z.string().nullish(),
  celNumber: z.string().nullish(),
  paid: z.boolean().nullish()
});
async function getRaffle(app) {
  app.withTypeProvider().get("/raffles/:raffleId", {
    schema: {
      summary: "Obter uma rifa",
      tags: ["Raffles"],
      params: z.object({
        raffleId: z.string().uuid()
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          title: z.string().min(4),
          email: z.string().email(),
          passaword: z.string(),
          maximumNumbers: z.number(),
          drawDate: z.string().nullish(),
          prizePool: z.string().nullish(),
          tickets: z.array(infoTickets)
        })
      }
    }
  }, async (request, reply) => {
    const { raffleId } = request.params;
    const raffle = await prisma.raffle.findUnique({
      where: {
        id: raffleId
      },
      select: {
        id: true,
        title: true,
        email: true,
        password: true,
        maximumNumbers: true,
        drawDate: true,
        prizePool: true,
        tickets: {
          select: {
            number: true,
            name: true,
            email: true,
            celNumber: true,
            paid: true
          }
        }
      }
    });
    if (raffle === null) {
      throw new BadRequest("Rifa n\xE3o encontrada.");
    }
    return reply.send({
      id: raffle.id,
      title: raffle.title,
      email: raffle.email,
      passaword: raffle.password,
      maximumNumbers: raffle.maximumNumbers,
      drawDate: raffle.drawDate,
      prizePool: raffle.prizePool,
      tickets: raffle.tickets
    });
  });
}

export {
  getRaffle
};
