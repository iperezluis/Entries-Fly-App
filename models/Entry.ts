import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces/entry";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  status: {
    type: String,
    enum: {
      values: ["Pending", "In-Progress", "Finished"],
      message: "{VALUE} no es un valor permitido",
    },
    default: "Pending",
  },
  createdAt: { type: Number },
});

const entryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default entryModel;
