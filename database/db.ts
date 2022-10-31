import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 *
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log("ya estamos conectados");
    return;
  }
  //verificamos si ya hay conecciones activas y usamos la primera
  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    //depsues de que nos conectamos a la primera posicion isCopnnected sera = 1 por lo tanto volvemos a prewguntar
    if (mongoConnection.isConnected === 1) {
      console.log("usando  la conexion anterior");
      return;
    }
    await mongoose.disconnect();
  }
  // mongodb+srv://entries_db:Dinero8**@backend-cafe.y7fo5.mongodb.net/entriesdb
  try {
    await mongoose.connect(process.env.MONGO_URL);
    mongoConnection.isConnected = 1;
    console.log("conectado a mongoDB", process.env.MONGO_URL);
  } catch (error: any) {
    console.log(error.errors.status.message);
  }
};

export const disconnect = async () => {
  //esta condicion es para cuando estamos haciendo peticiones a la db en modo desarrollo no lo desconecte
  if (process.env.NODE_ENV === "development") {
    return;
  }
  if (mongoConnection.isConnected === 0) {
    return;
  }
  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log("desconectado de la DB");
};
