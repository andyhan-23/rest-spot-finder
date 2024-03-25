export type SearchPlaceDataType = {
  name: string;
  lat: string;
  lng: string;
  category: string;
  address: string;
};

export type useGetSearchPlaceRequestType = {
  searchTerm: string | undefined;
};
