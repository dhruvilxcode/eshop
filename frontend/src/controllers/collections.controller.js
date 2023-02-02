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