import { EntriesState } from "./EntriesProvider";
import { Entry } from "../../interfaces/entry";

type EntriesAction =
  | { type: "Add Entry"; payload: Entry }
  | { type: "Update Entry"; payload: Entry }
  | { type: "Get Entries"; payload: Entry[] }
  | { type: "Delete Entry" };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesAction
): EntriesState => {
  switch (action.type) {
    case "Add Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "Update Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "Get Entries":
      return {
        ...state,
        entries: [...action.payload],
      };
    case "Delete Entry":
      return {
        ...state,
        entries: [...state.entries],
      };

    default:
      return state;
  }
};
