import { useDebounce, useGetSearchPlace } from "@/hooks";
import { LocationIcon } from "@/assets/icons";
import { InputSubmitContentPropsType, SearchPlaceDataType } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";

const inputType = {
  placeholder: {
    start: "출발지 입력",
    goal: "도착지 입력",
  },
  onFocus: {
    start: "출발지를 입력하세요.",
    goal: "도착지를 입력하세요.",
  },
};

const InputSubmitContent = ({
  setPlace,
  type,
  isReset,
  setErrorModalOpen,
  setRouteListModalOpen,
  setRestSpotModalOpen,
}: InputSubmitContentPropsType) => {
  const [placeholder, setPlaceholder] = useState<string>(inputType.placeholder[type]);
  const [searchedPlace, setSearchedPlace] = useState<string>("");
  const [placeList, setPlaceList] = useState<SearchPlaceDataType[] | undefined>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const debouncePlace = useDebounce(searchedPlace || "");
  const { refetch } = useGetSearchPlace({ searchTerm: debouncePlace });

  const handleFocus = () => {
    setPlaceholder(inputType.onFocus[type]);
    setErrorModalOpen(false);
    setRouteListModalOpen(false);
    setRestSpotModalOpen(false);
  };
  const handleBlur = () => {
    setPlaceholder(inputType.placeholder[type]);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value === "" ? setPlaceList([]) : setModalIsOpen(true);
    setSearchedPlace(e.target.value);
  };
  const handleClickPlace = (place: SearchPlaceDataType) => {
    setPlace(place);
    setSearchedPlace(place.name);
    setPlaceList([]);
    setModalIsOpen(false);
  };
  useEffect(() => {
    debouncePlace ? refetch().then(res => setPlaceList(res.data)) : setPlaceList([]);
  }, [debouncePlace, refetch]);
  useEffect(() => {
    if (isReset) {
      setSearchedPlace("");
      setPlaceList([]);
      setModalIsOpen(false);
    }
  }, [isReset]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchedPlace}
        onChange={handleChange}
        className={`h-10 w-80 border border-black p-4 placeholder-gray-400 placeholder-opacity-50 ${type === "start" ? "rounded-t border-t border-b-gray-200" : "rounded-b border-b border-t-0"}`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {placeList && placeList.length > 0 && searchedPlace && modalIsOpen && (
        <div className="absolute z-50 w-80 rounded-b border border-black border-t-white bg-white">
          {placeList?.map((place, index) => (
            <div key={index}>
              <div
                className="flex w-full items-center gap-4 px-4 py-3 hover:bg-gray-300 hover:bg-opacity-30"
                onClick={() => handleClickPlace(place)}
              >
                <LocationIcon className="h-5 w-5 shrink-0" />
                <div className="flex w-full flex-col items-center gap-2">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm">{place.name}</p>
                    <p className="text-[0.7rem] text-gray-400">{place.category}</p>
                  </div>
                  <p className="w-full text-xs text-slate-600">{place.address}</p>
                </div>
              </div>
              {index !== placeList.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSubmitContent;
