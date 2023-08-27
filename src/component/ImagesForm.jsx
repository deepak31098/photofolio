import {useEffect} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {doc, updateDoc, arrayUnion} from "firebase/firestore";
import {db} from "../firebase";
import {toast} from "react-toastify";

const schema = z.object({
  image: z.string().nonempty("Image name is required"),
  url: z.string().nonempty("Image URL is required"),
});

export default function ImagesForm({
  currEditImage,
  currentAlbumId,
  handleEdit,
  setCurrEditImage,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleCreateNewImage = async formData => {
    const imageRef = doc(db, "albums", currentAlbumId);
    if (!currEditImage) {
      await updateDoc(imageRef, {
        images: arrayUnion(formData),
      });
      toast("New image added");
    } else {
      handleEdit(formData);
      toast("Image details edited successfully");
    }
    reset();
  };

  useEffect(() => {
    if (currEditImage) {
      setValue("image", currEditImage.image); // Set image value
      setValue("url", currEditImage.url); // Set url value
    }
  }, [currEditImage, setValue]);

  return (
    <>
      <div className="mb-8">
        <span className="text-3xl font-bold text-white">
          {!currEditImage ? "Add Image" : "Edit Image"}
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handleCreateNewImage)}
        className="w-full sm:py-8 py-4 mb-12 lg:px-12 px-8 bg-white"
      >
        <div className="flex items-center flex-wrap justify-end">
          <div className="grow relative">
            <input
              {...register("image")}
              className=" my-4 py-2 md:px-4 px-2 outline-none shadow-lg text-rose-400 font-medium text-lg tracking-wider w-full"
              placeholder="Image name"
            />
            {errors?.image?.message && (
              <p className="absolute p-0 text-[10px] mt-[-10px] text-rose-500">
                {errors?.image?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-end">
          <div className="grow relative">
            <input
              {...register("url")}
              className=" my-4 py-2 md:px-4 px-2 outline-none shadow-lg text-rose-400 font-medium text-lg tracking-wider w-full"
              placeholder="Image URL"
            />
            {errors?.url?.message && (
              <p className="absolute p-0 text-[10px] mt-[-10px] text-rose-500">
                {errors?.url?.message}
              </p>
            )}
          </div>
        </div>
        <div className="text-end">
          <button
            type="button"
            onClick={e => {
              reset();
            }}
            className="shadow-xl ms-4 my-4 tracking-widest text-lg text-black px-6 border-2 bg-white border-black  py-1 sm:py-2 md:px-14 px-4"
          >
            Clear
          </button>
          {!!currEditImage && (
            <button
              type="button"
              onClick={e => setCurrEditImage(null)}
              className="shadow-xl ms-4 my-4 tracking-widest text-lg text-black px-6 border-2 bg-white border-black  py-1 sm:py-2 md:px-14 px-4"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="shadow-xl ms-4 my-4 tracking-widest text-lg text-black px-6 border-2 bg-white border-black  py-1 sm:py-2 md:px-14 px-4"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
