import { UPDATE_BUS_LOCATIONS } from "./types";

export const updateBusLocations = data => ({
  type: UPDATE_BUS_LOCATIONS,
  payload: data
});
