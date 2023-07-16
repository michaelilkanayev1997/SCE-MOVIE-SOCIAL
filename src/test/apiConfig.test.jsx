import apiConfig from "../api/apiConfig";

describe("apiConfig", () => {
  it("has a baseUrl property", () => {
    expect(apiConfig.baseUrl).toBeDefined();
    expect(typeof apiConfig.baseUrl).toBe("string");
    expect(apiConfig.baseUrl).toBe("https://api.themoviedb.org/3/");
  });

  it("has an apiKey property", () => {
    expect(apiConfig.apiKey).toBeDefined();
    expect(typeof apiConfig.apiKey).toBe("string");
  });

  it("has an originalImage property that returns a valid URL", () => {
    const imagePath = "/some-image-path.jpg";
    const expectedUrl = `https://image.tmdb.org/t/p/original/${imagePath}`;
    expect(apiConfig.originalImage(imagePath)).toBe(expectedUrl);
  });

  it("has a w500Image property that returns a valid URL", () => {
    const imagePath = "/some-image-path.jpg";
    const expectedUrl = `https://image.tmdb.org/t/p/w500/${imagePath}`;
    expect(apiConfig.w500Image(imagePath)).toBe(expectedUrl);
  });
});
