import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { displayLoading, hideLoading } from './loader';

const firebaseConfig = {
  apiKey: 'AIzaSyDKC38c7pWddJzFZE7jy6eXesnVHdktZRs',
  authDomain: 'filmoteka-747fe.firebaseapp.com',
  projectId: 'filmoteka-747fe',
  storageBucket: 'filmoteka-747fe.appspot.com',
  messagingSenderId: '84233243918',
  appId: '1:84233243918:web:e4ffa3f7ab29091f229b5f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const authForm = document.querySelector('#authForm');
const secretContent = document.querySelector('#secretContent');
const signUpButton = document.querySelector('#signUpButton');
const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#signOutButton');

secretContent.style.display = 'none';

const userSignUp = async () => {
  const signUpEmail = userEmail.value;
  const signUpPassword = userPassword.value;
  displayLoading();
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then(userCredential => {
      const user = userCredential.user;
      console.log(user);
      hideLoading();
      alert('Your account has been created!');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      hideLoading();
    });
};

const userSignIn = async () => {
  const signInEmail = userEmail.value;
  const signInPassword = userPassword.value;
  displayLoading();
  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then(userCredential => {
      const user = userCredential.user;
      hideLoading();
      alert('You have signed in successfully!');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      hideLoading();
    });
};

const checkAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      authForm.style.display = 'none';
      secretContent.style.display = 'block';
    } else {
      authForm.style.display = 'block';
      secretContent.style.display = 'none';
    }
  });
};

const userSignOut = async () => {
  await signOut(auth);
};

checkAuthState();

signUpButton.addEventListener('click', userSignUp);
signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);

export { userSignUp, userSignIn, userSignOut };
