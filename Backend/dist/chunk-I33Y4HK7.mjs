import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-raffles.ts
import { z } from "zod";
async function getRaffles(app) {
  app.withTypeProvider().get("/raffles", {
    schema: {
      summary: "Obter todas as rifas",
      tags: ["Raffles"],
      querystring: z.object({
        query: z.string().nullish(),
        pageIndex: z.string().nullish().default("0").transform(Number)
      }),
      response: {
        200: z.object({
          raffles: z.array(z.object({
            id: z.string().uuid(),
            title: z.string().min(4),
            email: z.string().email(),
            maximumNumbers: z.number(),
            drawDate: z.string().nullish(),
            prizePool: z.string().nullish(),
            quantTickets: z.number()
          }))
        })
      }
    }
  }, async (request, reply) => {
    const { pageIndex, query } = request.query;
    const raffles = await prisma.raffle.findMany({
      select: {
        id: true,
        title: true,
        email: true,
        maximumNumbers: true,
        drawDate: true,
        prizePool: true,
        _count: {
          select: {
            tickets: true
          }
        }
      },
      take: 10,
      skip: pageIndex * 10,
      where: query ? {
        title: {
          contains: query
        }
      } : {},
      orderBy: {
        title: "asc"
      }
    });
    return reply.send({
      raffles: raffles.map((raffle) => {
        return {
          id: raffle.id,
          title: raffle.title,
          email: raffle.email,
          maximumNumbers: raffle.maximumNumbers,
          drawData: raffle.drawDate,
          prizePool: raffle.prizePool,
          quantTickets: raffle._count.tickets
        };
      })
    });
  });
}

export {
  getRaffles
};