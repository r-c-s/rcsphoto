
import React, { useEffect, useState } from 'react';
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

  const [ startTouchX, setStartTouchX ] = useState<number>();
  const [ lastTouchX, setLastTouchX ] = useState<number>();
  
  const selectBestSize = (image: Image) => {
    const size = Math.max(window.innerWidth, window.innerHeight);
    return size >  512 ? image.medium : image.small;
  }

  const handleTouchStart = (touchEvent: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchX(touchEvent.targetTouches[0].clientX);
  }

  const handleTouchMove = (touchMoveEvent: React.TouchEvent<HTMLDivElement>) => {
    setLastTouchX(touchMoveEvent.targetTouches[0].clientX);
  }

  const handleTouchEnd = (touchEvent: React.TouchEvent<HTMLDivElement>) => {
    const diff = lastTouchX - startTouchX;
    if (diff < -20) {
      onNext && onNext();
    } else if (diff > 20) {
      onPrevious && onPrevious();
    }
  }

  const handleKeyUp = ({ code }) => {
    if (code ===  'ArrowRight') {
      onNext && onNext();
    } else if (code === 'ArrowLeft') {
      onPrevious && onPrevious();
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [])

  return <div id="active-image">
    <div className="close-icon-container" onClick={onClose}>
      <FontAwesomeIcon icon={faTimes}/>
      <small>close</small>
    </div>
    <a className="download-icon-container" onClick={onClose} href={image.full} target="_blank">
      <FontAwesomeIcon icon={faDownload}/>
      <small>high-res</small>
    </a>
    <div 
      className="image-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
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