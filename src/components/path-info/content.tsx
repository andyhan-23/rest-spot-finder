import { PathInfoContentPropsType } from "@/types";

const PathInfoContent = ({ route, ranking }: PathInfoContentPropsType) => {
  const { duration, distance, tollFare, fuelPrice, optionText } = route;

  const convertTimeToHoursMinutes = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);

    return { hours, minutes };
  };

  const convertMeterToKilometer = (meters: number) => {
    const kilometers = meters / 1000;
    const kilometersWithoutDecimal = Math.floor(kilometers);

    return kilometersWithoutDecimal;
  };

  const tollInfo = tollFare === "0" ? "무료" : `${parseFloat(tollFare).toLocaleString()}원`;
  const formattedTime = convertTimeToHoursMinutes(Number(duration));
  const formattedDistance = convertMeterToKilometer(Number(distance));

  return (
    <div className="relative flex flex-col gap-2 px-8 py-6">
      <div className="flex gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-green-600 ${ranking < 0 && "hidden"}`}
        >
          <p className="text-white">{ranking + 1}</p>
        </span>
        <h1 className="font-bold text-green-600">{optionText}</h1>
      </div>
      <div className="flex items-end gap-2">
        <h2 className="flex items-end gap-1">
          {formattedTime.hours !== 0 && (
            <>
              <p className={`text-3xl font-bold`}>{formattedTime.hours}</p>
              <p className={`text-lg`}>시간</p>
            </>
          )}
          {formattedTime.minutes !== 0 && (
            <>
              <p className={`text-3xl font-bold`}>{formattedTime.minutes}</p>
              <p className={`text-lg`}>분</p>
            </>
          )}
        </h2>
        <div className="mb-1 h-5 w-[0.1rem] bg-gray-300" />
        <p className="font-bold">{formattedDistance}km</p>
      </div>
      <div className="flex items-center gap-2">
        <p>{`통행료 ${tollInfo}`}</p>
        <div className="mb-1 h-4 w-[0.1rem] bg-gray-300" />
        <p>{`연료비 ${parseFloat(fuelPrice).toLocaleString()}원`}</p>
      </div>
    </div>
  );
};

export default PathInfoContent;
