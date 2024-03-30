import {
  InputSubmit,
  Title,
  PathInfo,
  RecentSearch,
  RestAreaInfo,
  Loading,
  Logos,
  NaverMap,
} from "@/components";
import { useState, useEffect } from "react";
import { SearchPlaceDataType, Route } from "@/types";
import { useGetRoutes, useGetRestSpots } from "@/hooks";

const Init = () => {
  const [startPlace, setStartPlace] = useState<SearchPlaceDataType | null>(null);
  const [goalPlace, setGoalPlace] = useState<SearchPlaceDataType | null>(null);
  const [routeList, setRouteList] = useState<Route[]>();
  const [selectedRoute, setSelectedRoute] = useState<Route>();
  const [clickedMorePath, setClickedMorePath] = useState<boolean>(false);
  const [restSpotModalOpen, setRestSpotModalOpen] = useState<boolean>(false);
  const [hasStartAndGoal, setHasStartAndGoal] = useState<boolean>(true);
  const [routeListModalOpen, setRouteListModalOpen] = useState<boolean>(false);
  const [restSpotName, setRestSpotName] = useState<string>("");
  const [isMapping, setIsMapping] = useState<boolean>(false);

  // console.log("출발지 확인", startPlace);
  // console.log("도착지 확인", goalPlace);
  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } = useGetRoutes({
    start: [startPlace?.lng, startPlace?.lat].join(","),
    goal: [goalPlace?.lng, goalPlace?.lat].join(","),
    // waypoints: waypoints.map(waypoint => [waypoint.lng, waypoint.lat].join(",")),
    page: "1",
    isTest: true,
  });

  const { data: restSpotList, refetch: restSpotsRefetch } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  });

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch();
      setClickedMorePath(false);
      setRouteListModalOpen(true);
      setRouteList(routes.data);
      routes.data && setSelectedRoute(routes.data[0]);
    } else {
      setHasStartAndGoal(false);
    }
  };

  useEffect(() => {
    selectedRoute && restSpotsRefetch();
  }, [selectedRoute, restSpotsRefetch]);

  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex h-full w-full">
        <div className="flex h-full flex-col">
          <Title />
          <InputSubmit
            setStartPlace={setStartPlace}
            setGoalPlace={setGoalPlace}
            handleClickSearchRoutes={handleClickSearchRoutes}
            setRestSpotModalOpen={setRestSpotModalOpen}
            hasStartAndGoal={hasStartAndGoal}
            setHasStartAndGoal={setHasStartAndGoal}
            setRouteListModalOpen={setRouteListModalOpen}
          />
          {isGetRoutesLoading ? (
            <Loading className="h-full" />
          ) : (
            <>
              {routeList && routeListModalOpen ? (
                <PathInfo
                  routeList={routeList}
                  setRouteList={setRouteList}
                  selectedRoute={selectedRoute}
                  setSelectedRoute={setSelectedRoute}
                  startPlace={startPlace}
                  goalPlace={goalPlace}
                  clickedMorePath={clickedMorePath}
                  setClickedMorePath={setClickedMorePath}
                  setRestSpotModalOpen={setRestSpotModalOpen}
                  routeListModalOpen={routeListModalOpen}
                />
              ) : (
                <RecentSearch />
              )}
            </>
          )}
        </div>
        {selectedRoute && restSpotModalOpen && (
          <RestAreaInfo
            route={selectedRoute}
            setRestSpotModalOpen={setRestSpotModalOpen}
            restSpotName={restSpotName}
            isMapping={isMapping}
            setIsMapping={setIsMapping}
          />
        )}
        <NaverMap
          start={startPlace}
          goal={goalPlace}
          routeList={routeList}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          restSpotList={restSpotList}
          restSpotModalOpen={restSpotModalOpen}
          setIsMapping={setIsMapping}
          setRestSpotName={setRestSpotName}
        />
      </div>
    </div>
  );
};

export default Init;
