// import { updateProfile } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import {
  createUser, googleSignIn, getCurrentUser, saveDisplayName,
} from '../lib/firebaseServices.js';

export const register = () => {
  const sectionRegister = document.createElement('section');
  sectionRegister.className = 'sectionRegister';
  sectionRegister.innerHTML = `
        <figure class="register__figure">
            <!--<img src="https://imagizer.imageshack.com/img922/3091/JEOR6i.png" alt="illustration" class="register__illustration">-->
            <img src="https://imagizer.imageshack.com/img923/4224/CKf4zk.png" alt="illustration" class="register__illustration">
        </figure>
        <div class="register__container">
            <img src="https://imagizer.imageshack.com/img924/341/OKd1u8.png
            " alt="logo" class="register__logo">
            <h2 class="register__title">Create account</h2>
            <form action="" class="register__form" id="register__form-id">
            <label for="register__username">Username</label>
            <input id="register__username" type="text" required maxlength='20'>
            <label for="register__email">Email</label>
            <input id="register__email" type="email" required>
            <p class="error register__message-error" id="register__already-in-use-email">Email already in use</p>
            <p class="error register__message-error" id="register__invalid-email">Invalid email</p>
            <label for="register__password">Password</label>
            <input id="register__password" type="password" required minlength='8'>
            <button id="register__button-id" class="button register__button" type="submit">Create</button>
            </form>
            <p class="register__text">or</p>
            <button class="button register__button-google">
            <img class="register__logo-google" src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png
                " alt="logo-google">Sign in with Google
            </button>
            <p  class="register__text">Already have an account? <a href="#login">Log in</a></p>
        </div>
        `;

  const registerForm = sectionRegister.querySelector('#register__form-id');
  const registerUsername = sectionRegister.querySelector('#register__username');
  const registerEmail = sectionRegister.querySelector('#register__email');
  const registerPassword = sectionRegister.querySelector('#register__password');
  const registerErrorInvalid = sectionRegister.querySelector('#register__invalid-email');
  const registerErrorInUse = sectionRegister.querySelector('#register__already-in-use-email');

  registerForm.addEventListener('submit', (event) => {
    createUser(registerEmail.value, registerPassword.value)
      .then(() => {
        // const user = userCredential.user;
        const registerUsernameValue = registerUsername.value;
        // updateProfile(user, {
        // displayName: registerUsernameValue,
        // })
        saveDisplayName(registerUsernameValue)
          .then(() => {
            getCurrentUser();
          }).catch(() => {
          });

        window.location.hash = '#wall';
        registerForm.reset();
        registerUsername.value = '';
        registerErrorInUse.style.display = 'none';
        registerErrorInvalid.style.display = 'none';
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            registerErrorInUse.style.display = 'block';
            registerErrorInvalid.style.display = 'none';
            break;
          case 'auth/invalid-email':
            registerErrorInvalid.style.display = 'block';
            registerErrorInUse.style.display = 'none';
            break;
          default:
            registerErrorInvalid.style.display = 'none';
            registerErrorInUse.style.display = 'none';
            break;
        }
      });
    event.preventDefault();
  });

  const googleButton = sectionRegister.querySelector('.register__button-google');
  googleButton.addEventListener('click', () => {
    googleSignIn()
      .then(() => {
        window.location.hash = '#wall';
      })
      .catch(() => {
      });
  });

  return sectionRegister;
};
