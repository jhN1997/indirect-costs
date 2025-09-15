import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { GET_PLANTS_WITH_OPERATIONS_AND_COSTS } from "./graphql/queries";
import Sidebar from "./layout/Sidebar";
import CostosIndirectosPage from "./pages/CostosIndirectosPage";
import type {
  GetPlantsWithOperationsAndCostsResponse,
  OperationModel,
  Plant,
  PlantModel,
} from "./types/graphql";

function App() {
  const { loading, data, refetch } =
    useQuery<GetPlantsWithOperationsAndCostsResponse>(
      GET_PLANTS_WITH_OPERATIONS_AND_COSTS
    );
  const [plantsModel, setPlantsModel] = useState<PlantModel[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantModel | null>(null);

  const formatToPlantsModel = (plants: Plant[]): PlantModel[] => {
    return plants.map((plant) => ({
      id: plant.id,
      name: plant.name,
      code: plant.code,
      operations: plant.operations.map(
        (op) => ({ ...op, ...op.cost } as OperationModel)
      ),
    }));
  };

  const handleUpdateSuccess = async () => {
    const { data: newData } = await refetch();
    if (newData?.allPlantsWithOperationsAndCosts) {
      const formatted = getFormatData(newData);
      setPlantsModel(formatted);
      const updatedPlant = formatted.find((p) => p.id === selectedPlant?.id);
      if (updatedPlant) setSelectedPlant(updatedPlant);
    }
  };

  useEffect(() => {
    if (data?.allPlantsWithOperationsAndCosts) {
      const formatted = getFormatData(data);
      setPlantsModel(formatted);
      setSelectedPlant(formatted[0]);
      console.log("Datos formateados:", formatted[0]);
    }
  }, [data]);

  const getFormatData = (
    data: GetPlantsWithOperationsAndCostsResponse
  ): PlantModel[] => {
    return formatToPlantsModel(data.allPlantsWithOperationsAndCosts);
  };

  const handleChangePlant = (plantModel: PlantModel) => {
    setSelectedPlant(plantModel);
  };

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (!data) return <p className="text-red-500">No hay datos disponibles</p>;

  return (
    <>
      <div className="flex h-screen">
        {plantsModel && selectedPlant && (
          <>
            <Sidebar
              plants={plantsModel}
              selectedPlant={selectedPlant}
              setSelectedPlant={handleChangePlant}
            />
            <main className="flex-1 bg-gray-100 p-6 overflow-auto">
              <CostosIndirectosPage
                operationModel={selectedPlant.operations!}
                plantId={selectedPlant.id}
                onUpdateSuccess={handleUpdateSuccess}
              ></CostosIndirectosPage>
            </main>
          </>
        )}
      </div>
    </>
  );
}

export default App;
