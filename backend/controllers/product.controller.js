import Product from "../models/product.model.js";
import formidable from "formidable";
import fs from "fs";
import mongoose from "mongoose";
import config from "../config/index.js";
import { uploadImageCloudinary } from "../services/imageUpload.js";

/**********************************************************
 * @ADD_PRODUCT
 * @route /api/products/create
 * @description Controller used for creating a new product
 * @description Only admin can create the product
 * @description Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/
export const addProduct = async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Something went wrong! try again later!",
        });
      }

      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        !fields.collectionId
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide all details!",
        });
      }

      const productId = new mongoose.Types.ObjectId().toHexString();

      // TODO: accept images
      let imgArrayResponse = Promise.all(
        files.images.map(async (file, index)=>{
          
          /* file object has following keys: 
            filepath, newFilename,
            originalFilename,
            mimetype,
            size
          */

          const upload = await uploadImageCloudinary({
            file: file.filepath,
            bucket: `products/${productId}/`,
            filename: `photo_${index + 1}.jpg`,
          });

          return {
            secure_url: upload.secure_url,
          };
        })
      );

      const imgArray = await imgArrayResponse;

      const product = await Product.create({
          _id: productId,
          photos: imgArray,
          ...fields,
      });

      if(!product) {
          return res.status(500).json({
              success: false,
              message: "Something went wrong while saving product details"
          });
      }

      return res.status(200).json({
          success: true,
          message: "Product added.",
          product
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong, try again later",
      });
    }
  });
};

/****************************************************************
 * @GET_ALL_PRODUCTS
 * @ROUTE /products
 * @DESCRIPTION get all products
 * @RETURNS product array list
 ***************************************************************/
export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate('collectionId');

  if (!products) {
    return res.status(200).json([]);
  }

  return res.status(200).json(products);
};

/****************************************************************
 * @GET_PRODUCT
 * @ROUTE /products/:productId
 * @PARAMS productId
 * @DESCRIPTION get specific products
 * @RETURNS product object
 ***************************************************************/
export const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('collectionId');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while getting product",
    });
  }
};

// TODO: update product, delete product, make product as featured
