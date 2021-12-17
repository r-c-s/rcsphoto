import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../services/RcsPhotoApi';
import LoadingText from './LoadingText';

interface Props {
  album: Album;
}

function AlbumThumb(props: Props) {
  const { album } = props;
  const [imageContainerHeight, setImageContainerHeight] = useState<number | string>();
  const [ready, setReady] = useState<boolean>();

  const setCoverImageContainerHeight = () => {
    const element = document.getElementsByClassName('card-image-container');
    const width = element[0].clientWidth;
    const height = 2 * width / 3;
    setImageContainerHeight(height);
  }

  useEffect(() => {
    setCoverImageContainerHeight();
    window.addEventListener('resize', setCoverImageContainerHeight);
    return () => {
       window.removeEventListener('resize', setCoverImageContainerHeight);
    }
  }, []);

  return <div className={`card-container item-responsive-width ${!album.id ? 'pointer-events-none' : ''}`}>
    <Link to={album.id ? `/albums/${album.id}` : '/'}>
      <div className="card">
        <div className="body">
          <div className="card-title">
            {
              album.name &&
              <div className="ellipsis">
                { album.name }
              </div>
            }
            {
              !album.name && <LoadingText chars={20}/>
            }
          </div>
        </div>
        <div className="card-image-container" style={{ height: imageContainerHeight }}>
          <img 
            className={`${ready ? 'image-ready' : 'image-not-ready'} card-image-bottom`} 
            src={album.coverImage} 
            onLoad={() => setReady(true)}/>
        </div>
      </div>
    </Link>
  </div>
}

export default AlbumThumb;