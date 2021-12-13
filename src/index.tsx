import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  REACT_APP_IMAGE_BASE_URL: imageBaseUrl,
  REACT_APP_DATABASE: databaseName,
  REACT_APP_DB_CREDENTIALS
} = process.env;

const serviceConfig: ServiceConfig = {
  imageBaseUrl,
  databaseName,
  credentials: {
    "username": "24a901e8-b5e7-49ad-a6f2-6cda3a56cacc-bluemix",
    "password": "d469ac734851f7c24d885b9f1c6c0d466c24367354ca4761c58254096c8fff8b",
    "host": "24a901e8-b5e7-49ad-a6f2-6cda3a56cacc-bluemix.cloudant.com",
    "port": 443,
    "url": "https://24a901e8-b5e7-49ad-a6f2-6cda3a56cacc-bluemix:d469ac734851f7c24d885b9f1c6c0d466c24367354ca4761c58254096c8fff8b@24a901e8-b5e7-49ad-a6f2-6cda3a56cacc-bluemix.cloudant.com"
  }//JSON.parse(REACT_APP_DB_CREDENTIALS)
};

ReactDOM.render(
  <React.StrictMode>
    <App serviceConfig={serviceConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);