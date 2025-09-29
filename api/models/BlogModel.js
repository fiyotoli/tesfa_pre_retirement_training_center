import mongoose from "mongoose";

const BlogModelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  socialMediaLink: { type: String }, // optional
  googleDriveLink: { type: String }, // optional
});

const BlogModel = mongoose.models?.blog || mongoose.model("blog", BlogModelSchema);

export default BlogModel;
