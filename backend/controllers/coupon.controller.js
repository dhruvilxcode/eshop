import Coupon from "../models/coupon.model";

/**********************************************************
 * @CREATE_COUPON
 * @route https://localhost:5000/api/coupon
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
 * @DEACTIVATE_COUPON
 * @route https://localhost:5000/api/coupon/deactive/:couponId
 * @description Controller used for deactivating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon Deactivated SuccessFully"
 *********************************************************/


/**********************************************************
 * @DELETE_COUPON
 * @route https://localhost:5000/api/coupon/:couponId
 * @description Controller used for deleting the coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success Message "Coupon Deleted SuccessFully"
 *********************************************************/



/**********************************************************
 * @GET_ALL_COUPONS
 * @route https://localhost:5000/api/coupon
 * @description Controller used for getting all coupons details
 * @description Only admin and Moderator can get all the coupons
 * @returns allCoupons Object
 *********************************************************/