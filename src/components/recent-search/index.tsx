import "./index.css";
import { SearchPlaceDataType, RouteHistory } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface RecentSearchProps {
  startPlace: SearchPlaceDataType | null;
  goalPlace: SearchPlaceDataType | null;
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>;
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>;
  routeHistory: RouteHistory[];
  placeHistory: SearchPlaceDataType[];
  clearHistory: (type: string) => void;
  setSelectedRouteHistory: Dispatch<SetStateAction<RouteHistory | undefined>>;
  handleClickRecentSearch: () => void;
  setClickedPlaceHistory: Dispatch<SetStateAction<boolean>>;
}

const RecentSearch = ({
  startPlace,
  goalPlace,
  setStartPlace,
  setGoalPlace,
  clearHistory,
  routeHistory,
  placeHistory,
  setSelectedRouteHistory,
  handleClickRecentSearch,
  setClickedPlaceHistory,
}: RecentSearchProps) => {
  return (
    <div className="recentSearch">
      <div className="title">
        <p>최근 검색한 장소</p>
        <span onClick={() => clearHistory("place")}>검색 기록 삭제</span>
      </div>
      <div className="list place">
        {placeHistory.length > 0 ? (
          placeHistory
            .slice()
            .reverse()
            .map(place => (
              <p
                onClick={() => {
                  setClickedPlaceHistory(true);
                  if (startPlace == null) setStartPlace(place);
                  else if (goalPlace == null) setGoalPlace(place);
                }}
              >
                {place.name}
              </p>
            ))
        ) : (
          <span>검색 기록이 없습니다.</span>
        )}
      </div>

      <div className="title">
        <p>최근 검색한 경로</p>
        <span onClick={() => clearHistory("route")}>검색 기록 삭제</span>
      </div>
      <div className="list route">
        {routeHistory.length > 0 ? (
          routeHistory
            .slice()
            .reverse()
            .map(routeHistory => (
              <p
                key={routeHistory.searchId}
                onClick={() => {
                  setSelectedRouteHistory(routeHistory);
                  handleClickRecentSearch();
                }}
              >
                {routeHistory.name}
              </p>
            ))
        ) : (
          <span>검색 기록이 없습니다.</span>
        )}
      </div>
    </div>
  );
};
export default RecentSearch;
