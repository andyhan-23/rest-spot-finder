import { PathInfoContentPropsType } from "@/types";

const PathInfoContent = ({ route, ranking, clickedId }: PathInfoContentPropsType) => {
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
    <div className={`p-4 ${clickedId === ranking ? "border-y border-blue-200 bg-blue-50" : ""}`}>
      <div className="relative pl-7 text-sm font-extrabold tracking-tighter text-blue-700">
        {optionText}
        <span className="2w-6 absolute left-1 top-1/2 -translate-y-1/2 transform rounded-full bg-blue-500 pl-1.5 pr-2 font-semibold text-white">
          {ranking}
        </span>
      </div>
      <div className="mt-2 flex items-end">
        {formattedTime.hours !== 0 && (
          <p className="mx-1 text-xs font-bold text-gray-700">
            <span className="text-xl">{formattedTime.hours}</span>시간
          </p>
        )}
        {formattedTime.minutes !== 0 && (
          <p className="mx-1 text-xs font-bold text-gray-700">
            <span className="text-xl">{formattedTime.minutes}</span>분
          </p>
        )}
        <div className="mx-1 h-4 w-px border border-gray-200" />
        <span className="mx-1 text-xs font-bold text-gray-700">{formattedDistance}km</span>
      </div>
      <div className="mt-2 flex items-center">
        <p className="mx-1 text-sm tracking-tighter text-gray-700">통행료 {tollInfo}</p>
        <div className="mx-1 h-4 w-px border border-gray-200" />
        <p className="mx-1 text-sm tracking-tighter text-gray-700">
          연료비 {parseFloat(fuelPrice).toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default PathInfoContent;
