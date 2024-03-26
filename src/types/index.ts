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
