import { RecentSearchPropsType } from "@/types";
import { LocationIcon } from "@/assets/icons";

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
}: RecentSearchPropsType) => {
  return (
    <div className="mt-[-1rem] px-6">
      <div className="mt-8 flex justify-between border-b border-gray-200 pb-2 pl-2 text-sm font-semibold">
        <p>최근 검색한 장소</p>
        <span
          onClick={() => clearHistory("place")}
          className="hover:text-shadow mr-[-10px] flex cursor-pointer items-center justify-center px-2 text-xs text-red-500 hover:shadow-md"
        >
          검색 기록 삭제
        </span>
      </div>
      <div className="my-4 mb-12  text-sm font-semibold text-gray-800">
        {placeHistory.length > 0 ? (
          placeHistory
            .slice()
            .reverse()
            .map((place, index) => (
              <div
                key={index}
                onClick={() => {
                  setClickedPlaceHistory(true);
                  if (startPlace == null) setStartPlace(place);
                  else if (goalPlace == null) setGoalPlace(place);
                }}
                className="hover:text-shadow-md mx-2.5 my-4 cursor-pointer hover:text-blue-600"
              >
                <div className="flex flex-row">
                  <LocationIcon className="h-5 w-5" />
                  {place.name}
                </div>
              </div>
            ))
        ) : (
          <span className="text-shadow-md mx-2.5 my-4">검색 기록이 없습니다.</span>
        )}
      </div>

      <div className="mt-8 flex justify-between border-b border-gray-200 pb-2 pl-2 text-sm font-semibold">
        <p>최근 검색한 경로</p>
        <span
          onClick={() => clearHistory("route")}
          className="text-crimson hover:text-shadow mr-[-10px] flex cursor-pointer items-center justify-center px-2 text-xs text-red-500 hover:shadow-md"
        >
          검색 기록 삭제
        </span>
      </div>
      <div className="my-4 mb-12 text-sm font-semibold text-gray-800">
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
                className="hover:text-shadow-md mx-2.5 my-4 cursor-pointer hover:text-blue-600"
              >
                <span className="font-awesome pr-2 text-gray-400 before:content-['\f1b9']"></span>
                {routeHistory.name}
              </p>
            ))
        ) : (
          <span className="text-shadow-md mx-2.5 my-4">검색 기록이 없습니다.</span>
        )}
      </div>
    </div>
  );
};

export default RecentSearch;
