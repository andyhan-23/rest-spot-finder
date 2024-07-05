import { InputSubmitPropsType } from "@/types";
import { useEffect, useState } from "react";
import InputSubmitContent from "./content";
import { RestartIcon, PlusIcon, RightIcon } from "@/assets/icons";

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
    <div className="relative flex w-96 flex-col gap-3 bg-white px-8 py-6">
      <div className="flex w-full flex-col">
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
      <div className="flex w-full justify-between bg-white">
        <button
          className="flex items-center gap-2 rounded border border-gray-400 py-1.5 pl-2 pr-3 hover:bg-gray-300 hover:bg-opacity-30"
          onClick={handleClickReset}
        >
          <RestartIcon className="h-6 w-6" />
          <p>다시 입력</p>
        </button>
        <button
          className="flex items-center gap-2 rounded border border-gray-400 bg-green-600 py-1.5 pl-3 pr-1 text-white"
          onClick={handleClickSearchRoutes}
        >
          <p>길찾기</p>
          <RightIcon className="h-6 w-6" />
        </button>
      </div>
      {!hasStartAndGoal && (
        <div className=" flex justify-center  ">
          <h1 className="mt-3 font-bold text-red-600">출발지와 도착지를 모두 입력하세요!</h1>
        </div>
      )}
    </div>
  );
};

export default InputSubmit;
