import { LocationIcon } from "@/assets/icons";

const RecentSearch = () => {
  return (
    <div className="mt-12 w-96 bg-white px-8">
      <div>
        <h1 className="text-xm font-bold">최근 검색</h1>
        <hr className="mx-auto mt-3 w-80 border-gray-200" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <LocationIcon className="mr-2 mt-2" />
          <p className="mt-2 text-slate-800">가천대학교 글로벌 캠퍼스</p>
        </div>
        <div className="flex flex-row">
          <LocationIcon className="mr-2 mt-2" />
          <p className="mt-2 ">모란역</p>
        </div>
        <div className="flex flex-row">
          <LocationIcon className="mr-2 mt-2" />
          <p className="mt-2">판교역</p>
        </div>
        <div className="flex flex-row">
          <LocationIcon className="mr-2 mt-2" />
          <p className="mt-2">강남역</p>
        </div>
        <div className="flex flex-row">
          <LocationIcon className="mr-2 mt-2" />
          <p className="mt-2">잠실역</p>
        </div>
      </div>
    </div>
  );
};

export default RecentSearch;
