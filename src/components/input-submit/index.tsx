import { InputSubmitPropsType } from "@/types";
import { useEffect, useState } from "react";
import InputSubmitContent from "./content";
import { RestartIcon, RightIcon } from "@/assets/icons";

const InputSubmit = ({
  startPlace,
  setStartPlace,
  goalPlace,
  setGoalPlace,
  setRouteList,
  handleClickSearchRoutes,
  setRestSpotModalOpen,
  hasStartAndGoal,
  setShowRouteList,
  showRouteList,
  addPlaceHistory,
}: InputSubmitPropsType) => {
  const [isReset, setIsReset] = useState<boolean>(false);

  useEffect(() => {
    isReset && setIsReset(false);
  }, [setIsReset, isReset]);

  const handleClickReset = () => {
    setStartPlace(null);
    setGoalPlace(null);
    setIsReset(true);
    setRestSpotModalOpen(false);
    setShowRouteList(false);
    setRouteList([]);
  };

  return (
    <div className="w-98 relative flex flex-col gap-3 bg-white px-8 py-6">
      {showRouteList && (
        <div
          className="absolute left-full top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-r-md border border-l-0 border-gray-200 bg-white shadow-lg"
          onClick={handleClickReset}
        >
          <span className="text-2xl text-gray-400">✖</span>
        </div>
      )}
      <div className=" py-15 px-15 flex flex-col">
        <InputSubmitContent
          place={startPlace}
          setPlace={setStartPlace}
          type={"start"}
          isReset={isReset}
          setShowRouteList={setShowRouteList}
          setRestSpotModalOpen={setRestSpotModalOpen}
          addPlaceHistory={addPlaceHistory}
        />
        <InputSubmitContent
          place={goalPlace}
          setPlace={setGoalPlace}
          type={"goal"}
          isReset={isReset}
          setShowRouteList={setShowRouteList}
          setRestSpotModalOpen={setRestSpotModalOpen}
          addPlaceHistory={addPlaceHistory}
        />
      </div>

      <div className="mb-3 mt-3 flex w-full justify-between">
        <button
          className="flex items-center rounded-md border border-gray-300 p-2 hover:shadow-md"
          onClick={handleClickReset}
        >
          <RestartIcon className="h-6 w-6" />
          <span className="text-sm text-gray-800 before:mr-2 before:font-semibold before:text-blue-600 ">
            다시입력
          </span>
        </button>
        <button
          className="flex items-center rounded-md border border-gray-300 p-2 hover:shadow-md"
          onClick={handleClickSearchRoutes}
        >
          <span className="text-sm font-semibold text-blue-600 after:ml-2 after:font-semibold ">
            길찾기
          </span>
          <RightIcon className="h-6 w-6" />
        </button>
      </div>

      {!hasStartAndGoal && (
        <div className="mt-3 flex justify-center">
          <p className="text-lg font-semibold text-red-600">출발지와 도착지를 모두 입력하세요!</p>
        </div>
      )}
    </div>
  );
};

export default InputSubmit;
