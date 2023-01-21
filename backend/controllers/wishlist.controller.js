import Wishlist from "../models/wishlist.model";

/*******************************************
 * @addProductToWishlist
 * @POST
 * @ROUTE http://localhost:4000/api/v1/users/:userId/wishlist/add
 * @PARAMS userId, product id
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
        
        const resp = await Wishlist.findOneAndUpdate({
            userId
        }, {
            $addToSet: {
                products: productId
            }
        });

        if(!resp) {
            return res.status(400).json({
                success: false,
                message: "Can't add Product to wishlist now!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product added to Wishlist."
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
 * @ROUTE http://localhost:4000/api/v1/users/:userId/wishlist/remove
 * @PARAMS userId, product id
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
 * @ROUTE http://localhost:4000/api/v1/users/:userId/wishlist
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
            message: userWishlist.products,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong on server"
        });
    }
};