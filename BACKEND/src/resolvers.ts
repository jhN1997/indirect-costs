import { PrismaClient, Operation as PrismaOperation } from "@prisma/client";

const prisma = new PrismaClient();

type CostIndirectInput = {
  KG_300?: number;
  KG_500?: number;
  TN_1?: number;
  TN_3?: number;
  TN_5?: number;
  TN_10?: number;
  TN_20?: number;
  TN_30?: number;
};

type UpsertOperationInput = {
  id?: string | number; // Puede venir como string desde GraphQL
  name: string;
  cost?: CostIndirectInput;
};

export const resolvers = {
  Query: {
    // Listar todas las plantas con operaciones y costos
    allPlantsWithOperationsAndCosts: async () => {
      return await prisma.plant.findMany({
        include: {
          operations: {
            include: {
              cost: true,
            },
          },
        },
      });
    },
  },

  Mutation: {
    // Crear/editar MULTIPLES operaciones en una misma planta
    upsertOperationsByPlant: async (
      _: unknown,
      args: { plantId: number; inputs: UpsertOperationInput[] }
    ): Promise<PrismaOperation[]> => {
      const { plantId, inputs } = args;
      const results: PrismaOperation[] = [];

      for (const input of inputs) {
        const { id, name, cost } = input;
        const parsedId = typeof id === "string" ? parseInt(id, 10) : id;

        if (parsedId) {
          // Update
          const updated = await prisma.operation.update({
            where: { id: parsedId },
            data: {
              name,
              plant: { connect: { id: plantId } },
              cost: cost
                ? {
                    upsert: {
                      update: { ...cost },
                      create: { ...cost },
                    },
                  }
                : undefined,
            },
            include: { cost: true, plant: true },
          });
          results.push(updated);
        } else {
          // Create
          const created = await prisma.operation.create({
            data: {
              name,
              plant: { connect: { id: plantId } },
              cost: cost ? { create: { ...cost } } : undefined,
            },
            include: { cost: true, plant: true },
          });
          results.push(created);
        }
      }

      return results;
    },
  },
};
