import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function delRaffle(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/raffles/:raffleId', {
      schema: {
        summary: 'Deletar uma rifa',
        tags: ['Raffles'],
        params: z.object({
          raffleId: z.string().uuid()
        })
      }
    } , async (request, reply) => {
      const { raffleId } = request.params

      const verificaId = await prisma.raffle.findUnique({
        where: {
          id: raffleId,
        }
      })

      if(verificaId === null) {
        throw new BadRequest('Rifa não encotrada.')
      }

      await prisma.raffle.delete({
        where: {
          id: raffleId,
        }
      })
      
      return reply.status(204)
    })
}