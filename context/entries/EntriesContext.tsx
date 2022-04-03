import React, { createContext, Dispatch, SetStateAction } from "react";

import { Entry, EntryStatus } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  isLoading: boolean;
  isAlert: boolean;
  setIsAlert: Dispatch<SetStateAction<boolean>>;
  addNewEntry: (description: string) => Promise<Entry | undefined>;
  updateEntry: (entry: Entry) => void;
  loadEntries: () => Promise<void>;
  deleteEntry: (id: string) => Promise<boolean | undefined>;
}

export const EntriesContext = createContext({} as ContextProps);
