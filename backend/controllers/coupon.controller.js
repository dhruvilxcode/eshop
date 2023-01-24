import Coupon from "../models/coupon.model.js";

/**********************************************************
 * @POST
 * @CREATE_COUPON
 * @route /api/v1/coupons/create
 * @params code, discount
 * @description Controller used for creating a new coupon
 * @description Only admin and Moderator can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/
export const createCoupon = async (req, res) => {
    const { code, discount } = req.body;

    if(! (code && discount) ) {
        return res.status(400).json({
            success: false,
            message: "Please provide coupon code, discount!"
        });
    }

    try {
        // check if coupon already exist
        const couponExists = await Coupon.findOne({
            code
        });

        if(couponExists) {
            return res.status(400).json({
                message: "oops! Coupon code already exists!"
            });
        }

        const coupon = await Coupon.create({
            code,
            discount: parseFloat(discount), 
            active: true,
        });

        return res.status(201).json({
            success: true,
            message: "Coupon successfully created.",
            coupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while saving details."
        });
    }
}

/**********************************************************
 * @PUT
 * @DEACTIVATE_COUPON
 * @route /api/v1/coupons/deactive/:code
 * @params code
 * @description Controller used for deactivating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon Deactivated SuccessFully"
 *********************************************************/
export const deactivateCoupon = async (req, res) => {
    const { code } = req.params;

    try {
        // check if coupon don't exist
        const couponExists = await Coupon.findOne({
            code
        });

        if(!couponExists) {
            return res.status(404).json({
                message: "oops! provided coupon is no longer available!"
            });
        }

        const coupon = await Coupon.findOneAndUpdate({
            code, 
        }, {
            active: false,
        }, {new: true});

        return res.status(201).json({
            success: true,
            message: "Coupon deactivated SuccessFully.",
            coupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while saving details."
        });
    }
}

/**********************************************************
 * @PUT
 * @ACTIVATE_COUPON
 * @route /api/v1/coupons/activate/:code
 * @params code
 * @description Controller used for activating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon activated SuccessFully"
 *********************************************************/
export const activateCoupon = async (req, res) => {
    const { code } = req.params;

    try {
        // check if coupon don't exist
        const couponExists = await Coupon.findOne({
            code
        });

        if(!couponExists) {
            return res.status(404).json({
                message: "oops! provided coupon is no longer available!"
            });
        }

        const coupon = await Coupon.findOneAndUpdate({
            code, 
        }, {
            active: true,
        }, {new: true});

        return res.status(201).json({
            success: true,
            message: "Coupon activated SuccessFully.",
            coupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while saving details."
        });
    }
}

/**********************************************************
 * @DELETE
 * @DELETE_COUPON
 * @route /api/v1/coupons/delete/:code
 * @params code
 * @description Controller used for deleting the coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success Message "Coupon Deleted SuccessFully"
 *********************************************************/
export const deleteCoupon = async (req, res) => {
    const {code} = req.params;

    try {
        const deletedCoupon = await Coupon.findOneAndDelete({code});

        return res.status(200).json({
            success: true,
            message: "Coupon deleted successfully.",
            coupon: deletedCoupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while saving details."
        });
    }
};


/**********************************************************
 * @GET
 * @GET_ALL_COUPONS
 * @route /api/v1/coupons
 * @description Controller used for getting all coupons details
 * @description Only admin and Moderator can get all the coupons
 * @returns allCoupons Object
 *********************************************************/
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({});

        return res.status(200).json(coupons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting details."
        });
    }
}

/**********************************************************
 * @GET
 * @GET_COUPON
 * @route /api/v1/coupons/:code
 * @params code
 * @description Controller used for getting one coupon details
 * @description user can get coupon detail by applying on checkout
 * @returns coupon Object
 *********************************************************/
export const getCouponDetails = async (req, res) => {
    try {
        const {code} = req.params;
        const coupon = await Coupon.findOne({
            code
        });

        if(!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon doesn't exists!"
            });
        }

        return res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting details."
        });
    }
}