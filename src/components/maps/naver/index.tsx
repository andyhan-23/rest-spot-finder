import { Container as MapDiv, NaverMap, useNavermaps, Polyline } from "react-naver-maps";
import { useEffect, useState, useRef } from "react";
import { RestSpot, NaverMapPropsType } from "@/types";
import { CustomMarker, RestSpotMarker } from "..";

const NaverMapService = ({
  start,
  goal,
  waypoints,
  routeList,
  selectedRoute,
  setSelectedRoute,
  restSpotList,
  restSpotModalOpen,
}: NaverMapPropsType) => {
  const navermaps = useNavermaps();
  const mapRef = useRef<naver.maps.Map>(null);
  const [restSpotClicked, setRestSpotClicked] = useState<RestSpot>();

  useEffect(() => {
    start &&
      mapRef.current?.setCenter(
        new naver.maps.LatLng(parseFloat(start.lat), parseFloat(start.lng))
      );
  }, [start, mapRef]);

  useEffect(() => {
    goal &&
      mapRef.current?.setCenter(new naver.maps.LatLng(parseFloat(goal.lat), parseFloat(goal.lng)));
  }, [goal, mapRef]);

  const handleClickRoute = (routeOption: string) => {
    setSelectedRoute(routeList?.find(route => route.routeOption === routeOption));
  };

  return (
    <MapDiv style={{ width: "100%", height: "100dvh" }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        ref={mapRef}
      >
        {start && (
          <CustomMarker
            position={{
              lat: parseFloat(start.lat),
              lng: parseFloat(start.lng),
            }}
            type="start"
          />
        )}
        {goal && (
          <CustomMarker
            position={{
              lat: parseFloat(goal.lat),
              lng: parseFloat(goal.lng),
            }}
            type="goal"
          />
        )}
        {waypoints &&
          waypoints.map((waypoint, idx) => {
            return (
              <CustomMarker
                position={{
                  lat: parseFloat(waypoint.lat),
                  lng: parseFloat(waypoint.lng),
                }}
                type="waypoints"
                key={idx}
                waypointsIndex={idx + 1}
              />
            );
          })}
        {restSpotList &&
          restSpotModalOpen &&
          restSpotList.map(spot => {
            return (
              <RestSpotMarker
                position={{
                  lat: spot.lat,
                  lng: spot.lng,
                }}
                onClick={() => setRestSpotClicked(spot)}
                clicked={restSpotClicked?.restAreaId === spot.restAreaId}
                key={spot.restAreaId}
              />
            );
          })}
        {start &&
          goal &&
          routeList?.map(path => (
            <Polyline
              key={path.routeId}
              path={path.coordinates.map(coordinate => {
                return new navermaps.LatLng(parseFloat(coordinate.lat), parseFloat(coordinate.lng));
              })}
              strokeLineCap="round"
              strokeLineJoin="round"
              strokeColor={`${path.routeOption === selectedRoute?.routeOption ? "#2DB400" : "#A9A9A9"}`}
              strokeOpacity={0.8}
              strokeWeight={6}
              clickable={true}
              onClick={() => handleClickRoute(path.routeOption)}
              zIndex={selectedRoute?.routeOption === path.routeOption ? 1 : 0}
            />
          ))}
      </NaverMap>
    </MapDiv>
  );
};

export default NaverMapService;
