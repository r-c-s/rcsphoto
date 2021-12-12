import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  REACT_APP_IMAGE_BASE_URL: imageBaseUrl,
  REACT_APP_DATABASE: databaseName,
  VCAP_SERVICES
} = process.env;

const serviceConfig: ServiceConfig = {
  imageBaseUrl,
  databaseName,
  credentials: JSON.parse(VCAP_SERVICES).cloudantNoSQLDB.credentials
};

ReactDOM.render(
  <React.StrictMode>
    <App serviceConfig={serviceConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);