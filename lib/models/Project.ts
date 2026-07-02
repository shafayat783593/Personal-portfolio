import mongoose, { Schema, models, model } from "mongoose";

export interface IProject {
  _id?: string;
  slug: string;
  name: string;
  image: string;
  summary: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  challenges: string;
  improvements: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    stack: { type: [String], default: [] },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    challenges: { type: String, default: "" },
    improvements: { type: String, default: "" },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default (models.Project as mongoose.Model<IProject>) || model<IProject>("Project", ProjectSchema);
