import { useQuery } from "@tanstack/react-query";
import apiClient from "@/apis/client";
import { useGetSearchPlaceRequestType, SearchPlaceDataType } from "@/types";

const useGetSearchPlace = ({ searchTerm }: useGetSearchPlaceRequestType) => {
  const getSearch = async () => {
    const response = await apiClient.get(`/place/naver?searchTerm=${searchTerm}`);
    return response.data.data;
  };

  return useQuery<SearchPlaceDataType[], Error>({
    queryKey: ["search"],
    queryFn: getSearch,
    enabled: !!searchTerm,
  });
};

export default useGetSearchPlace;
