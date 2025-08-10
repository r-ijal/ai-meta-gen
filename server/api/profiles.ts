import { supabaseClient } from "../utils/supabase";

export default defineEventHandler(async (event) => {
    const { data, error } = await supabaseClient.from("profiles").select("*");
    if (error) {
        return error;
    }
    return data;
});