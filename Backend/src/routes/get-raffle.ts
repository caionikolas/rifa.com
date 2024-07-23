import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

const infoTickets = z.object({
  number: z.number(),
  name: z.string(),
  email: z.string().nullish(),
  celNumber: z.string().nullish(),
  paid: z.boolean().nullish(),
})

export async function getRaffle (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/raffles/:raffleId', {
      schema: {
        summary: 'Obter uma rifa',
        tags: ['Raffles'],
        params: z.object({
          raffleId: z.string().uuid(),
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
        },
      }
    }, async (request, reply) => {
      const {raffleId} = request.params

      const raffle = await prisma.raffle.findUnique({
        where: {
          id: raffleId,
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
        },
      })

      if (raffle === null) {
        throw new BadRequest('Rifa não encontrada.')
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
     })
    })
}