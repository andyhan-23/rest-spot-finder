import { useGetSearchPlace } from "@/hooks";

const Title = () => {
  const searchTerm = "강남";
  const { data } = useGetSearchPlace({ searchTerm });
  console.log("data", data);
  return (
    <div className="relative flex h-20 w-96 items-center justify-center">
      <span className="text-3xl font-bold italic text-green-600">Rest Spot Finder</span>
    </div>
  );
};

export default Title;
