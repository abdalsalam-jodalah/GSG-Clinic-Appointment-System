import type { Appointment } from "../@types";

export interface State {
  appointments: Appointment[];
}

export const initialState: State = {
  appointments: [],
};

export type Action =
  | { type: "CREATE_APPOINTMENT"; payload: Appointment }
  | { type: "UPDATE_APPOINTMENT"; payload: Appointment };

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CREATE_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment.id === action.payload.id ? action.payload : appointment
        ),
      };
    default:
      return state;
  }
};
