import { FC, useCallback, useEffect, useReducer, useState } from "react";

import { Entry, EntryStatus } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
// import { entriesApi } from "../../apis";
import { useRouter } from "next/router";
import apiEntry from "../../apis/apiEntry";

// import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const router = useRouter();

  const timeAlert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const addNewEntry = async (
    description: string
  ): Promise<Entry | undefined> => {
    try {
      const { data } = await apiEntry.post<Entry>("/entries", {
        description: description,
      });
      dispatch({ type: "Add Entry", payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
    /*Aqui comentamos esta entrada ya que la usamos para simular la creacion de una entrada con uuid pero com oahora usamos la db la generamnos desde el backend */
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description: description,
    //   createAt: Date.now(),
    //   status: "Pending",
    // };
  };

  const updateEntry = async ({
    _id,
    description,
    status,
  }: Entry): Promise<Entry | undefined> => {
    try {
      setIsLoading(true);
      const { data } = await apiEntry.put(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      setIsLoading(false);
      dispatch({ type: "Update Entry", payload: data });
      timeAlert();
      return data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const loadEntries = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await apiEntry.get<Entry[]>("/entries");
      console.log({ data });
      setIsLoading(false);
      dispatch({ type: "Get Entries", payload: data });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const deleteEntry = async (id: string): Promise<boolean | undefined> => {
    setIsLoading(true);
    try {
      const { data } = await apiEntry.delete(`/entries/${id}`);
      setIsLoading(false);
      dispatch({ type: "Delete Entry" });
      return router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        isAlert,
        isLoading,
        setIsAlert,
        addNewEntry,
        deleteEntry,
        updateEntry,
        loadEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
