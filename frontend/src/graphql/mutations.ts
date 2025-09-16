import { gql } from "@apollo/client";

export const UPSERT_OPERATIONS_BY_PLANT = gql`
  mutation UpsertOperationsByPlant(
    $plantId: Int!
    $inputs: [UpsertOperationInput!]!
  ) {
    upsertOperationsByPlant(plantId: $plantId, inputs: $inputs) {
      id
      name
      plant {
        id
        name
      }
      cost {
        KG_300
        KG_500
        TN_1
        TN_3
        TN_5
        TN_10
        TN_20
        TN_30
      }
    }
  }
`;
