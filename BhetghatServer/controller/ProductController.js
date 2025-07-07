const multer = require('multer');
const path = require('path');
const Product = require("../model/Product");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: 'eventImage', maxCount: 1 },
  { name: 'eventFile', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 } 
]);

// Create a product
const createProduct = async (req, res) => {
  uploadFields(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).send({ message: "File upload failed", error: err });
    }

    try {
      const {
        title = null,
        organizerName = null,
        description = null,
        price = null,
        category = null,
        date = null,
        time = null,
        venue = null,
        location = null,
      } = req.body;

      const eventImage = req.files["eventImage"]
        ? `/images/${req.files["eventImage"][0].filename}`
        : null;

      const eventFile = req.files["eventFile"]
        ? req.files["eventFile"][0].path
        : null;

        const profileImage = req.files["profileImage"]
  ? `/images/${req.files["profileImage"][0].filename}`
  : null;


      const newProduct = new Product({
        title,
        organizerName,
        description,
        price,
        category,
        date,
        time,
        location,
        venue,
        eventImage,
        eventFile,
        profileImage
      });

      await newProduct.save();
      res.status(200).send({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send({ message: "Failed to create product", error: error.message });
    }
  });
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
};

// Get single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found!" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).send({ message: "Failed to fetch product" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFields = {
      ...req.body,
      description: req.body.description ?? null,
      date: req.body.date ?? null,
      time: req.body.time ?? null,
      location: req.body.location ?? null,
    };

    if (req.files?.["eventImage"]) {
      updatedFields.eventImage = `/images/${req.files["eventImage"][0].filename}`;
    }

    if (req.files?.["eventFile"]) {
      updatedFields.eventFile = req.files["eventFile"][0].path;
    }

    if (req.files?.["profileImage"]) {
  updatedFields.profileImage = `/images/${req.files["profileImage"][0].filename}`;
}


    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found!" });
    }

    res.status(200).send({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).send({ message: "Failed to update product" });
  }
};

// Delete product
const deleteAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found!" });
    }
    res.status(200).send({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).send({ message: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteAProduct,
};
