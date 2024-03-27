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

  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } = useGetRoutes({
    start: [startPlace?.lng, startPlace?.lat].join(","),
    goal: [goalPlace?.lng, goalPlace?.lat].join(","),
    // waypoints: waypoints.map(waypoint => [waypoint.lng, waypoint.lat].join(",")),
    page: "1",
  });

  const { data: restSpotList, refetch: restSpotsRefetch } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  });

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch();
      setClickedMorePath(false);
      setRouteList(routes.data);
      routes.data && setSelectedRoute(routes.data[0]);
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
          />
          {isGetRoutesLoading ? (
            <Loading className="h-full" />
          ) : (
            <>
              {routeList ? (
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
                />
              ) : (
                <RecentSearch />
              )}
            </>
          )}
        </div>
        {selectedRoute && restSpotModalOpen && (
          <RestAreaInfo route={selectedRoute} setRestSpotModalOpen={setRestSpotModalOpen} />
        )}
        <NaverMap
          start={startPlace}
          goal={goalPlace}
          routeList={routeList}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          restSpotList={restSpotList}
          restSpotModalOpen={restSpotModalOpen}
        />
      </div>
    </div>
  );
};

export default Init;
