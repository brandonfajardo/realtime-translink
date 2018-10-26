import { UPDATE_BUS_LOCATIONS } from "../actions/types";

const initialState = {
  busList: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_BUS_LOCATIONS:
      return {
        busList: payload
      };
    default:
      return state;
  }
};
