import { UIState } from "./UIProvider";

type UIAction =
  | { type: "Open_side_bar" }
  | { type: "Close_side_bar" }
  | { type: "Set Is Adding Entry"; payload: boolean }
  | { type: "Start Dragging" }
  | { type: "End Dragging" };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "Open_side_bar":
      return {
        ...state,
        sideOpenMenu: true,
      };
    case "Close_side_bar":
      return {
        ...state,
        sideOpenMenu: false,
      };
    case "Set Is Adding Entry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case "Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "End Dragging":
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
