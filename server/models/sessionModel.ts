import { Collection } from "mongodb";
import { client } from "../config/db.js";
import type { Session } from "../../shared/types.js";

let collection: Collection<Session>;

export function getCollection(): Collection<Session> {
  if (!collection) {
    const db = client.db("trainingApp");
    collection = db.collection<Session>("sessions");
  }
  return collection;
}
