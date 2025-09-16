import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { PlantModel } from "../types/graphql";

type Props = {
  plants: PlantModel[];
  selectedPlant: PlantModel | null;
  setSelectedPlant: (plant: PlantModel) => void;
};

const Sidebar = ({ plants, setSelectedPlant, selectedPlant }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    const code = event.target.value;
    selectedPlant = plants.find((plant) => plant.code === code) || null;
    console.log("Planta seleccionada:", selectedPlant);
    setSelectedPlant(selectedPlant!);
  };

  return (
    <aside className="w-64 bg-gray-200 p-4">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedPlant?.code || ""}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {plants.map((plant) => (
            <MenuItem value={plant.code}>{plant.name} (planta)</MenuItem>
          ))}
        </Select>
      </FormControl>
    </aside>
  );
};

export default Sidebar;
