import { useQuery } from "@tanstack/react-query";
import { useGetSearchPlaceRequestType, SearchPlaceDataType } from "@/types";
import { loadData, URL } from "@/apis";

const useGetSearchPlace = ({ searchTerm }: useGetSearchPlaceRequestType) => {
  const getSearch = async () => {
    const response = await loadData(`${URL.searchPlace}=${searchTerm}`);
    return response.data;
  };

  return useQuery<SearchPlaceDataType[], Error>({
    queryKey: ["search"],
    queryFn: getSearch,
    enabled: !!searchTerm,
  });
};

export default useGetSearchPlace;
