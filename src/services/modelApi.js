import axios from "axios";
import { SERVER_URL } from "../data/globals";
import supabase, { supabaseUrl } from "./supabase";

export async function getModel(id) {
  const { data } = await axios({
    method: "get",
    url: `${SERVER_URL}/models/${id}`,
  });

  const modelData = data?.data;

  return modelData;
}

export async function updateModel(id, data) {
  if (data.thumbnail) {
    const { data: thumbnailData, error: thumbnailError } =
      await supabase.storage
        .from("thumbnails")
        .upload(`${Date.now()}-${data.thumbnail.name}`, data.thumbnail);
    data.thumbnailUrl = `${supabaseUrl}/storage/v1/object/public/${thumbnailData.fullPath}`;
    if (thumbnailError) throw new Error("Error uploading thumbnail");
  }

  return axios({
    url: `${SERVER_URL}/models/${id}`,
    data,
    method: "patch",
  });
}

export async function getModels({ teacherId, department, modelTitle }) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/models?${teacherId ? "teacher=" + teacherId + "&" : ""}${department ? "department=" + department + "&" : ""}${modelTitle ? "modelTitle=" + modelTitle + "&" : ""}`,
  });
}
