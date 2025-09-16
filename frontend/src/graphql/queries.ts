import { gql } from "@apollo/client";

export const GET_PLANTS_WITH_OPERATIONS_AND_COSTS = gql`
  query {
    allPlantsWithOperationsAndCosts {
      id
      name
      code
      operations {
        id
        name
        cost {
          id
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
  }
`;
