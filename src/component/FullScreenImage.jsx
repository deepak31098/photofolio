import useImageSrc from "../hooks/useImageSrc";

export default function FullScreenImage({
  url,
  handleChangeImage,
  length,
  index,
}) {
  const {getDefaultImage, currentImageUrl} = useImageSrc(url);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#3c3d3c73] flex items-center justify-center z-20">
      <div className="h-3/5 w-2/5 relative">
        <img
          src={currentImageUrl}
          className="w-full h-full"
          alt="uploaded-image"
          onError={getDefaultImage}
        />
        <div
          onClick={() => {
            handleChangeImage(0);
          }}
          className="absolute cursor-pointer top-0 right-0 text-black mt-[-12px] mr-[-12px] bg-white duration-500 hover:bg-rose-300 hover:text-white font-weight flex items-center justify-center h-12 w-12 rounded-full"
        >
          x
        </div>
        {index < length - 1 && (
          <div
            onClick={() => {
              handleChangeImage(+1);
            }}
            className="h-12 w-12 absolute cursor-pointer font-extrabold top-1/2 right-[-40px] text-black mt-[-12px] mr-[-12px] bg-white duration-500 hover:bg-rose-300 hover:text-white font-weight flex items-center justify-center h-10 w-10 rounded-full"
          >
            <span> &gt;</span>
          </div>
        )}
        {index > 0 && (
          <div
            onClick={() => {
              handleChangeImage(-1);
            }}
            className="h-12 w-12 absolute cursor-pointer top-1/2 left-[-52px] font-extrabold text-black mt-[-12px] mr-[-12px] bg-white duration-500 hover:bg-rose-300 hover:text-white font-weight flex items-center justify-center h-10 w-10 rounded-full"
          >
            <span> &lt;</span>
          </div>
        )}
      </div>
    </div>
  );
}
