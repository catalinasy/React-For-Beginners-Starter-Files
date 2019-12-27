import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB35-m5EXonmR7eUmFBwP6bH14k9emNYkI",
    authDomain: "catch-of-the-day-2-6aeca.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-2-6aeca.firebaseio.com",    
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base