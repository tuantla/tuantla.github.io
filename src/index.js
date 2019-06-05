import {App} from '$components/components'
import ReactDOM from 'react-dom'
import React from 'react'
import './css/app.scss'

const appRoot = document.getElementById('appRoot')
appRoot ? ReactDOM.render((
        <App />
), appRoot): false

