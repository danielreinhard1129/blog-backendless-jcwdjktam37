import { cache } from "react";

const url = process.env.NEXT_PUBLIC_BASE_URL_API!;

export const getBlog = cache(async (objectId: string) => {
  const response = await fetch(url + "/api/data/Blogs/" + objectId);
  return await response.json();
});
