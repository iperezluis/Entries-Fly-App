import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry } from "../../../../models";
import { IEntry } from "../../../../models/Entry";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query;
  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({
  //     message: "El id no es valido",
  //   });
  // }
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({
        message: "this method is not exist",
      });
  }
}
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      message: "No existe entrada con ese ID",
    });
  }
  //if the fields is not coming then we leave  the before value by default
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { new: true, runValidators: true }
    );
    /*too we can to use this scope below */
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();
    await db.disconnect();
    res.status(200).json(updateEntry!);
  } catch (error: any) {
    console.log(error);
    db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
  // res.status(200).json(updateEntry!);
};
//we get the entry by ID
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const getEntry = await Entry.findById(id);
    if (!getEntry) {
      await db.disconnect();
      res.status(404).json({
        message: "No existe una entrada con ese ID",
      });
    }
    db.disconnect();
    res.status(200).json(getEntry!);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "hubo un error en el servidor",
    });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await Entry.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json({
      message: "entrada elimianda con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "hubo un error en el servidor",
    });
  }
};
