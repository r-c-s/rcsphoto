
import { useState } from 'react';
import { Image } from '../services/RcsPhotoApi';

interface Props {
  image: Image;
  onClose: () => void;
}

function ActiveImage(props: Props) {
  const { image, onClose } = props; 
  const [ready, setReady] = useState<boolean>();
  
  const selectBestSize = (image: Image) => {
    const size = Math.max(window.innerWidth, window.innerHeight);
    return size >  512 ? image.medium : image.small;
  }

  return <div id="active-image" onClick={onClose}>
    <div className="image-container">
      <img className={ready ? 'image-ready' : 'image-not-ready'} 
        src={selectBestSize(image)} 
        onLoad={() => setReady(true)}/>
    </div>
  </div>
}

export default ActiveImage;