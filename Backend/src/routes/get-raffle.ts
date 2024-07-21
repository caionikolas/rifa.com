import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getRaffle (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/raffles/:raffleId', {
      schema: {
        params: z.object({
          raffleId: z.string().uuid(),
        }),
        response: {},
      }
    }, async (request, reply) => {
      const {raffleId} = request.params

      const raffle = await prisma.raffle.findUnique({
        where: {
          id: raffleId,
        },
        select: {
          title: true,
          prizePool: true,
          maximumNumbers: true,
          drawDate: true,
          tickets: {
            select: {
                number: true,
                name: true,
                email: true,
                celNumber: true,
                paid: true
            }
          }
        },
      })

      if (raffle === null) {
        throw new Error('Rifa não encontrada.')
      }

      return reply.send({ raffle: {
        title: raffle.title,
        prizePool: raffle.prizePool,
        maximumNumbers: raffle.maximumNumbers,
        drawDate: raffle.drawDate,
        tickets: raffle.tickets
      } })
    })
}