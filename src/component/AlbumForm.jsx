import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {collection, addDoc} from "firebase/firestore";
import {db} from "../firebase";
import {toast} from "react-toastify";

const schema = z.object({
  album: z.string().nonempty("Album name is required"),
});

export default function AlbumForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleCreateNewAlbum = async formData => {
    const album = {
      album: formData.album,
      images: [],
    };
    await addDoc(collection(db, "albums"), album);
    reset();
    toast("New album created");
  };

  return (
    <>
      <div className="mb-8">
        <span className="text-3xl font-bold text-white">Create Album</span>
      </div>
      <form
        onSubmit={handleSubmit(handleCreateNewAlbum)}
        className="w-full sm:py-8 py-4 mb-12 lg:px-12 px-8 bg-white"
      >
        <div className="flex items-center flex-wrap justify-end">
          <div className="grow relative">
            <input
              {...register("album")}
              className=" my-4 py-2 md:px-4 px-2 outline-none shadow-lg text-rose-400 font-medium text-lg tracking-wider w-full"
              placeholder="Album name"
            />
            {errors?.album?.message && (
              <p className="absolute p-0 text-[10px] mt-[-16px] text-rose-500">
                {errors?.album?.message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={e => {
              reset();
            }}
            className="shadow-xl ms-4 my-4 tracking-widest text-lg text-black px-6 border-2 bg-white border-black  py-1 sm:py-2 md:px-14 px-4"
          >
            Clear
          </button>
          <button
            type="submit"
            className="shadow-xl ms-4 my-4 tracking-widest text-lg text-black px-6 border-2 bg-white border-black  py-1 sm:py-2 md:px-14 px-4"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
