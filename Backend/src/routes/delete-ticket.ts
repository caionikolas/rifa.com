import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function delTicket(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/raffles/:raffleId/tickets/:ticketNumber', {
      schema: {
        summary: 'Deletar um Bilhete',
        tags: ['Tickets'],
        params: z.object({
          raffleId: z.string().uuid(),
          ticketNumber: z.coerce.number().int(),
        })
      }
    }, async (request, reply) => {
      const { raffleId, ticketNumber } = request.params

      const ticket = await prisma.ticket.findUnique({
        where: {
          raffleId_number: {
            number: ticketNumber,
            raffleId
          }
        }
      })

      if (ticket === null) {
        throw new BadRequest('Ticket não existe.')
      }

      await prisma.ticket.delete({
        where: {
          raffleId_number: {
            number: ticketNumber,
            raffleId
          }
        }
      })

      return reply.status(204);
    })
}