import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.Config';

const firebaseInit = ()=>{
    return initializeApp( firebaseConfig );
}

export default firebaseInit; 