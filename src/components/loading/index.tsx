import LOADING_ICON from "@/assets/loading.gif";
import { LoadingPropsType } from "@/types";

const Loading = ({ className }: LoadingPropsType) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <img src={LOADING_ICON} className="h-12 w-12" />
    </div>
  );
};

export default Loading;
