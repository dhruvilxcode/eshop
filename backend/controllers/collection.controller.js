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

export const updateCollection = async (req, res) => {
    const {id: collectionId} = req.params;

    const {name} = req.body;

    if(!name) {
        return res.status(400).json({
            message: "Collection name is required"
        });
    }

    const modifiedCollection = await Collection.findByIdAndUpdate(collectionId, {
        name
    }, {new: true, runValidators: true});

    return res.status(200).json({
        success: true,
        message: "Collection updated.",
        collection: modifiedCollection
    });
};

export const deleteCollection = async (req, res) => {
    const {id: collectionId} = req.params;

    const collection = await Collection.findByIdAndDelete(collectionId);
    collection.remove();

    return res.status(200).json({
        success: true,
        message: "Collection removed successfully."
    });
}

export const getAllCollection = async (req, res) => {
    const collections = await Collection.find();

    if(!collections) {
        return res.status(200).json([]);
    }

    return res.status(200).json(collections);
}