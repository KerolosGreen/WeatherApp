import React from 'react';
import ReactDOM , {createRoot} from 'react-dom/client';
import axios from 'axios';
import App from './components/App';
import './index.css';

const container = document.getElementById('root');
const root =  createRoot(container);

root.render(<App/>);