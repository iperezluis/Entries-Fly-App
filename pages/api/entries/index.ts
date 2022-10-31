import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { ok: boolean; message: string } | IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return addEntry(req, res);

    default:
      return res.status(400).json({
        ok: false,
        message: "EndPoint no existe",
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  //recuerda primero nos conectamos
  try {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: "ascending" });
    await db.disconnect();

    res.status(200).json(entries);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.errors.status.message,
    });
  }
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description, createdAt } = req.body;
  if (!description) {
    return res.status(404).json({
      ok: false,
      message: "the fields are empty",
    });
  }
  try {
    await db.connect();
    const entry = new Entry({ description, createdAt: Date.now() });
    await entry.save();
    await db.disconnect();

    res.status(200).json({
      ok: true,
      entry,
    });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      ok: false,
      message: "hubo un error en el servidor",
    });
  }
};
