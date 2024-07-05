import { useQuery } from "@tanstack/react-query";
import { loadData } from "@/apis";
import { Route } from "@/types";
import { URL } from "@/apis";

interface Request {
  searchId?: number;
}

const useGetRoutesBySearchId = ({ searchId }: Request) => {
  const getRoutes = async () => {
    const response = await loadData(`${URL.routeSeachId}=${searchId}`);
    return response.data;
  };

  const queryKey = ["routes"];

  return useQuery<Route[], Error>({
    queryKey,
    queryFn: getRoutes,
    enabled: false,
  });
};

export default useGetRoutesBySearchId;
