import PathInfoContent from "./content";
import { useGetRoutes } from "@/hooks";
import { Loading } from "..";
import { PathInfoPropsType } from "@/types";

const PathInfo = ({
  routeList,
  setRouteList,
  selectedRoute,
  setSelectedRoute,
  startPlace,
  goalPlace,
  clickedMorePath,
  setClickedMorePath,
  setRestSpotModalOpen,
  routeListModalOpen,
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

  return (
    <div
      className={`relative flex h-full flex-col overflow-auto ${!routeListModalOpen && "hidden"}`}
    >
      <h1 className="px-3 py-2 text-center font-bold text-red-600">
        더블 클릭시 경로상 휴게소 정보가 표시됩니다.
      </h1>
      <div className="h-full overflow-y-scroll">
        {routeList?.map((route, index) => {
          return (
            <div
              className={`felx-col flex ${route === selectedRoute && "border-b border-t border-emerald-500 bg-emerald-100"}`}
              key={route.routeId}
              onClick={() => setSelectedRoute(route)}
              onDoubleClick={() => setRestSpotModalOpen(true)}
            >
              <PathInfoContent ranking={index} route={route} />
              {index !== routeList.length - 1 && <hr />}
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
    </div>
  );
};

export default PathInfo;
