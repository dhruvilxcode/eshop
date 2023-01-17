import Collection from "../models/collection.model";

/******************************************************
 * @Create_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const createCollection = async (req, res) => {
    const {name} = req.body;

    if(!name) {
        return res.status(400).json({
            message: "collection name is required!"
        });
    }

    const collection = await Collection.create({
        name
    });

    return res.status(201).json({
        success: true,
        message: "Collection created successfully.",
        collection
    });
}