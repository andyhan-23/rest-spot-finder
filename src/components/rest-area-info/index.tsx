import RestAreaInfoContent from "./content";
import PathInfoContent from "../path-info/content";
import { RestAreaInfoPropsType, RestSpot } from "@/types";
import { Fragment, useEffect, useState } from "react";
import { useGetRestSpots } from "@/hooks";
import { DoubleLeftArrow } from "@/assets/icons";
import { Loading } from "..";

const RestAreaInfo = ({
  route,
  restSpotModalOpen,
  setRestSpotModalOpen,
  hoveredRestSpot,
  setHoveredRestSpot,
  clickedRestSpot,
  setClickedRestSpot,
  clickedRouteIndex,
}: RestAreaInfoPropsType) => {
  const [restAreaList, setRestAreaList] = useState<RestSpot[] | undefined>();
  const {
    data: restAreaListData,
    isFetching: restSpotsFetching,
    isLoading: restSpotsLoading,
    refetch: restSpotsRefetch,
  } = useGetRestSpots({ routeId: route?.routeId });

  useEffect(() => {
    if (!restSpotsLoading) {
      setRestAreaList(restAreaListData);
      restSpotsRefetch();
    }
  }, [restAreaListData, setRestAreaList, restSpotsRefetch, restSpotsLoading]);

  useEffect(() => {
    if (!restSpotModalOpen) setRestAreaList([]);
  }, [restSpotModalOpen]);

  return (
    <div className="relative z-50 flex w-96 shrink-0  flex-col border border-gray-300">
      {route && <PathInfoContent ranking={clickedRouteIndex} route={route} />}
      <i
        className="absolute right-3 top-3 rounded-lg hover:bg-emerald-100"
        onClick={() => setRestSpotModalOpen(false)}
      >
        <DoubleLeftArrow className="h-6 w-6 hover:stroke-green-800" />
      </i>
      <p className="border-b border-t border-gray-200 px-4 py-3 text-xs font-semibold text-gray-800">
        <span className="text-sm text-red-600">더블 클릭시</span> 경로상 휴게소 정보가 표시됩니다.
      </p>
      <hr />
      {restSpotsFetching ? (
        <Loading className="h-full" />
      ) : (
        <>
          {restAreaListData?.length === 0 ? (
            <div className="relative flex w-full justify-center">
              <h1 className="font-bold">조회 데이터가 없습니다.</h1>
            </div>
          ) : (
            <div className="flex w-full flex-col overflow-scroll">
              {restAreaList?.map((value, index) => {
                return (
                  <Fragment key={index}>
                    <RestAreaInfoContent
                      key={value.restAreaId}
                      type={value.type}
                      restaurant={value.hasRestaurant}
                      gasStation={value.hasGasStation}
                      electricCar={value.hasElectricChargingStation}
                      pharmacy={value.hasPharmacy}
                      toilet={value.hasRestroom}
                      name={value.name}
                      routeName={value.routeName}
                      naverMapUrl={value.naverMapUrl}
                      hoveredRestSpot={hoveredRestSpot}
                      setHoveredRestSpot={setHoveredRestSpot}
                      clickedRestSpot={clickedRestSpot}
                      setClickedRestSpot={setClickedRestSpot}
                    />
                    {index !== restAreaList.length - 1 && <hr />}
                  </Fragment>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestAreaInfo;
