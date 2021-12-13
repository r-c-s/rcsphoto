
import { useState } from 'react';
import { Image } from '../services/RcsPhotoApi';

interface Props {
  image: Image;
  onClick: () => void;
}

function ImageThumb(props: Props) {
  const { image, onClick } = props; 
  const [ready, setReady] = useState<boolean>();

  return <a className="thumb scale responsive-width">
    <img 
      className={ready ? 'image-ready' : 'image-not-ready'} 
      src={image.thumb} 
      onClick={onClick} 
      onLoad={() => setReady(true)}/>
  </a>
}

export default ImageThumb;