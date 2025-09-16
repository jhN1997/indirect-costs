import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { esES } from "@mui/material/locale";
import OperationsTable from "../components/OperationsTable";
import type { OperationModel } from "../types/graphql";

type Props = {
  operationModel: OperationModel[];
  plantId: string;
  onUpdateSuccess: () => void;
};

const CostosIndirectosPage = ({
  operationModel,
  plantId,
  onUpdateSuccess,
}: Props) => {
  const theme = useTheme(); //replace with your theme/createTheme

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">
        Costos Indirectos{" "}
        <span className="text-xl text-gray-600">
          (Configuración de Cotización)
        </span>
      </h1>

      <ThemeProvider theme={createTheme(theme, esES)}>
        <OperationsTable
          operationModel={operationModel}
          plantId={plantId}
          onUpdateSuccess={onUpdateSuccess}
        />
      </ThemeProvider>
    </div>
  );
};

export default CostosIndirectosPage;
