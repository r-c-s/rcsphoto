import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RcsPhotoApi, { Album } from '../services/RcsPhotoApi';
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
  const [ activeImageIndex, setActiveImageIndex ] = useState<number>();

  useEffect(() => {
    async function fetchAndSetAlbum() {
      const album = await service.getAlbum(albumId);
      document.title = `${album.name} | RCS Photography`;
      setAlbum(album);
    }
    fetchAndSetAlbum();
  }, [ albumId ]);

  useEffect(() => {
    document.body.classList[activeImageIndex ? 'add' : 'remove']('overflow-hidden');
  }, [ activeImageIndex ]);

  return <div id="album-page">
    <div className="container">
      <PageHeader title={album?.name} subtitle={album ? `${album.images.length} images` : undefined}/>
      {
        activeImageIndex !== undefined &&
        <ActiveImage 
          startIndex={activeImageIndex} 
          images={album.images}
          onClose={() => setActiveImageIndex(undefined)}/>
      }
      <div className="thumbs-container">
        {
          album?.images.map((image, i) => 
            <ImageThumb image={image} onClick={() => setActiveImageIndex(i)}/>
          )
        }
      </div>
    </div>
  </div>;
}

export default AlbumPage;