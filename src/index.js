import {App} from '$components/components'
import {createRoot} from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import {default as TopNav} from '$components/app/top-nav'

import './css/app.scss'
import React from "react";

const appRoot = createRoot(document.getElementById('appRoot'))
appRoot.render(
    <React.StrictMode>
      <HashRouter>
        <TopNav/>
        <App/>
      </HashRouter>
    </React.StrictMode>)

