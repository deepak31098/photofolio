import {useEffect, useState} from "react";
import AlbumForm from "../component/AlbumForm";
import AlbumCard from "../component/AlbumCard";
import {db} from "../firebase";
import {collection, onSnapshot} from "firebase/firestore";

export default function AlbumsList({currentAlbumId, setCurrentAlbumId}) {
  // create new album
  const [createAlbum, setCreateAlbum] = useState(false);
  // all albums
  const [albums, setAlbums] = useState(null);

  useEffect(() => getAlbums(), []);
  const getAlbums = () => {
    onSnapshot(collection(db, "albums"), snapshot => {
      const data = snapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      });
      setAlbums(data);
    });
  };

  // remove create album and all album list when any card is clicked
  return (
    <>
      {createAlbum && <AlbumForm />}
      {!currentAlbumId && (
        <div className="flex items-between justify-between">
          <span className="text-3xl font-bold text-white">
            {albums?.length === 0 ? "No Album" : "All Albums"}
          </span>
          <button
            onClick={() => {
              setCreateAlbum(!createAlbum);
            }}
            className="bg-[#000000] font-medium text-white px-6 border-0 tracking-widest"
          >
            {!createAlbum ? "Add Album" : "Cancel"}
          </button>
        </div>
      )}
      <section className="bg-[#FFFFFF] mt-8 sm:p-12 p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
        {albums?.map((album, index) => (
          <AlbumCard
            key={index}
            setCurrentAlbumId={setCurrentAlbumId}
            setCreateAlbum={setCreateAlbum}
            album={album}
          />
        ))}
      </section>
    </>
  );
}
// 93B1A6
// 5C8374
// #191944
