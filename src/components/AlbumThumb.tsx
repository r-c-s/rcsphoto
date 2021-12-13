import { Link } from 'react-router-dom';
import { Album } from '../services/RcsPhotoApi';

interface Props {
  album: Album;
}

function AlbumThumb(props: Props) {
  const { album } = props;

  return <div className="card-container responsive-width">
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