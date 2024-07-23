import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/take-ticket.ts
import { z } from "zod";
async function takeTicket(app) {
  app.withTypeProvider().post("/raffles/:raffleId/tickets", {
    schema: {
      summary: "Cadastrar um Bilhete",
      tags: ["Tickets"],
      body: z.object({
        number: z.number().int().min(1),
        name: z.string().min(4),
        email: z.string().email().nullish(),
        celNumber: z.string().nullish(),
        paid: z.boolean().nullish().default(false)
      }),
      params: z.object({
        raffleId: z.string().uuid()
      }),
      response: {
        201: z.object({
          ticketId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { raffleId } = request.params;
    const { number, name, email, celNumber, paid } = request.body;
    const [ticketFromNumber, raffle] = await Promise.all([
      await prisma.ticket.findUnique({
        where: {
          raffleId_number: {
            number,
            raffleId
          }
        }
      }),
      await prisma.raffle.findUnique({
        where: {
          id: raffleId
        }
      })
    ]);
    if (ticketFromNumber !== null) {
      throw new BadRequest("O n\xFAmero j\xE1 est\xE1 cadastrado na rifa!");
    }
    if (raffle?.maximumNumbers && number > raffle.maximumNumbers) {
      throw new BadRequest("O n\xFAmero do bilhete escolhido n\xE3o \xE9 valido!");
    }
    const ticket = await prisma.ticket.create({
      data: {
        number,
        name,
        email,
        celNumber,
        paid,
        raffleId
      }
    });
    return reply.status(201).send({ ticketId: ticket.id });
  });
}

export {
  takeTicket
};
