import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Firebase from 'firebase'; //lo importamos nosotros despues de aplicar el comando npm install --save firebase
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//agregamos nuestro metodo de firebase
// Integramos firebase con nuestra aplicacion react, es en este arhivo por que es qe inicia
Firebase.initializeApp({
	apiKey: "AIzaSyBsoJJDPHnn649JcByiGfC279TL_CahYXo",
    authDomain: "pseudogram-7d743.firebaseapp.com",
    databaseURL: "https://pseudogram-7d743.firebaseio.com",
    projectId: "pseudogram-7d743",
    storageBucket: "pseudogram-7d743.appspot.com",
    messagingSenderId: "837392570943"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
