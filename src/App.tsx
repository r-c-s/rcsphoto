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

  constructor(props) {
    super(props);
    this.rcsPhotoApi = new RcsPhotoApi(this.props.serviceConfig);
    this.state = {
      itemsPerRow: 6
    }
  }

  render() {
    const { itemsPerRow } = this.state;

    return <div id="rcs-photo">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<AlbumList service={this.rcsPhotoApi}/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage service={this.rcsPhotoApi}/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>;
  }
}
