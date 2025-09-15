/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Typography } from "@mui/material";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useCallback, useMemo, useState } from "react";
import { useUpsertOperations } from "../hooks/useUpsertOperation";
import type { OperationModel } from "../types/graphql";
import { parseNumericObjectValues } from "../utils/utils";

type Props = {
  operationModel: OperationModel[];
  plantId: string;
  onUpdateSuccess: () => void;
};

const OperationsTable = ({
  operationModel,
  plantId,
  onUpdateSuccess,
}: Props) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [editedOperations, setEditedOperations] = useState<
    Record<string, OperationModel>
  >({});

  const { upsertOperations, loading, error } = useUpsertOperations();

  const editableFields: {
    key: keyof OperationModel;
    label: string;
    pinning?: string;
  }[] = [
    { key: "name", label: "Operación" },
    { key: "KG_300", label: "300 kg" },
    { key: "KG_500", label: "500 kg" },
    { key: "TN_1", label: "1 T" },
    { key: "TN_3", label: "3 T" },
    { key: "TN_5", label: "5 T" },
    { key: "TN_10", label: "10 T" },
    { key: "TN_20", label: "20 T" },
    { key: "TN_30", label: "30 T" },
  ];

  const getEditProps = useCallback(
    (_field: keyof OperationModel) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ cell, row }: any) => ({
        type: "text",
        required: true,
        error: !!validationErrors?.[cell.id],
        helperText: validationErrors?.[cell.id],
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          const value = event.currentTarget.value;

          const validationError = !validateRequired(value)
            ? "Requerido"
            : undefined;
          setValidationErrors((prev) => ({
            ...prev,
            [cell.id]: validationError,
          }));

          setEditedOperations((prev) => {
            const prevRow = prev[row.id] ?? row.original;
            return {
              ...prev,
              [row.id]: {
                ...prevRow,
                [cell.column.id]: value,
              },
            };
          });
        },
      }),
    [validationErrors, setValidationErrors, setEditedOperations]
  );

  const columns = useMemo<MRT_ColumnDef<OperationModel>[]>(() => {
    const dynamicEditableColumns = editableFields.map(({ key, label }) => ({
      accessorKey: key,
      header: label,
      muiEditTextFieldProps: getEditProps(key),
    }));

    return [...dynamicEditableColumns];
  }, [getEditProps]);

  const handleCreateOperation: MRT_TableOptions<OperationModel>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateUser(values); // data
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      const newOperation = values as OperationModel;
      const costObj = parseNumericObjectValues({
        KG_300: newOperation.KG_300,
        KG_500: newOperation.KG_500,
        TN_1: newOperation.TN_1,
        TN_3: newOperation.TN_3,
        TN_5: newOperation.TN_5,
        TN_10: newOperation.TN_10,
        TN_20: newOperation.TN_20,
        TN_30: newOperation.TN_30,
      });

      const payload = {
        id: newOperation?.id ? parseInt(newOperation.id) : undefined,
        name: newOperation.name,
        cost: costObj,
      };

      await upsertOperations(parseInt(plantId), [payload]);

      table.setCreatingRow(null);
      onUpdateSuccess?.();
    };

  const handleSaveOperations = async () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;

    const updates = Object.values(editedOperations);
    const inputs = updates.map((op) => ({
      id: op.id ? parseInt(op.id) : undefined,
      name: op.name,
      cost: parseNumericObjectValues({
        KG_300: op.KG_300,
        KG_500: op.KG_500,
        TN_1: op.TN_1,
        TN_3: op.TN_3,
        TN_5: op.TN_5,
        TN_10: op.TN_10,
        TN_20: op.TN_20,
        TN_30: op.TN_30,
      }),
    }));
    console.log("inputs", inputs);

    await upsertOperations(parseInt(plantId), inputs);
    setEditedOperations({});
    onUpdateSuccess?.();
  };

  const table = useMaterialReactTable({
    columns,
    data: operationModel,
    createDisplayMode: "row",
    editDisplayMode: "cell",
    enableClickToCopy: "context-menu",
    enableColumnPinning: true,
    enableEditing: true,
    getRowId: (row) => row.id,
    localization: MRT_Localization_ES,
    initialState: {
      columnPinning: { left: ["name"], right: ["mrt-row-actions"] },
    },
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateOperation,

    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveOperations}
          disabled={
            !!table.getState().creatingRow ||
            Object.keys(editedOperations).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          Guardar cambios
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">
            Corrige los errores antes de guardar
          </Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Crear nueva operación
      </Button>
    ),

    state: {
      isLoading: loading,
      isSaving: loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

const validateRequired = (value: string) => !!value.length;

function validateUser(operation: OperationModel) {
  return {
    name: !validateRequired(operation.name) ? "Name is Required" : "",
    KG_300: !validateRequired(operation.KG_300?.toString() ?? "")
      ? "300 kg cost is Required"
      : "",
    KG_500: !validateRequired(operation.KG_500?.toString() ?? "")
      ? "500 kg cost is Required"
      : "",
    TN_1: !validateRequired(operation.TN_1?.toString() ?? "")
      ? "TN_1 cost is Required"
      : "",
    TN_3: !validateRequired(operation.TN_3?.toString() ?? "")
      ? "TN_3 cost is Required"
      : "",
    TN_5: !validateRequired(operation.TN_5?.toString() ?? "")
      ? "TN_5 cost is Required"
      : "",
    TN_10: !validateRequired(operation.TN_10?.toString() ?? "")
      ? "TN_10 cost is Required"
      : "",
    TN_20: !validateRequired(operation.TN_20?.toString() ?? "")
      ? "TN_20 cost is Required"
      : "",
    TN_30: !validateRequired(operation.TN_30?.toString() ?? "")
      ? "TN_30 cost is Required"
      : "",
  };
}
export default OperationsTable;
