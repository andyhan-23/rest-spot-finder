import {
  InputSubmit,
  Title,
  PathInfo,
  RecentSearch,
  RestAreaInfo,
  Loading,
  NaverMap,
  Survey,
} from "@/components";
import { useState, useEffect } from "react";
import { SearchPlaceDataType, Route, RouteHistory } from "@/types";
import { useGetRoutes, useGetRestSpots, useGetRoutesBySearchId } from "@/hooks";

const Init = () => {
  const [startPlace, setStartPlace] = useState<SearchPlaceDataType | null>(null);
  const [goalPlace, setGoalPlace] = useState<SearchPlaceDataType | null>(null);
  const [routeList, setRouteList] = useState<Route[]>();
  const [selectedRoute, setSelectedRoute] = useState<Route>();
  const [selectedRouteHistory, setSelectedRouteHistory] = useState<RouteHistory | undefined>();
  const [clickedRouteIndex, setClickedRouteIndex] = useState<number>(0);
  const [clickedMorePath, setClickedMorePath] = useState<boolean>(false);
  const [hasStartAndGoal, setHasStartAndGoal] = useState<boolean>(true);
  const [restSpotModalOpen, setRestSpotModalOpen] = useState<boolean>(false);
  const [showRouteList, setShowRouteList] = useState<boolean>(false);
  const [hoveredRestSpot, setHoveredRestSpot] = useState<string>("");
  const [clickedRestSpot, setClickedRestSpot] = useState<string>("");
  const [routeHistory, setRouteHistory] = useState<RouteHistory[]>([]);
  const [placeHistory, setPlaceHistory] = useState<SearchPlaceDataType[]>([]);
  const [clickedPlaceHistory, setClickedPlaceHistory] = useState<boolean>(false);

  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } = useGetRoutes({
    start: [startPlace?.lng, startPlace?.lat].join(","),
    goal: [goalPlace?.lng, goalPlace?.lat].join(","),
    page: "1",
    isTest: true,
  });

  const { data: restSpotList, refetch: restSpotsRefetch } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  });

  const { refetch: routesBySearchIdRefetch } = useGetRoutesBySearchId({
    searchId: selectedRouteHistory?.searchId,
  });

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch();
      setShowRouteList(true);
      setClickedMorePath(false);
      setRouteList(routes.data);
      routes.data && setSelectedRoute(routes.data[0]);
      const name = startPlace?.name + " -> " + goalPlace?.name;
      const searchId = routes.data ? routes.data[0].searchId : 0;
      addRouteHistory({ name, searchId, startPlace, goalPlace });
      setHasStartAndGoal(true); // errText
      setClickedPlaceHistory(false); // 최근 검색 장소 클릭 초기화
      setClickedRestSpot(""); // 휴게소 클릭 초기화
    } else setHasStartAndGoal(false);
  };

  const handleClickRecentSearch = async () => {
    if (selectedRouteHistory != null && selectedRouteHistory.searchId > 0) {
      const routes = await routesBySearchIdRefetch();
      setShowRouteList(true);
      setClickedMorePath(false);
      setRouteList(routes.data);
      routes.data && setSelectedRoute(routes.data[0]);
      setStartPlace(selectedRouteHistory.startPlace);
      setGoalPlace(selectedRouteHistory.goalPlace);
    }
  };

  const addRouteHistory = (routeHistoryItem: RouteHistory) => {
    const history: RouteHistory[] = JSON.parse(localStorage.getItem("route") || "[]");
    if (history.length >= 5) history.shift();

    history.push(routeHistoryItem);
    localStorage.setItem("route", JSON.stringify(history));
    setRouteHistory(history);
  };

  const addPlaceHistory = (place: SearchPlaceDataType) => {
    const history: SearchPlaceDataType[] = JSON.parse(localStorage.getItem("place") || "[]");
    if (history.length >= 5) history.shift();

    history.push(place);
    localStorage.setItem("place", JSON.stringify(history));
    setPlaceHistory(history);
  };

  const clearHistory = (type: string) => {
    if (type) {
      localStorage.removeItem(type);
      if (type === "route") setRouteHistory([]);
      if (type === "place") setPlaceHistory([]);
    }
  };

  useEffect(() => {
    selectedRoute && restSpotsRefetch();
  }, [selectedRoute, restSpotsRefetch]);

  useEffect(() => {
    setPlaceHistory(JSON.parse(localStorage.getItem("place") || "[]"));
    setRouteHistory(JSON.parse(localStorage.getItem("route") || "[]"));
  }, []);

  // 최근 검색한 경로 클릭 이벤트 처리
  useEffect(() => {
    handleClickRecentSearch();
  }, [selectedRouteHistory]);

  // 최근 검색한 장소 클릭 이벤트 처리
  useEffect(() => {
    if (startPlace && goalPlace && clickedPlaceHistory) {
      handleClickSearchRoutes();
    }
  }, [startPlace, goalPlace, clickedPlaceHistory]);

  return (
    <div className="box-border flex overflow-hidden">
      <div className="relative z-10 box-border flex h-screen w-[25.5em] flex-col bg-white shadow-lg">
        <div className="w-5.5 absolute left-full top-1/2 h-12 -translate-y-1/2 transform cursor-pointer rounded-r-md border border-r-0 border-gray-300 bg-white hover:shadow-lg">
          <span className="flex h-full items-center justify-center text-lg font-semibold text-gray-600 hover:text-blue-400">
            <i className="fas fa-chevron-left"></i>
          </span>
        </div>
        <Title />
        <InputSubmit
          startPlace={startPlace}
          setStartPlace={setStartPlace}
          goalPlace={goalPlace}
          setGoalPlace={setGoalPlace}
          setRouteList={setRouteList}
          handleClickSearchRoutes={handleClickSearchRoutes}
          setRestSpotModalOpen={setRestSpotModalOpen}
          hasStartAndGoal={hasStartAndGoal}
          setShowRouteList={setShowRouteList}
          showRouteList={showRouteList}
          addPlaceHistory={addPlaceHistory}
        />
        {isGetRoutesLoading ? (
          <Loading />
        ) : (
          <>
            {routeList && showRouteList ? (
              <PathInfo
                routeList={routeList}
                setRouteList={setRouteList}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
                clickedRouteIndex={clickedRouteIndex}
                setClickedRouteIndex={setClickedRouteIndex}
                startPlace={startPlace}
                goalPlace={goalPlace}
                clickedMorePath={clickedMorePath}
                setClickedMorePath={setClickedMorePath}
                setRestSpotModalOpen={setRestSpotModalOpen}
                setClickedRestSpot={setClickedRestSpot}
              />
            ) : (
              <div>
                <RecentSearch
                  startPlace={startPlace}
                  goalPlace={goalPlace}
                  setStartPlace={setStartPlace}
                  setGoalPlace={setGoalPlace}
                  routeHistory={routeHistory}
                  placeHistory={placeHistory}
                  clearHistory={clearHistory}
                  setSelectedRouteHistory={setSelectedRouteHistory}
                  handleClickRecentSearch={handleClickRecentSearch}
                  setClickedPlaceHistory={setClickedPlaceHistory}
                />
                <Survey />
              </div>
            )}
          </>
        )}
      </div>
      {selectedRoute && restSpotModalOpen && (
        <div className="relative z-10 box-border flex h-screen w-[25.5em] flex-col bg-white shadow-lg">
          <RestAreaInfo
            route={selectedRoute}
            restSpotModalOpen={restSpotModalOpen}
            setRestSpotModalOpen={setRestSpotModalOpen}
            hoveredRestSpot={hoveredRestSpot}
            setHoveredRestSpot={setHoveredRestSpot}
            clickedRestSpot={clickedRestSpot}
            setClickedRestSpot={setClickedRestSpot}
            clickedRouteIndex={clickedRouteIndex}
          />
        </div>
      )}
      <div className="box-border h-screen flex-grow">
        <NaverMap
          start={startPlace}
          goal={goalPlace}
          routeList={routeList}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          restSpotList={restSpotList}
          restSpotModalOpen={restSpotModalOpen}
          setHoveredRestSpot={setHoveredRestSpot}
          setClickedRestSpot={setClickedRestSpot}
          clickedRestSpot={clickedRestSpot}
        />
      </div>
    </div>
  );
};

export default Init;
