import { useQuery } from "@tanstack/react-query";
import { loadData, URL } from "@/apis";
import { RestSpot, useGetRestSpotsRequestType } from "@/types";

const useGetRestSpots = ({ routeId }: useGetRestSpotsRequestType) => {
  const getRestSpot = async () => {
    const response = await loadData(`${URL.restSpots}=${routeId}`);
    return response.data;
  };

  return useQuery<RestSpot[], Error>({
    queryKey: ["restSpots"],
    queryFn: getRestSpot,
    enabled: !!routeId,
  });
};

export default useGetRestSpots;
