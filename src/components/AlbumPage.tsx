import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RcsPhotoApi, { Album, Image } from '../services/RcsPhotoApi';
import ActiveImage from './ActiveImage';
import ImageThumb from './ImageThumb';
import PageHeader from './PageHeader';

interface Props {
  service: RcsPhotoApi;
}

function AlbumPage(props: Props) {
  const { service } = props;
  const { albumId } = useParams();
  const [ album, setAlbum ] = useState<Album>();
  const [ activeImage, setActiveImage ] = useState<Image>();

  useEffect(() => {
    async function fetchAndSetAlbum() {
      const album = await service.getAlbum(albumId);
      document.title = `${album.name} | RCS Photography`;
      setAlbum(album);
    }
    fetchAndSetAlbum();
  }, [ albumId ]);

  useEffect(() => {
    document.body.classList[activeImage ? 'add' : 'remove']('overflow-hidden');
  }, [ activeImage ]);

  const trySetActiveImage = (image: Image) => {
    if (image) {
      return () => setActiveImage(image);
    } else {
      return undefined;
    }
  }

  const findNext = () => {
    const { images } = album;
    const currentIndex = images.indexOf(activeImage);
    return currentIndex === images.length - 1 ? undefined : images[currentIndex + 1];
  }

  const findPrevious = () => {
    const { images } = album;
    const currentIndex = images.indexOf(activeImage);
    return currentIndex === 0 ? undefined : images[currentIndex - 1];
  }

  if (album) {
    return <div id="album-page">
      <div className="container">
        <PageHeader title={album.name} lines={[`${album.images.length} images`]}/>
        {
          activeImage &&
          <ActiveImage 
            key={JSON.stringify(activeImage)}
            image={activeImage} 
            onClose={() => setActiveImage(undefined)}
            onNext={trySetActiveImage(findNext())}
            onPrevious={trySetActiveImage(findPrevious())}/>
        }
        <div className="thumbs-container">
          {
            album.images.map(image => 
              <ImageThumb image={image} onClick={() => setActiveImage(image)}/>
            )
          }
        </div>
      </div>
    </div>;
  } else {
    return <></>;
  }
}

export default AlbumPage;