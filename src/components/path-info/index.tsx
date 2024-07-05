import PathInfoContent from "./content";
import { useGetRoutes } from "@/hooks";
import { Loading } from "..";
import { PathInfoPropsType, Route } from "@/types";

const PathInfo = ({
  routeList,
  setRouteList,
  setSelectedRoute,
  clickedRouteIndex,
  setClickedRouteIndex,
  startPlace,
  goalPlace,
  clickedMorePath,
  setClickedMorePath,
  setRestSpotModalOpen,
  setClickedRestSpot,
}: PathInfoPropsType) => {
  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } = useGetRoutes({
    start: [startPlace?.lng, startPlace?.lat].join(","),
    goal: [goalPlace?.lng, goalPlace?.lat].join(","),
    page: "2",
    isTest: true,
  });

  const handleClickMorePathData = () => {
    routesRefetch().then(routes => routes.data && setRouteList([...routeList, ...routes.data]));
    setClickedMorePath(true);
  };

  const handleClick = (route: Route, index: number) => {
    setClickedRouteIndex(index);
    setSelectedRoute(route);
  };

  return (
    <div className={`relative flex h-full flex-col overflow-auto`}>
      <p className="px-3 py-2 text-center font-bold text-red-600">
        <span>더블 클릭시</span> 경로상 휴게소 정보가 표시됩니다.
      </p>
      <div className="h-full overflow-y-scroll">
        {routeList?.map((route, index) => {
          return (
            <div
              className={"felx-col flex border-b border-t border-emerald-500 bg-emerald-100"}
              key={route.routeId}
              onClick={() => handleClick(route, index + 1)}
              onDoubleClick={() => {
                setRestSpotModalOpen(true);
                setClickedRestSpot("");
              }}
            >
              <PathInfoContent ranking={index + 1} route={route} clickedId={clickedRouteIndex} />
              <hr />
            </div>
          );
        })}
        {isGetRoutesLoading && clickedMorePath ? (
          <Loading className="mt-3" />
        ) : (
          <button
            className={`relative ml-8 mt-5 h-10 w-80 rounded-md bg-green-600 ${clickedMorePath && "hidden"}`}
            onClick={handleClickMorePathData}
          >
            <p className="text-white">더보기</p>
          </button>
        )}
      </div>
      <p>
        {startPlace?.name} {`->`} {goalPlace?.name}
      </p>
    </div>
  );
};

export default PathInfo;
