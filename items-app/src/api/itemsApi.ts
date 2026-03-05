import axios from "axios";
import { Item } from "../types";

export const fetchItems = async (): Promise<Item[]> => {
    const response = await axios.get("/items");
    return response.data;
}

export const getImageUrl = (guid: string): string => `/image/${guid}`;