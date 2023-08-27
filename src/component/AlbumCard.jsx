import albumIcon from "../assets/images/album.jpg";

export default function AlbumCard({album, setCurrentAlbumId, setCreateAlbum}) {
  return (
    <div
      onClick={() => {
        setCurrentAlbumId(album?.id);
        // remove CreateAlbum compoenet when user clicked any album card
        setCreateAlbum(false);
      }}
      className="shadow-xl bg-white font-black text-rose-400 duration-500 items-center justify-center flex flex-col py-3 pb-1 rounded hover:bg-rose-300 hover:text-white hover:cursor-pointer"
    >
      <div className="bg-white p-2 rounded-full">
        <img src={albumIcon} className="w-20 rounded-full" />
      </div>
      <div className="text-lg font-medium tracking-wider w-full text-center">
        {album?.album}
      </div>
    </div>
  );
}
