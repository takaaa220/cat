import axios from "axios";

const myHttpClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  timeout: 1000,
  headers: { "x-api-key": process.env.APIKEY }
});

export const getBreeds = () => {
  return myHttpClient.get("/breeds");
};

export const getCategories = () => {
  return myHttpClient.get("/categories");
};

export const getCats = (breedID = "", categoryID = "", limit = 20, page = 1) => {
  return myHttpClient.get("/images/search", {
    params: {
      page,
      limit,
      category_ids: categoryID || null,
      breed_id: breedID || null
    }
  });
};
