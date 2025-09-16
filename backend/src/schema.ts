import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Plant {
    id: ID!
    name: String!
    code: String!
    address: String!
    operations: [Operation!]!
  }

  type Operation {
    id: ID!
    name: String!
    plant: Plant!
    cost: CostIndirect
  }

  type CostIndirect {
    id: ID!
    KG_300: Float
    KG_500: Float
    TN_1: Float
    TN_3: Float
    TN_5: Float
    TN_10: Float
    TN_20: Float
    TN_30: Float
    operation: Operation
  }

  input CostIndirectInput {
    KG_300: Float
    KG_500: Float
    TN_1: Float
    TN_3: Float
    TN_5: Float
    TN_10: Float
    TN_20: Float
    TN_30: Float
  }

  type Query {
    allPlantsWithOperationsAndCosts: [Plant!]!
  }

  input UpsertOperationInput {
    id: ID
    name: String!
    cost: CostIndirectInput
  }

  type Mutation {
    upsertOperationsByPlant(
      plantId: Int!
      inputs: [UpsertOperationInput!]!
    ): [Operation!]!
  }
`;
