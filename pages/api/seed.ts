import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import Entry from "../../models/Entry";
import { seeData } from "../../database/seed-data";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "No tiene acceso a este servicio",
    });
  }
  //En prudccion siempre la mandamos a conectar y despues que termine de hacer toda la funcion que metemos en el scope la mandamos a desconectar
  await db.connect();
  await Entry.deleteMany(); //eliminamos toda la coleccion
  await Entry.insertMany(seeData.entries); //insertamos toda una coleccion
  await db.disconnect();

  res.status(200).json({
    message: "todo correcto",
  });
}
