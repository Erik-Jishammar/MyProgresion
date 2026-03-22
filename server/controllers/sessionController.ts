import { Request, Response } from "express";
import { getCollection } from "../models/sessionModel.js";
import type { Session } from "../../shared/types.js";

export const getSessions = async (_req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const sessions = await collection.find({}).toArray();
    res.json(sessions);
  } catch (error) {
    console.error("Problem fetching from database", error);
    res.status(500).json({ error: "Could not fetch sessions" });
  }
};

export const createSession = async (
  req: Request<{}, {}, Session>,
  res: Response
) => {
  try {
    const collection = getCollection();
    const newSession: Session = req.body;

    if (!newSession._id) newSession._id = Date.now().toString();
    newSession.exercises = newSession.exercises || [];

    await collection.insertOne(newSession);
    res.json(newSession);
  } catch (error) {
    console.error("Problem saving to database", error);
    res.status(500).json({ error: "Could not save session" });
  }
};

export const updateSession = async (
  req: Request<{ id: string }, {}, Partial<Session>>,
  res: Response
) => {
  try {
    const collection = getCollection();
    const { id } = req.params;
    const updateData = req.body;

    await collection.updateOne({ _id: id }, { $set: updateData });

    res.json({ message: "Session updated" });
  } catch (error) {
    console.error("Problem updating session", error);
    res.status(500).json({ error: "Could not update session" });
  }
};

export const deleteSession = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const collection = getCollection();
    const { id } = req.params;

    await collection.deleteOne({ _id: id });

    res.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Problem deleting session", error);
    res.status(500).json({ error: "Could not delete session" });
  }
};
