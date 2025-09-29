import BlogModel from "../models/BlogModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add Blog Controller
const AddBlog = async (req, res) => {
  try {
    const { title, content, date, socialMediaLink,googleDriveLink } = req.body;
    const image1 = req.files?.image1?.[0];

    let imagesUrl = [];
    if (image1) {
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    const BlogData = {
      title,
      content,
      date: date || new Date(),
      socialMediaLink,
      googleDriveLink,
      image: imagesUrl[0], // assuming single image
    };

    const blog = new BlogModel(BlogData);
    await blog.save();

    res.json({ success: true, message: "Blog Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const EditBlog = async (req, res) => {
  try {
    const { id, title, content, date, socialMediaLink,googleDriveLink } = req.body;
    const image1 = req.files?.image1?.[0];

    let imagesUrl = [];
    if (image1) {
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    const updatedFields = {
      title,
      content,
      date: date || new Date(),
      socialMediaLink,
      googleDriveLink,
    };

    if (imagesUrl.length > 0) {
      updatedFields.image = imagesUrl[0];
    }

    await BlogModel.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json({ success: true, message: "Blog Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List Blogs
const ListBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Single Blog
const SingleBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await BlogModel.findById(blogId);
    res.json({ success: true, blog });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Blog
const RemoveBlog = async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Blog Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// GET /api/blog/stats
 const getBlogStats = async (req, res) => {
  try {
   const count = await BlogModel.countDocuments(); // ✅ Correct model name
;
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get blog stats" });
  }
};


export {
  ListBlog,
  AddBlog,
  RemoveBlog,
  SingleBlog,
  EditBlog,
  getBlogStats,
};
