import axios from "axios";
import { SERVER_URL } from "../data/globals";
import supabase from "./supabase";

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

  // console.log({ ...modelData, model });

  return { ...modelData, model };
}
