
import React, { useEffect, useState } from 'react';
import { Image } from '../services/RcsPhotoApi';
import { faChevronLeft, faChevronRight, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  startIndex: number;
  images: Image[];
  onClose: () => void;
}

type TransitionClass = 'transition-to-previous' | 'transition-to-next';

const minSwipeAmount = 20;

function ActiveImage(props: Props) {
  const { startIndex, images, onClose } = props; 

  const [ currentIndex, setCurrentIndex ] = useState<number>(startIndex);
  const [ mainIsReady, setMainIsReady ] = useState<boolean>(false);
  const [ previousIsReady, setPreviousIsReady ] = useState<boolean>(false);
  const [ nextIsReady, setNextIsReady ] = useState<boolean>(false);
  const [ startTouchX, setStartTouchX ] = useState<number>();
  const [ endTouchX, setEndTouchX ] = useState<number>();
  const [ transitionClass, setTransitionClass ] = useState<TransitionClass>();  

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  });

  useEffect(() => {
    setTransitionClass(undefined);

    const handleKeyUp = ({ code }) => {
      if (code ===  'ArrowRight') {
        handleClickNext();
      } else if (code === 'ArrowLeft') {
        handleClickPrevious();
      }
    }
  
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [ currentIndex, mainIsReady ]);
  const handleTouchStart = (touchEvent: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchX(touchEvent.targetTouches[0].clientX);
  }

  const handleTouchMove = (touchMoveEvent: React.TouchEvent<HTMLDivElement>) => {
    setEndTouchX(touchMoveEvent.targetTouches[0].clientX);
  }

  const handleTouchEnd = async () => {
    const diff = endTouchX - startTouchX;

    if (hasNext() && nextIsReady && diff < -minSwipeAmount) {
      setNextIsReady(false);
      setTransitionClass('transition-to-next');
      await waitForTransitionAnimation();
      incrementCurrIndex();
    } else if (hasPrevious() && previousIsReady && diff > minSwipeAmount) {
      setPreviousIsReady(false);
      setTransitionClass('transition-to-previous');
      await waitForTransitionAnimation();
      decrementCurrIndex();
    }
  }

  const handleClickNext = () => {
    if (mainIsReady) {
      setMainIsReady(false); 
      incrementCurrIndex();
    }
  }

  const handleClickPrevious = () => {
    if (mainIsReady) {
      setMainIsReady(false); 
      decrementCurrIndex();
    }
  }

  const hasNext = () => {
    return currentIndex < images.length - 1;
  }

  const hasPrevious = () => {
    return currentIndex > 0;
  }

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

  const waitForTransitionAnimation = () => {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  const selectBestSize = (image: Image) => {
    const size = Math.max(window.innerWidth, window.innerHeight);
    return size > 512 ? image.medium : image.small;
  }

  return <div id="active-image" 
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}>

    <a className="top-icon-container icon-left" href={images[currentIndex].full} target="_blank">
      <FontAwesomeIcon icon={faDownload}/>
      <small>high-res</small>
    </a>

    <div className="top-icon-container icon-right" onClick={onClose}>
      <FontAwesomeIcon icon={faTimes}/>
      <small>close</small>
    </div>

    <div className={`images-container ${transitionClass || ''}`}> 
      <div className="image-container">
        
        <div className={`nav-icon-container ${!hasPrevious() ? 'visibility-hidden' : ''}`} onClick={handleClickPrevious}>
          <FontAwesomeIcon className="nav-icon" icon={faChevronLeft}/>
        </div>

        <img className={mainIsReady ? 'image-ready' : 'image-not-ready'} 
          src={selectBestSize(images[currentIndex])} 
          onLoad={() => setMainIsReady(true)}/>

        <div className={`nav-icon-container ${!hasNext() ? 'visibility-hidden' : ''}`} onClick={handleClickNext}>
          <FontAwesomeIcon className="nav-icon" icon={faChevronRight}/>
        </div>
      </div>

      {
        hasNext() && 
        <div className="image-container next">
          <img src={selectBestSize(images[currentIndex + 1])} onLoad={() => setNextIsReady(true)}/>
        </div>
      }

      {
        hasPrevious() && 
        <div className="image-container previous">
          <img src={selectBestSize(images[currentIndex - 1])} onLoad={() => setPreviousIsReady(true)}/>
        </div>
      }
    </div>
  </div>;
}

export default ActiveImage;