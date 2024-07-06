import { useDebounce, useGetSearchPlace } from "@/hooks";
import { LocationIcon } from "@/assets/icons";
import { InputSubmitContentPropsType, SearchPlaceDataType } from "@/types";
import { ChangeEvent, useEffect, useState, MouseEvent, KeyboardEvent } from "react";

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
  place,
  setPlace,
  type,
  isReset,
  setShowRouteList,
  setRestSpotModalOpen,
  addPlaceHistory,
}: InputSubmitContentPropsType) => {
  const [placeholder, setPlaceholder] = useState<string>(inputType.placeholder[type]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [placeList, setPlaceList] = useState<SearchPlaceDataType[] | undefined>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const debouncedPlace = useDebounce(searchKeyword || "");
  const { refetch } = useGetSearchPlace({ searchTerm: debouncedPlace });
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    inputValue === "" ? setPlaceList([]) : setModalIsOpen(true);
    setSearchKeyword(inputValue);

    if (inputValue !== searchKeyword) {
      setShowRouteList(false);
      setRestSpotModalOpen(false);
      setPlace(null);
    }
  };

  const handleClickPlace = ({
    e,
    place,
  }: {
    e: MouseEvent<HTMLDivElement>;
    place: SearchPlaceDataType;
  }) => {
    e.stopPropagation();
    setPlace(place);
    setPlaceList([]);
    setModalIsOpen(false);
    addPlaceHistory(place);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!placeList || placeList.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prevIndex => (prevIndex + 1) % placeList.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(prevIndex => (prevIndex + placeList.length - 1) % placeList.length);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      const selectedPlace = placeList[highlightedIndex];
      setPlace(selectedPlace);
      setPlaceList([]);
      setModalIsOpen(false);
      addPlaceHistory(selectedPlace);
    }
  };

  // 초성일 때는 refetch 호출 X ex) 'ㄷ', 'ㅁ'
  const isSingleConsonant = (char: string) => {
    const koreanConsonantRange = /[\u3131-\u3163]/;

    return koreanConsonantRange.test(char);
  };

  useEffect(() => {
    !isSingleConsonant(debouncedPlace) && debouncedPlace
      ? refetch().then(res => setPlaceList(res.data))
      : setPlaceList([]);
  }, [debouncedPlace, refetch]);

  useEffect(() => {
    if (isReset) {
      setSearchKeyword("");
      setPlaceList([]);
      setModalIsOpen(false);
    }
  }, [isReset]);

  return (
    <div
      className="relative w-full"
      tabIndex={0} // Ensures the div is focusable
      onKeyDown={handleKeyDown} // Handles keyboard navigation
    >
      <input
        type="text"
        value={place?.name || searchKeyword || ""}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => {
          setPlaceholder(inputType.onFocus[type]);
          setModalIsOpen(true);
        }}
        onBlur={() => {
          setPlaceholder(inputType.placeholder[type]);
          setModalIsOpen(false);
        }}
        className={`h-10 w-80 border border-black p-4 placeholder-gray-400 placeholder-opacity-50 ${type === "start" ? "rounded-t border-t border-b-gray-200" : "rounded-b border-b border-t-0"}`}
      />

      {placeList && placeList.length > 0 && searchKeyword && modalIsOpen && (
        <div className="absolute z-50 w-80 rounded-b border border-black border-t-white bg-white">
          {placeList?.map((place, index) => (
            <div
              key={index}
              className={`flex w-full items-center gap-4 px-4 py-3 hover:bg-gray-300 hover:bg-opacity-30 ${
                highlightedIndex === index ? "bg-gray-200" : ""
              }`}
              onMouseDown={e => handleClickPlace({ e, place })}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter")
                  handleClickPlace({ e: e as unknown as MouseEvent<HTMLDivElement>, place });
              }}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSubmitContent;
