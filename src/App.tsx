import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';
import AlbumPage from './components/AlbumPage';
import AlbumList from './components/AlbumList';
import RcsPhotoApi, { ServiceConfig } from './services/RcsPhotoApi';
import './App.scss';

interface Props {
  serviceConfig: ServiceConfig
}

interface State {
  itemsPerRow: number;
}

export default class App extends React.Component<Props, State> {

  private readonly rcsPhotoApi;

  private resizeListener;

  constructor(props) {
    super(props);
    this.rcsPhotoApi = new RcsPhotoApi(this.props.serviceConfig);
    this.state = {
      itemsPerRow: 6
    }
  }

  componentDidMount() {
    this.resizeListener = window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  componentWillUnmount(): void {
      window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    const { itemsPerRow } = this.state;

    return <div id="rcs-photo">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<AlbumList service={this.rcsPhotoApi} itemsPerRow={itemsPerRow}/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage service={this.rcsPhotoApi} itemsPerRow={itemsPerRow}/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>;
  }


  private readonly handleResize = () => {
    const containerWidth = document.getElementsByClassName('container')[0].clientWidth;

    if (containerWidth) {
      let itemsPerRow;

      if      (containerWidth > 1200) itemsPerRow = 6;
      else if (containerWidth >  992) itemsPerRow = 5;
      else if (containerWidth >  768) itemsPerRow = 4;
      else if (containerWidth >  480) itemsPerRow = 3;
      else if (containerWidth >  320) itemsPerRow = 2;
      else                            itemsPerRow = 1;     

      this.setState({ itemsPerRow });
    }
  }
}
