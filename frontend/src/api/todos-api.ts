import { TaskList } from "../types";
import http from "./http";

export const getLists = async () =>{
    const res = await http.get("/todos");
    return res.data
}

export const addList = async (title: string) =>{
    const res = await http.post("/todos", {title});
    return res.status
}