import {Delete, Edit} from "./Icons";
import useImageSrc from "../hooks/useImageSrc";

export default function ImageCard({
  handleFullImage,
  setIndex,
  index,
  setCurrEditImage,
  handleDelete,
  image,
}) {
  const {getDefaultImage, currentImageUrl} = useImageSrc(image.url);

  return (
    <div className="relative group/item bg-white text-rose-400 font-black duration-500 shadow-lg items-center justify-center flex flex-col p-2 pb-1 rounded hover:bg-rose-300 hover:text-white hover:cursor-pointer">
      <img
        src={currentImageUrl}
        onError={getDefaultImage}
        className="w-full h-32"
        onClick={() => {
          handleFullImage(index);
        }}
      />

      <div className="text-lg font-medium tracking-wider w-full text-center">
        {image.image}
      </div>
      <div
        onClick={() => handleDelete(index)}
        className="absolute invisible group-hover/item:visible cursor-pointer top-0 right-0 mt-[-12px] mr-[-12px] bg-white text-black border-[3px] border-black hover:text-white hover:bg-black font-weight flex items-center justify-center h-10 w-10 rounded-full duration-200"
      >
        <Delete />
      </div>
      <div
        onClick={() => {
          setCurrEditImage(image);
          setIndex(index);
        }}
        className="absolute cursor-pointer invisible group-hover/item:visible top-0 right-[50px] mt-[-12px] mr-[-12px] bg-white text-black border-[3px] border-black hover:text-white hover:bg-black font-weight flex items-center justify-center h-10 w-10 rounded-full duration-200"
      >
        <Edit />
      </div>
    </div>
  );
}
