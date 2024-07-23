import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-ticket.ts
import { z } from "zod";
async function getTicket(app) {
  app.withTypeProvider().get("/raffles/:raffleId/tickets/:ticketNumber", {
    schema: {
      summary: "Obter um Bilhete",
      tags: ["Tickets"],
      params: z.object({
        raffleId: z.string().uuid(),
        ticketNumber: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          number: z.number(),
          name: z.string(),
          email: z.string().email().nullish(),
          celNumber: z.string().nullish(),
          paid: z.boolean().nullish(),
          raffle: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { raffleId, ticketNumber } = request.params;
    const ticket = await prisma.ticket.findUnique({
      where: {
        raffleId_number: {
          number: ticketNumber,
          raffleId
        }
      },
      select: {
        number: true,
        name: true,
        email: true,
        celNumber: true,
        paid: true,
        raffle: {
          select: {
            title: true
          }
        }
      }
    });
    if (ticket === null) {
      throw new BadRequest("Ticket n\xE3o existe.");
    }
    return reply.send({
      number: ticket.number,
      name: ticket.name,
      email: ticket.email,
      celNumber: ticket.celNumber,
      paid: ticket.paid,
      raffle: ticket.raffle.title
    });
  });
}

export {
  getTicket
};
