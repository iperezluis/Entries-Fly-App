import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sideOpenMenu: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideOpenMenu: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "Open_side_bar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "Close_side_bar" });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "Set Is Adding Entry", payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: "Start Dragging" });
  };
  const endDragging = () => {
    dispatch({ type: "End Dragging" });
  };
  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
