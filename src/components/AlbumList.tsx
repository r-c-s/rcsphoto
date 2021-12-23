import React, { useEffect, useState } from 'react';
import RcsPhotoApi, { Album } from '../services/RcsPhotoApi'
import AlbumThumb from './AlbumThumb';
import PageHeader from './PageHeader';

interface Props {
  service: RcsPhotoApi;
}

const getLoadingAlbums = (count: number): Album[] => {
  return Array.from(Array(count).keys())
    .map(i => ({
      id: undefined,
      sortOrder: undefined,
      name: undefined,
      images: undefined,
      coverImage: undefined
    }));
}

function AlbumList(props: Props) {

  const [ albums, setAlbums ] = useState<Album[]>(getLoadingAlbums(6));

  useEffect(() => {
    async function fetchAndSetAlbums() {
      document.title = 'Albums | RCS Photography';  
      const albums = await props.service.getAlbums();
      setAlbums(albums);
    }
    fetchAndSetAlbums();
  }, []);

  return <div id="album-list">
    <div className="container">
      <div className="album-thumbs-container">
        <PageHeader title="Albums" subtitle={"by Raphael Corrêa"}/>
        {  
          albums.map((album, i) => <AlbumThumb key={i} album={album}/>)
        }
      </div>
    </div>
  </div>;
}

export default AlbumList;