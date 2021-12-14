import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../services/RcsPhotoApi';

interface Props {
  album: Album;
}

function AlbumThumb(props: Props) {
  const { album } = props;
  const [imageContainerHeight, setImageContainerHeight] = useState<number | string>();
  const [ready, setReady] = useState<boolean>();

  useEffect(() => {
    if (!album.coverImage) {
      const element = document.getElementsByClassName('card-image-container');
      const width = element[0].clientWidth;
      const height = 2 * width / 3;
      setImageContainerHeight(height);
    } else {
      setImageContainerHeight('fit-content');
    }
  }, [ album ]);

  return <div className="card-container responsive-width">
    <Link to={album.id ? `/albums/${album.id}` : '/'}>
      <div className="card">
        <div className="body">
          <div className="card-title">
            <div className="ellipsis">
              { album.name }
            </div>
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