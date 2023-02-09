import Product from "../models/product.model.js";
import formidable from "formidable";
import fs from "fs";
import mongoose from "mongoose";
import config from "../config/index.js";
import { deleteImageCloudinary, uploadImageCloudinary } from "../services/imageUpload.js";

/****************************************************************
 * @GET_ALL_PRODUCTS
 * @ROUTE /products
 * @DESCRIPTION get all products
 * @RETURNS product array list
 ***************************************************************/
export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("collectionId");

  if (!products) {
    return res.status(200).json([]);
  }

  return res.status(200).json(products);
};

/****************************************************************
 * @GET_PRODUCT
 * @ROUTE /products/:productId
 * @PARAMS productId
 * @QUERY include_collection
 * @DESCRIPTION get specific products
 * @RETURNS product object
 ***************************************************************/
export const getProduct = async (req, res) => {
  const { productId } = req.params;
  const { include_collection } = req.query;

  try {
    const product = include_collection ? 
    await Product.findById(productId).populate("collectionId") :
    await Product.findById(productId);

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

/**********************************************************
 * @delete
 * @DELETE_PRODUCT
 * @route /api/products/:productId/delete
 * @description Controller used for deleting a product
 * @description Only admin can delete the product
 * @returns Product Object
 *********************************************************/
export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findOneAndRemove(productId);

    return res.status(200).json({
      success: true,
      message: "Product successfully deleted.",
      deletedProduct
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting product!"
    });
  }
};

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
        !fields.collectionId
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide required fields Name, Price, Collection!",
        });
      }

      const productId = new mongoose.Types.ObjectId().toHexString();

      let imgArrayResponse;
      if (files.images) {
        imgArrayResponse = Promise.all(
          files.images.map(async (file, index) => {
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
      }

      if (files.images) {
        const imgArray = await imgArrayResponse;

        const product = await Product.create({
          _id: productId,
          photos: imgArray,
          ...fields,
        });

        if (!product) {
          return res.status(500).json({
            success: false,
            message: "Something went wrong while saving product details",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Product added.",
          product,
        });
      }

      const product = await Product.create({
        _id: productId,
        ...fields,
      });

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while saving product details",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product added.",
        product,
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

/* 
Update product:
1. basic details: name, price, collection
2. description, sku_id, inventory (stock), 
3. is Featured
4. Photos
5. sizes
6. variants
 */

/**
 * @updateProductBasicDetails
 * @POST
 * @ROUTE /api/v1/products/:productId/update/basic_details
 * @params productId, name, price, collectionId, mrp
 * @description used to update basic product details
 * @returns Product Object
 *  */  
export const updateProductBasicDetails = async (req, res) => {
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
        !fields.collectionId
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide all details!",
        });
      }

      const productId = req.params.productId;

      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
        },
        {
          name: fields.name,
          price: fields.price,
          collectionId: fields.collectionId,
          mrp: fields.mrp || 0,
        }
      );

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while saving product details",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product updated.",
        product,
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

/**
 * @updateProductAdvancedDetails
 * @POST
 * @ROUTE /api/v1/products/:productId/update/advance_details
 * @params productId, description, sku_id, stock
 * @description used to update advanced product details
 * @returns Product Object
 *  */  
export const updateProductAdvancedDetails = async (req, res) => {
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

      const productId = req.params.productId;

      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
        },
        {
          description: fields.description || undefined,
          sku_id: fields.sku_id || undefined,
          stock: fields.stock || 0,
          featured: fields.featured || false,
        }
      );

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while saving product details",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product updated.",
        product,
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

/**
 * @updateProductImages
 * @POST
 * @ROUTE /api/v1/products/:productId/update/images
 * @params productId, images
 * @description used to update advanced product details
 * @returns Product Object
 *  */  
export const updateProductImages = async (req, res) => {
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

      const productId = req.params.productId;

      let imgArrayResponse;
      if (!files.images) {
        return res.status(400).json({
          success: false,
          message: "Please provide at least 1 image!"
        });
      }

      let images=[];

      if(files?.images?.length > 0) {
        images.push(...files.images);
      } else {
        images.push(files.images);
      }

      imgArrayResponse = Promise.all(
        images.map(async (file, index) => {
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
            public_id: upload.public_id,
          };
        })
      );

      const imgArray = await imgArrayResponse;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while saving product details",
        });
      }

      product.photos.push(...imgArray);
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product updated.",
        product,
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

/**
 * @deleteProductImage
 * @POST
 * @ROUTE /api/v1/products/:productId/delete/image
 * @params productId, imageId, secure_url, public_id 
 * @description used to delete product image
 * @returns Product Object
 *  */  
export const deleteProductImage = async (req, res) => {
  try {
    const productId = req.params.productId;
    const imageId = req.body.imageId;
    const secure_url = req.body.secure_url;
    const public_id = req.body.public_id;

    if(!imageId) {
      return res.status(400).json({
        status: false,
        message: "Bad request!"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while saving product details",
      });
    }

    // delete image from storage
    await deleteImageCloudinary(public_id);

    product.photos = product.photos.filter(photo=>photo._id != imageId);

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated.",
      product,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong, try again later",
    });
  }
};
