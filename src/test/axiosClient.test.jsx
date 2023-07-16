import {
  getMediaList,
  getDetails,
  getCast,
  getVideo,
  getSimilar,
  getImages,
  getPersonDetail,
  getPersonMedia,
  SearchMedia,
} from "../api/axiosClient";

describe("API", () => {
  describe("getMediaList", () => {
    it("fetches media list", async () => {
      const mediaType = "movie";
      const mediaName = "popular";
      const results = await getMediaList(mediaType, mediaName);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("getDetails", () => {
    it("fetches details of media", async () => {
      const type = "movie";
      const id = 550;
      const result = await getDetails(type, id);
      expect(result.id).toBe(id);
    });
  });

  describe("getCast", () => {
    it("fetches cast of media", async () => {
      const type = "movie";
      const id = 550;
      const results = await getCast(type, id);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("getVideo", () => {
    it("fetches video of media", async () => {
      const type = "movie";
      const id = 550;
      const results = await getVideo(type, id);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("getSimilar", () => {
    it("fetches similar media", async () => {
      const type = "movie";
      const id = 550;
      const results = await getSimilar(type, id);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("getImages", () => {
    it("fetches images of media", async () => {
      const type = "movie";
      const id = 550;
      const result = await getImages(type, id);
      expect(result.id).toBe(id);
    });
  });

  describe("getPersonDetail", () => {
    it("fetches details of person", async () => {
      const personId = 287;
      const result = await getPersonDetail(personId);
      expect(result.id).toBe(personId);
    });
  });

  describe("getPersonMedia", () => {
    it("fetches media of person", async () => {
      const personId = 287;
      const results = await getPersonMedia(personId);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("SearchMedia", () => {
    it("searches for media", async () => {
      const mediaType = "movie";
      const query = "batman";
      const page = 1;
      const result = await SearchMedia(mediaType, query, page);
      expect(result.page).toBe(page);
      expect(Array.isArray(result.results)).toBe(true);
    });
  });
});
