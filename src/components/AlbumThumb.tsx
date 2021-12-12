import { Link } from 'react-router-dom';
import { Album } from '../services/RcsPhotoApi';

interface Props {
  album: Album;
  albumsPerRow: number;
}

function AlbumThumb(props: Props) {
  const { album, albumsPerRow } = props;

  return <div className="card-container" style={{ width: `${100 / albumsPerRow}%` }}>
    <Link to={`/albums/${album.id}`}>
      <div className="card">
        <div className="body">
          <div className="card-title">
            <div className="ellipsis">
              { album.name }
            </div>
          </div>
        </div>
        <img className="card-image-bottom" src={album.coverImage}/>
      </div>
    </Link>
  </div>
}

export default AlbumThumb;