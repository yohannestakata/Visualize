import axios from "axios";
import { SERVER_URL } from "../data/globals";
import supabase, { supabaseUrl } from "./supabase";

export async function getModel(id) {
  const { data } = await axios({
    method: "get",
    url: `${SERVER_URL}/models/${id}`,
  });

  const modelData = data?.data;
  const modelName = modelData.modelUrl.split("/").at(-1);

  const { data: model, error } = await supabase.storage
    .from("models")
    .download(modelName);

  if (error) return error;

  return { ...modelData, model };
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
