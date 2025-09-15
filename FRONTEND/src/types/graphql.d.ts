export type CostIndirect = {
  id: ID!;
  KG_300: Float;
  KG_500: Float;
  TN_1: Float;
  TN_3: Float;
  TN_5: Float;
  TN_10: Float;
  TN_20: Float;
  TN_30: Float;
};

export type Operation = {
  id: string;
  name: string;
  cost: Cost | null;
};

export type Plant = {
  id: string;
  code: string;
  name: string;
  operations: Operation[];
};

export type GetPlantsWithOperationsAndCostsResponse = {
  allPlantsWithOperationsAndCosts: Plant[];
};

export interface OperationModel extends Operation, CostIndirect {
  accessorKey?: string;
  header?: string;
  id: string;
}

export interface PlantModel extends Plant {
  operations?: OperationModel[];
}
