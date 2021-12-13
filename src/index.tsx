import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  REACT_APP_IMAGE_BASE_URL: imageBaseUrl,
  REACT_APP_DB_CREDENTIALS
} = process.env;

const serviceConfig: ServiceConfig = {
  imageBaseUrl,
  credentials: JSON.parse(REACT_APP_DB_CREDENTIALS)
};

document.title = 'RCS Photography';

ReactDOM.render(
  <React.StrictMode>
    <App serviceConfig={serviceConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);