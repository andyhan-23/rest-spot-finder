import { useQuery } from "@tanstack/react-query";
import { useGetRoutesRequestType, Route } from "@/types";
import { loadData, URL } from "@/apis";

const useGetRoutes = ({ start, goal, waypoints, page }: useGetRoutesRequestType) => {
  const getRoutes = async () => {
    const response = await loadData(
      `${URL.routes}=${start}&goal=${goal}&page=${page}${
        waypoints ? `&waypoints=${waypoints.join("%7c")}` : ""
      }`
    );
    return response.data;
  };

  const queryKey = ["routes", start, goal, waypoints, page];

  return useQuery<Route[], Error>({
    queryKey,
    queryFn: getRoutes,
    enabled: false,
  });
};

export default useGetRoutes;
