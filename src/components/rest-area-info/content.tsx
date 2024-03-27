import {
  NormalIcon,
  NatureIcon,
  CargoIcon,
  RestaurantIcon,
  GasStationIcon,
  PharmacyIcon,
  ElectricCarIcon,
  ToiletIcon,
} from "@/assets/icons";
import { RestAreaInfoContentPropsType } from "@/types";

const RestAreaInfoContent = ({
  type,
  restaurant,
  gasStation,
  electricCar,
  pharmacy,
  toilet,
  name,
  routeName,
  naverMapUrl,
}: RestAreaInfoContentPropsType) => {
  const typeMapping: {
    [key: string]: {
      restArea: JSX.Element;
    };
  } = {
    일반휴게소: {
      restArea: <NormalIcon className="h-8 w-14" />,
    },
    간이휴게소: {
      restArea: <NatureIcon className="h-6 w-14" />,
    },
    화물차휴게소: {
      restArea: <CargoIcon className="h-6 w-14" />,
    },
  };
  const Icon = typeMapping[type] || {
    icon: null,
  };
  const handleNameClick = () => {
    window.open(naverMapUrl, "_blank");
  };

  return (
    <div className="relative flex w-full gap-5 px-4 py-4">
      <div className="flex h-12 w-12 shrink-0 items-center rounded-full bg-gray-100 ">
        {Icon.restArea}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-between">
          <h1
            className="flex justify-center text-base font-semibold hover:text-blue-600"
            onClick={handleNameClick}
          >
            {name}
          </h1>
          <p className="text-sm text-gray-600">{routeName}</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className=" flex w-full">
            {restaurant && (
              <div className="border-r border-gray-300 pr-2">
                <RestaurantIcon className="h-4 w-4" />
              </div>
            )}
            {gasStation && (
              <div className="pr- border-r border-gray-300 px-2">
                <GasStationIcon className="h-4 w-4" />
              </div>
            )}
            {pharmacy && (
              <div className="border-r border-gray-300 px-2">
                <PharmacyIcon className="h-4 w-4" />
              </div>
            )}
            {toilet && (
              <div className="border-r border-gray-300 px-2">
                <ToiletIcon className="h-4 w-4" />
              </div>
            )}
            {electricCar && (
              <div className="px-2">
                <ElectricCarIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestAreaInfoContent;
