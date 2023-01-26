import Wishlist from "../models/wishlist.model.js";

/*******************************************
 * @addProductToWishlist
 * @POST
 * @ROUTE /api/v1/wishlist/:userId/add
 * @PARAMS userId, productId
 * @DESCRIPTION this method will add product to wishlist collection
 * @RETURNS suceess
 ******************************************/
export const addProductToWishlist = async (req, res) => {
    const { userId } = req.params;
    
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "Please select product to wishlist!"
        });
    }

    try {
        
        const wishlist = await Wishlist.findOne({
            userId
        });

        if(!wishlist) {
            await Wishlist.create({
                userId,
                products: [productId]
            });

            return res.status(200).json({
                success: true,
                message: "Wishlist created."
            });
        }

        wishlist.products.push(productId);
        const newWishlist = await wishlist.save();

        return res.status(200).json({
            success: true,
            message: "Product added to Wishlist.",
            wishlist: newWishlist,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong on server"
        });
    }
};

/*******************************************
 * @removeProductFromWishlist
 * @POST
 * @ROUTE /api/v1/wishlist/:userId/remove
 * @PARAMS userId, productId
 * @DESCRIPTION this method will remove product from wishlist collection
 * @RETURNS suceess
 ******************************************/
export const removeProductFromWishlist = async (req, res) => {
    const { userId } = req.params;
    
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "Please select product to wishlist!"
        });
    }

    try {
        
        const userWishlist = await Wishlist.findOne({
            userId
        });

        if(!userWishlist) {
            return res.status(400).json({
                success: false,
                message: "Wishlist not found!"
            });
        }

        const newProducts = userWishlist.products.filter(p=>p._id != productId);
        userWishlist.products = newProducts;

        await userWishlist.save();

        return res.status(200).json({
            success: true,
            message: "Wishlist updated."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong on server"
        });
    }
};

/*******************************************
 * @getWishlist
 * @GET
 * @ROUTE /api/v1/wishlist/:userId
 * @PARAMS userId
 * @DESCRIPTION this method will return the list of user's wishlist
 * @RETURNS list of products from wishlist
 ******************************************/
export const getWishlist = async (req, res) => {
    const { userId } = req.params;

    try {
        
        const userWishlist = await Wishlist.findOne({
            userId
        }).populate('products');

        if(!userWishlist) {
            return res.status(400).json({
                success: false,
                message: "Wishlist not found!"
            });
        }

        return res.status(200).json({
            success: true,
            wishlist: userWishlist.products,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong on server"
        });
    }
};