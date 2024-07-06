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
    <div className="box-border flex h-full flex-col overflow-y-auto">
      <p className="border-b border-t border-gray-200 px-4 py-3 text-xs font-semibold text-gray-800">
        <span className="text-sm text-red-600">더블 클릭시</span> 경로상 휴게소 정보가 표시됩니다.
      </p>
      <div className="box-border flex-grow overflow-y-auto">
        {routeList?.map((route, index) => {
          return (
            <div
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
          <Loading className="bottom" />
        ) : (
          <div
            className={`text-shadow-md mx-auto my-4 w-4/5 cursor-pointer rounded-lg bg-green-600 bg-opacity-70 py-3 text-center font-medium text-white shadow-md ${clickedMorePath && "hidden"}`}
            onClick={handleClickMorePathData}
          >
            더보기
          </div>
        )}
      </div>
      <p className="border-t border-gray-200 px-4 py-3 text-xs font-semibold text-gray-800">
        {startPlace?.name} {`->`} {goalPlace?.name}
      </p>
    </div>
  );
};

export default PathInfo;
