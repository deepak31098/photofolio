import {useEffect, useState} from "react";
import errorImage from "../assets/images/err.png";

export default function useImageSrc(url) {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  useEffect(() => {
    setCurrentImageUrl(url);
  }, [url]);

  const getDefaultImage = () => setCurrentImageUrl(errorImage);

  return {
    getDefaultImage,
    currentImageUrl,
  };
}
