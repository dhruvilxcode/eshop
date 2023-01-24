import Collection from "../models/collection.model.js";

/******************************************************
 * @POST
 * @Create_COLLECTION
 * @route /api/v1/collections/create
 * @description create collection
 * @parameters name
 * @returns collection Object
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

/******************************************************
 * @PUT
 * @UPDATE_COLLECTION
 * @route /api/v1/collections/update
 * @description updates the collection
 * @parameters id, name
 * @returns collection Object
 ******************************************************/
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

/******************************************************
 * @DELETE
 * @DELETE_COLLECTION
 * @route /api/v1/collections/delete
 * @description delete the collection
 * @parameters id
 * @returns success
 ******************************************************/
export const deleteCollection = async (req, res) => {
    const {id: collectionId} = req.params;

    const collection = await Collection.findByIdAndDelete(collectionId);
    collection.remove();

    return res.status(200).json({
        success: true,
        message: "Collection removed successfully."
    });
}

/**********************************************
 * @GET
 * @PATH /api/v1/collections
 * @DESCRIPTION this controller will return all the collection from DB.
 * @RETURNS returns collection array
 *********************************************/
export const getAllCollection = async (req, res) => {
    const collections = await Collection.find();

    if(!collections) {
        return res.status(200).json([]);
    }

    return res.status(200).json(collections);
}