import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RcsPhotoApi, { Album, Image } from '../services/RcsPhotoApi';
import ActiveImage from './ActiveImage';
import PageHeader from './PageHeader';

interface Props {
  service: RcsPhotoApi;
  itemsPerRow: number;
}

function AlbumPage(props: Props) {
  const { service, itemsPerRow } = props;
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

  if (album) {
    return <div id="album-page">
      <div className="container">
        <PageHeader title={album.name} lines={[`${album.images.length} images`]}/>
        {
          activeImage &&
          <ActiveImage image={activeImage} onClose={() => setActiveImage(undefined)}/>
        }
        <div className="thumbs-container">
          {
            album.images.map(image => 
              <a className="thumb scale" style={{ width: `${100 / itemsPerRow}%` }} >
                <img src={image.thumb} onClick={() => setActiveImage(image)}/>
              </a>
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