import React from 'react';
import RcsPhotoApi, { Album } from '../services/RcsPhotoApi'
import AlbumThumb from './AlbumThumb';
import PageHeader from './PageHeader';

interface Props {
  service: RcsPhotoApi;
}

interface State {
  albums: Album[];
}

class AlbumList extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      albums: this.getLoadingAlbums(6)
    }
  }

  componentDidMount = async () => {
    document.title = 'Albums | RCS Photography';  
    const albums = await this.props.service.getAlbums();
    this.setState({ albums });
  }

  render() {
    const { albums } = this.state;

    return <div id="album-list">
      <div className="container">
        <div className="album-thumbs-container">
          <PageHeader title="Albums" subtitle={"by Raphael Corrêa"}/>
          {  
            albums.map(album => <AlbumThumb album={album}/>)
          }
        </div>
      </div>
    </div>;
  }

  private readonly getLoadingAlbums = (count: number): Album[] => {
    return Array.from(Array(count).keys())
      .map(i => ({
        id: undefined,
        sortOrder: undefined,
        name: undefined,
        images: undefined,
        coverImage: undefined
      }));
  }
}

export default AlbumList;