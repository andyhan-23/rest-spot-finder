import RestAreaInfoContent from "./content";
import PathInfoContent from "../path-info/content";
import { RestAreaInfoPropsType, RestSpot } from "@/types";
import { Fragment, useEffect, useState } from "react";
import { useGetRestSpots } from "@/hooks";
import { DoubleLeftArrow } from "@/assets/icons";
import { Loading } from "..";

const RestAreaInfo = ({ route, setRestSpotModalOpen, hoveredRestSpot }: RestAreaInfoPropsType) => {
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

  return (
    <div className="relative z-50 flex w-96 shrink-0 flex-col border border-gray-300">
      {route && <PathInfoContent ranking={-1} route={route} />}
      <i
        className="absolute right-3 top-3 rounded-lg hover:bg-emerald-100"
        onClick={() => setRestSpotModalOpen(false)}
      >
        <DoubleLeftArrow className="h-6 w-6 hover:stroke-green-800" />
      </i>
      <hr />
      {restSpotsFetching ? (
        <Loading className="h-full" />
      ) : (
        <>
          {restAreaListData?.length === 0 ? (
            <div className="relative flex w-full justify-center">
              <h1 className="font-bold">보여줄 휴게소가 없습니다.</h1>
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
