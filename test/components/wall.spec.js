import { wall, showOnePost } from '../../src/components/wall.js';
import {
  editPost, onGetPost, savePost, logOut, getCurrentUser, getPost,
} from '../../src/lib/firebaseServices.js';

jest.mock('../../src/lib/firebaseServices.js');

describe('welcome', () => {
  it('Comprueba que funciona el evento click de Google2', () => {
    wall();
    window.dispatchEvent(new Event('hashchange'));
    expect(onGetPost).toBeCalled();
  });

  // Amappola
  // it ('', () => {
  //   const view = wall();
  //   const likeButton = view.querySelector('.like-button-empty');
  //   window.dispatchEvent(new Event('hashchange'));
  //   likeButton.dispatchEvent(new Event('click'));
  //   expect(getPost).toBeCalled();
  // });

  it('Comprueba getPost', () => {
    const view = wall();
    const wallInputs = view.querySelector('.wall__inputs');
    window.dispatchEvent(new Event('hashchange'));
    expect(wallInputs.querySelector('.post__username').textContent).toBe('Nunito');
  });

  it('Comprueba que el botón add post funcione', () => {
    const view = wall();
    const addPostButton = view.querySelector('.wall__button-add');
    addPostButton.dispatchEvent(new Event('click'));
    expect(view.querySelector('.wall__modal-add-text').value).toBe('');
  });

  it('Comprueba que al darle a la x del modal de postear se cierre', () => {
    const view = wall();
    const modal = view.querySelector('.wall__container-add-post-modal');
    const closeModal = view.querySelector('.wall__modal-exit-button');
    closeModal.click();
    expect(modal.style.display).toBe('none');
  });

  it('Comprueba que al dar click al boton de post el text area esta vacio', () => {
    // jest.spyOn(window, 'alert').mockImplementation(() => {});
    window.alert = jest.fn();
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = '';
    postButton.click();

    expect(window.alert).toBeCalled();
  });

  it('Comprueba que al dar click al boton de post el text area tenga contenido y edit status sea false', () => {
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    postButton.click();
    expect(savePost).toBeCalled();
    expect(editPost).not.toBeCalled();
  });

  // A este caso no se ha podido acceder, ya que depende de que editStatus sea true
  it('Comprueba que al dar click al boton de post el text area tenga contenido y edit status sea true', () => {
    const view = wall();
    const postButton = view.querySelector('.wall__post-button');
    const textArea = view.querySelector('.wall__modal-add-text');
    textArea.value = 'hola';
    let editStatus;
    editStatus = true;
    postButton.click();
    expect(savePost).not.toBeCalled();
    expect(editPost).toBeCalled();
  });

  it('Comprueba que funciona el evento click de Log out con ícono', () => {
    window.confirm = () => true; // provide an implementation for window.confirm

    const view = wall();
    const iconLogOut = view.querySelector('.wall__logout-icon');
    iconLogOut.click();

    expect(logOut).toBeCalled();
  });

  it('Comprueba que funciona el evento click de Log out con texto', () => {
    window.confirm = () => true; // provide an implementation for window.confirm

    const view = wall();
    const textLogOut = view.querySelector('.wall__logout-text');
    textLogOut.click();

    expect(logOut).toBeCalled();
  });

  it ('Comprueba que se cierra el modal addPost al dar click por fuera', () => {
    const view = wall();
    const modalContainer = view.querySelector('.wall__container-add-post-modal');
    const wallInputs = view.querySelector('.wall__inputs');
    Event.target = modalContainer;
    window.onclick(Event);
    
    expect(wallInputs.style.display).toBe('flex');
  })
  
  // Falla porque es una lista de nodos
  it ('Comprueba que el botón de dar like funciona', () => {
    const view = wall();
    const wallInputs = view.querySelector('.wall__inputs');
    const likeButton = wallInputs.querySelectorAll('.like-button-empty');
    console.log(likeButton);
    likeButton[1].click();

    expect(getPost).toBeCalled();
  })
});
