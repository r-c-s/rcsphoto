import React from 'react';
import RcsPhotoApi, { Album } from '../services/RcsPhotoApi'
import AlbumThumb from './AlbumThumb';
import PageHeader from './PageHeader';

interface Props {
  service: RcsPhotoApi;
  itemsPerRow: number;
}

interface State {
  albums: Album[];
}

class AlbumList extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }
  }

  componentDidMount = async () => {  
    document.title = 'Albums | RCS Photography';
    const albums = await this.props.service.getAlbums();
    this.setState({ albums });
  }

  render() {
    const { itemsPerRow } = this.props;
    const { albums } = this.state;

    return <div id="album-list">
      <div className="container" id="album-thumbs-container">
        <PageHeader title="Albums" lines={["by Raphael Corrêa"]}/>
        {  
          albums.map(album => <AlbumThumb album={album} albumsPerRow={itemsPerRow}/>)
        }
      </div>
    </div>;
  }
}

export default AlbumList;