import { Dispatch, SetStateAction } from "react";

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

export type useGetRoutesRequestType = {
  start: string;
  goal: string;
  waypoints?: string[];
  page: string;
};
export type InputSubmitPropsType = {
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>;
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>;
  handleClickSearchRoutes: () => void;
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type InputSubmitContentPropsType = {
  setPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>;
  type: "start" | "goal";
  isReset: boolean;
};

export type LoadingPropsType = {
  className?: string;
};

export type Route = {
  coordinates: SearchPlaceDataType[];
  createdDate: string;
  distance: string;
  duration: string;
  fuelPrice: string;
  optionText: string;
  routeId?: number;
  routeOption: string;
  searchId: number;
  tollFare: string;
};

export type PathInfoType = Omit<
  Route,
  "coordinates" | "createdDate" | "searchId" | "routeOption" | "routeId"
>;

export type PathInfoPropsType = {
  routeList: Route[];
  setRouteList: Dispatch<SetStateAction<Route[] | undefined>>;
  selectedRoute: Route | undefined;
  setSelectedRoute: Dispatch<SetStateAction<Route | undefined>>;
  startPlace: SearchPlaceDataType | null;
  goalPlace: SearchPlaceDataType | null;
  clickedMorePath: boolean;
  setClickedMorePath: Dispatch<SetStateAction<boolean>>;
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type PathInfoContentPropsType = {
  ranking: number;
  route: PathInfoType;
};
