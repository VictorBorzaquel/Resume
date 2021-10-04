function imageURL(path: string | null) {
  const baseURL = "https://image.tmdb.org/t/p/original";
  const image = { uri: baseURL + path };

  const defaultImage = require("../assets/semfoto.png");

  return path ? image : defaultImage;
}
