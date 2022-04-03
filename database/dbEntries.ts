import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Entry as IEntry } from "../interfaces";
import { Entry } from "../models";

export const getEntriesById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const entry = await Entry.findById(id).lean();
  await db.disconnect();
  //aqui como mongo no nos estaba serializando el _id apklciamos esta solucion universal para qeulo serialice como lo hace postman

  return JSON.parse(JSON.stringify(entry));
};
