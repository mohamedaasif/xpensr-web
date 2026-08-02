import { getServerApi } from "../axios/server";

export async function getProfile() {
  const api = await getServerApi();

  const { data } = await api.get("/profile/view");

  return data;
}
