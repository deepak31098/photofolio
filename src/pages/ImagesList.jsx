import {useEffect, useState} from "react";
import ImagesForm from "../component/ImagesForm";
import back from "../assets/images/back.png";
import ImageCard from "../component/ImageCard";
import FullScreenImage from "../component/FullScreenImage";
import {doc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

export default function AllImageImages({setCurrentAlbumId, currentAlbumId}) {
  // create new image
  const [createImage, setCreateImage] = useState(false);
  // current image in full screen
  const [currentImage, setCurrentImage] = useState(null);
  // state for changing page
  const [index, setIndex] = useState(0);
  // edit state
  const [currEditImage, setCurrEditImage] = useState(null);
  // all images in doc
  const [images, setImages] = useState(null);

  const handleFullImage = index => {
    setCurrentImage(images[index].url);
    setIndex(index);
  };

  // function for changing image in full screen
  const handleChangeImage = step => {
    if (step === 0) setCurrentImage(null);
    else setCurrentImage(images[index + step].url);
    setIndex(index + step);
  };

  const handleEdit = formData => {
    let newImageList = images;
    newImageList[index] = formData;
    updateImageInDoc(newImageList);
  };

  // get all images in the currently clicked document
  useEffect(() => {
    onSnapshot(doc(db, "albums", currentAlbumId), doc => {
      setImages(doc.data().images);
    });
  }, []);

  const handleDelete = index => {
    let newImageList = images;
    newImageList.splice(index, 1);
    updateImageInDoc(newImageList);
  };

  const updateImageInDoc = async newList => {
    const albumRef = doc(db, "albums", currentAlbumId);
    await updateDoc(albumRef, {
      images: newList,
    });
    setImages(newList);
  };

  useEffect(() => {
    console.log(images);
  });

  return (
    <>
      {currentImage && (
        <FullScreenImage
          url={currentImage}
          handleChangeImage={handleChangeImage}
          length={images.length}
          index={index}
        />
      )}
      {(createImage || currEditImage) && (
        <ImagesForm
          currEditImage={currEditImage}
          currentAlbumId={currentAlbumId}
          handleEdit={handleEdit}
          setCurrEditImage={setCurrEditImage}
        />
      )}
      <div className="flex items-between justify-between">
        <div className="flex items-center">
          <img
            onClick={() => {
              setCurrentAlbumId(null);
            }}
            src={back}
            className="h-8 w-8 cursor-pointer"
          />
          <span className="text-3xl font-bold ms-4 text-white">
            {/* change text based on availability of image */}
            {images?.length !== 0 ? "All Images" : "No Image"}
          </span>
        </div>
        {!currEditImage && (
          <button
            onClick={() => {
              setCreateImage(!createImage);
            }}
            className=" font-medium text-white bg-black px-6 border-0 tracking-widest"
          >
            {!createImage ? "Add Image" : "Cancel"}
          </button>
        )}
      </div>
      <section className="bg-white mt-8 sm:p-12 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
        {images?.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            handleFullImage={handleFullImage}
            setCurrEditImage={setCurrEditImage}
            handleDelete={handleDelete}
            index={index}
            setIndex={setIndex}
          />
        ))}
      </section>
    </>
  );
}
