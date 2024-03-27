import { Dispatch, SetStateAction } from "react";

export type SearchPlaceDataType = {
  name: string;
  lat: string;
  lng: string;
  category?: string;
  address?: string;
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
  setErrorModalOpen: Dispatch<SetStateAction<boolean>>;
  errorModalOpen: boolean;
};

export type InputSubmitContentPropsType = {
  setPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>;
  type: "start" | "goal";
  isReset: boolean;
  setErrorModalOpen: Dispatch<SetStateAction<boolean>>;
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

export type PathInfoType = Omit<Route, "coordinates" | "createdDate" | "searchId" | "routeOption">;

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

export type useGetRestSpotsRequestType = {
  routeId: number | undefined;
};

export type RestSpot = {
  restAreaId: number;
  name: string;
  routeName: string;
  routeDirection: "상행" | "하행" | "양방향";
  lat: number;
  lng: number;
  type: string;
  operatingStartTime: string;
  operatingEndTime: string;
  parkingSpaceCount: number;
  isMaintenanceAvailable: boolean;
  hasGasStation: boolean;
  hasLpgChargingStation: boolean;
  hasElectricChargingStation: boolean;
  hasRestroom: boolean;
  hasPharmacy: boolean;
  hasNursingRoom: boolean;
  hasStore: boolean;
  hasRestaurant: boolean;
  otherFacilities: string;
  representativeFood: string;
  phoneNumber: string;
  naverMapUrl: string;
};

export type RestAreaInfoPropsType = {
  route: PathInfoType | undefined;
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type RestAreaInfoContentPropsType = {
  type: string;
  restaurant: boolean;
  gasStation: boolean;
  electricCar: boolean;
  pharmacy: boolean;
  toilet: boolean;
  name: string;
  routeName: string;
  naverMapUrl: string;
};

export type CustomMarkerPropsType = {
  type?: "start" | "goal" | "waypoints";
  waypointsIndex?: number;
  position: { lat: number; lng: number };
};

export type RestSpotMarkerPropsType = {
  position: { lat: number; lng: number };
  clicked?: boolean;
  onClick?: () => void;
};

export type NaverMapPropsType = {
  start?: SearchPlaceDataType | null;
  goal?: SearchPlaceDataType | null;
  waypoints?: SearchPlaceDataType[];
  routeList?: Route[];
  selectedRoute?: Route;
  setSelectedRoute: Dispatch<SetStateAction<Route | undefined>>;
  restSpotList?: RestSpot[];
  restSpotModalOpen: boolean;
};
