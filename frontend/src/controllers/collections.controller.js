import { API } from "../config/api.config";
import axios from "axios";
import useSWR from 'swr';

axios.defaults.withCredentials = true;

// export const getAllCollections = async() => {
//     const resp = await axios.get(`${API}/collections`);
//     return resp;
// };

const fetcher = (url) => axios.get(url).then(res=>res.data);

export function useCollections() {
    const {data, error, isLoading} = useSWR(`${API}/collections`, fetcher);
    return {
        collections: data,
        isError: error,
        isLoading,
    };
}

/**
 * @param {string} name - provide collection name to create new collection, this parameter is required.
 *  */
export async function createCollection(name) {
    const resp = await axios.post(`${API}/collections/create`, {
        name: name
    });
    return resp;
}

/**
 * @param {string} collectionId provide unique collection id to remove the collection
 *  */ 
export async function deleteCollection(collectionId) {
    const resp = await axios.delete(`${API}/collections/delete/${collectionId}`);
    return resp;
}

/**
 * @param {string} collectionId - provide the collection id, this parameter is required
 * @param {string} name - provide collection name to update the collection, this parameter is required.
 *  */
export async function updateCollection(collectionId, name) {
    const resp = await axios.put(`${API}/collections/update/${collectionId}`, {
        name: name
    });
    return resp;
}