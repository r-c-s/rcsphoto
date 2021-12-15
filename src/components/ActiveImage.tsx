
import { useState } from 'react';
import { Image } from '../services/RcsPhotoApi';
import { faChevronLeft, faChevronRight, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  image: Image;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

function ActiveImage(props: Props) {
  const { image, onClose, onNext, onPrevious } = props; 
  const [ready, setReady] = useState<boolean>();
  
  const selectBestSize = (image: Image) => {
    const size = Math.max(window.innerWidth, window.innerHeight);
    return size >  512 ? image.medium : image.small;
  }

  return <div id="active-image">
    <div className="close-icon-container" onClick={onClose}>
      <FontAwesomeIcon icon={faTimes}/>
      <small>close</small>
    </div>
    <a className="download-icon-container" onClick={onClose} href={image.full} target="_blank">
      <FontAwesomeIcon icon={faDownload}/>
      <small>high-res</small>
    </a>
    <div className="image-container">
      <div className={`nav-icon-container ${!onPrevious ? 'visibility-hidden' : ''}`} onClick={onPrevious}>
        <FontAwesomeIcon className="nav-icon" icon={faChevronLeft}/>
      </div>
      <img className={ready ? 'image-ready' : 'image-not-ready'} 
        src={selectBestSize(image)} 
        onLoad={() => setReady(true)}/>
      <div className={`nav-icon-container ${!onNext ? 'visibility-hidden' : ''}`}  onClick={onNext}>
        <FontAwesomeIcon className="nav-icon" icon={faChevronRight}/>
      </div>
    </div>
  </div>
}

export default ActiveImage;