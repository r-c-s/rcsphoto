
import { useEffect, useState } from 'react';
import { Image } from '../services/RcsPhotoApi';

interface Props {
  image?: Image;
  onClick: () => void;
}

function ImageThumb(props: Props) {
  const { image, onClick } = props; 
  
  const [ready, setReady] = useState<boolean>();
  const [ placeholderHeight, setPlaceholderHeight ] = useState<number>();

  useEffect(() => {
    const width = document.getElementsByClassName("image-placeholder")[0]?.clientWidth;
    if (width) {
      const landscape = 2 * width / 3;
      const height = landscape;
      setPlaceholderHeight(height);
    }
  });

  return <a className="image-thumb-container animate-scale item-responsive-width">
    {
      image.thumb &&
      <img 
        className={ready ? 'image-ready' : 'image-not-ready'} 
        src={image.thumb} 
        onClick={onClick} 
        onLoad={() => setReady(true)}/>
    }
    {
      !image.thumb &&
      <div className="image-placeholder" style={{ height: placeholderHeight }}/>
    }
  </a>
}

export default ImageThumb;