/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client/react";
import { UPSERT_OPERATIONS_BY_PLANT } from "../graphql/mutations";

export function useUpsertOperations() {
  const [mutate, { loading, error, data }] = useMutation(
    UPSERT_OPERATIONS_BY_PLANT
  );

  const upsertOperations = async (plantId: number, inputs: any[]) => {
    try {
      const response = await mutate({
        variables: { plantId, inputs },
      });
      return (response.data as { upsertOperationsByPlant: any })
        .upsertOperationsByPlant;
    } catch (err) {
      console.error("Error en upsertOperationsByPlant:", err);
      throw err;
    }
  };

  return { upsertOperations, loading, error, data };
}
