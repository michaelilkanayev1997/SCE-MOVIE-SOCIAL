const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "ec4b07f78b625f26ac3a4d00c989391b",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
