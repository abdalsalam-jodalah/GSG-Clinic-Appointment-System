import React, { createContext, useReducer, ReactNode } from "react";
import { appReducer, initialState, Action } from "./appReducer";

interface AppContextType {
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
