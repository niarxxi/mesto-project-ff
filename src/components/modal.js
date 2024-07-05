function openModal(popup) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener("keydown", closeModalEsc);
}

function closeModalClickOverlay(event) {
  if (event.target.classList.contains('popup'))
    closeModal(event.target);
}

function closeModalEsc(event) {
  if (event.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
}

function closeModal(popup) {
  document.removeEventListener("keydown", closeModalEsc); 
  popup.classList.remove('popup_is-opened');
}

export { openModal, closeModalClickOverlay, closeModal }