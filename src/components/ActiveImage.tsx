
import React, { useEffect, useState } from 'react';
import { Image } from '../services/RcsPhotoApi';
import { faChevronLeft, faChevronRight, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  startIndex: number;
  images: Image[];
  onClose: () => void;
}

function ActiveImage(props: Props) {
  const { startIndex, images, onClose } = props; 

  const [ currentIndex, setCurrentIndex ] = useState<number>(startIndex);
  const [ ready, setReady ] = useState<boolean>();
  const [ startTouchX, setStartTouchX ] = useState<number>();
  const [ lastTouchX, setLastTouchX ] = useState<number>();
  const [ touchEndClass, setTouchEndClass ] = useState<string>();  
  const [ allowTouch, setAllowTouch ] = useState<boolean>(true);

  useEffect(() => {
    setTouchEndClass(undefined);
    setAllowTouch(true);

    const handleKeyUp = ({ code }) => {
      if (code ===  'ArrowRight') {
        incrementCurrIndex();
      } else if (code === 'ArrowLeft') {
        decrementCurrIndex();
      }
    }
  
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [ currentIndex ]);

  const incrementCurrIndex = () => {
    if (hasNext()) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const decrementCurrIndex = () => {
    if (hasPrevious()) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const handleTouchStart = (touchEvent: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchX(touchEvent.targetTouches[0].clientX);
  }

  const handleTouchMove = (touchMoveEvent: React.TouchEvent<HTMLDivElement>) => {
    setLastTouchX(touchMoveEvent.targetTouches[0].clientX);
  }

  const handleTouchEnd = async () => {
    if (allowTouch) {
      const diff = lastTouchX - startTouchX;
      if (hasNext() && diff < -20) {
        setAllowTouch(false);
        setTouchEndClass('finished-next');
        await waitForTransitionAnimation();
        incrementCurrIndex();
      } else if (hasPrevious() && diff > 20) {
        setAllowTouch(false);
        setTouchEndClass('finished-previous');
        await waitForTransitionAnimation();
        decrementCurrIndex();
      }
    }
  }

  const waitForTransitionAnimation = () => {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  const isMobile = () => {
    return window.innerWidth < 512;
  }
  
  const selectBestSize = (image: Image) => {
    const size = Math.max(window.innerWidth, window.innerHeight);
    return size >  512 ? image.medium : image.small;
  }

  const hasNext = () => {
    return currentIndex < images.length - 1;
  }

  const hasPrevious = () => {
    return currentIndex > 0;
  }

  return <div id="active-image">
    <a className="top-icon-container icon-left" href={images[currentIndex].full} target="_blank">
      <FontAwesomeIcon icon={faDownload}/>
      <small>high-res</small>
    </a>

    <div className="top-icon-container icon-right" onClick={onClose}>
      <FontAwesomeIcon icon={faTimes}/>
      <small>close</small>
    </div>

    <div className={`images-container ${touchEndClass || ''}`}> 
      <div className="image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        
        <div className={`nav-icon-container ${!hasPrevious() ? 'visibility-hidden' : ''}`} onClick={decrementCurrIndex}>
          <FontAwesomeIcon className="nav-icon" icon={faChevronLeft}/>
        </div>

        <img className={ready ? 'image-ready' : 'image-not-ready'} 
          src={selectBestSize(images[currentIndex])} 
          onLoad={() => setReady(true)}/>

        <div className={`nav-icon-container ${!hasNext() ? 'visibility-hidden' : ''}`} onClick={incrementCurrIndex}>
          <FontAwesomeIcon className="nav-icon" icon={faChevronRight}/>
        </div>
      </div>

      {
        isMobile() && hasNext() && 
        <div className="image-container next">
          <img src={selectBestSize(images[currentIndex + 1])}/>
        </div>
      }

      {
        isMobile() && hasPrevious() && 
        <div className="image-container previous">
          <img src={selectBestSize(images[currentIndex - 1])}/>
        </div>
      }
    </div>
  </div>;
}

export default ActiveImage;