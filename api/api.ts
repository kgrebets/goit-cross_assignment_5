import axios from "axios";
import { Box } from "../models/Box";

export const api = axios.create({
    baseURL: "https://6838599d2c55e01d184cf497.mockapi.io",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

export async function getBoxes(): Promise<Box[]> {
    const res = await api.get<Box[]>("/boxes", {
        params: { sortBy: "createdAt", order: "desc" },
    });

    return res.data;
}

export async function createBox(payload: Omit<Box, "id">): Promise<Box> {
    const res = await api.post<Box>("/boxes", payload);
    return res.data;
}

export async function getBox(id: string): Promise<Box> {
    const res = await api.get<Box>(`/boxes/${id}`);
    return { ...res.data, items: res.data.items ?? [] };
}
