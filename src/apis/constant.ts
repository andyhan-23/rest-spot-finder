const URL = Object.freeze({
  base: "http://3.37.19.140:8080/api",
  searchPlace: "/place/naver?searchTerm",
  routes: "/route?start",
  restSpots: "/restarea/route?routeId",
} as const);

export default URL;
