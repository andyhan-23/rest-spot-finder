import NAVER_LOGO from "@/assets/naver_logo.png";

const Logos = () => {
  return (
    <div className="relative bottom-0 left-0 top-0 border bg-white">
      <i className="naverLogo flex h-12 w-12">
        <img src={NAVER_LOGO} alt="naver_logo" />
      </i>
    </div>
  );
};

export default Logos;
