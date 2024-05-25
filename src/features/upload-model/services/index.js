import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import supabase, { supabaseUrl } from "../../../services/supabase";

export async function uploadModel(fields) {
  const thumbnailFile = fields.thumbnail;
  const modelFile = fields.model;

  const { data: thumbnailData, error: thumbnailError } = await supabase.storage
    .from("thumbnails")
    .upload(`${Date.now()}-${thumbnailFile.name}`, thumbnailFile);

  const { data: modelData, error: modelError } = await supabase.storage
    .from("models")
    .upload(`${Date.now()}-${modelFile.name}`, modelFile);

  return axios({
    method: "post",
    url: `${SERVER_URL}/models/upload`,
    data: {
      ...fields,
      thumbnailUrl: `${supabaseUrl}/storage/v1/object/public/${thumbnailData.fullPath}`,
      modelUrl: `${supabaseUrl}/storage/v1/object/public/${modelData.fullPath}`,
      thumbnail: undefined,
      model: undefined,
    },
    headers: { "Content-Type": "multipart/form-data" },
  });
}
