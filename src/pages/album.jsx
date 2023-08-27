import {useState} from "react";
import ImagesList from "./ImagesList";
import AlbumsList from "./AlbumsList";

export default function Album() {
  // active album
  const [currentAlbumId, setCurrentAlbumId] = useState(null);

  return (
    <main className="lg:px-32 md:px-24 md:px-8 px-2 py-8 bg-rose-300 grow">
      {!currentAlbumId ? (
        <AlbumsList
          setCurrentAlbumId={setCurrentAlbumId}
          currentAlbumId={currentAlbumId}
        />
      ) : (
        <ImagesList
          setCurrentAlbumId={setCurrentAlbumId}
          currentAlbumId={currentAlbumId}
        />
      )}
    </main>
  );
}
