import axios from "axios";

const myHttpClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  timeout: 3000,
  headers: { "x-api-key": process.env.APIKEY }
});

export const getBreeds = () => {
  return myHttpClient.get("/breeds");
};

export const getCategories = () => {
  return myHttpClient.get("/categories");
};

export const getCats = (page: any, breedID: string | null, categoryID: number | null) => {
  return myHttpClient.get("/images/search", {
    params: {
      page,
      limit: 20,
      category_ids: categoryID || null,
      breed_id: breedID || null
    }
  });
};
