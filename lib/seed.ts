import "dotenv/config";
import mongoose from "mongoose";
import Project from "./models/Project";
import { projectsSeed } from "./data";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in .env.local");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  for (const p of projectsSeed) {
    await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    console.log(`Upserted: ${p.name}`);
  }

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
