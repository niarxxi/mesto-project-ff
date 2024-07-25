import './pages/index.css';
import { createCard, deleteCard, handleCardLike } from './components/card.js'
import { openModal, closeModalClickOverlay, closeModal } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import { 
  getInitialCards, 
  getUserInfo, 
  editProfileInfo, 
  addNewCard, 
  deleteCardApi,
  updateAvatarApi
} from './components/api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfileContent = popupTypeEdit.querySelector('.popup__content');
const editProfileForm = editProfileContent.querySelector('.popup__form');
const nameInput = document.querySelector('#profile__name-input');
const jobInput = document.querySelector('#profile__description-input');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCardContent = popupTypeNewCard.querySelector('.popup__content');
const popupCardForm =  popupCardContent.querySelector('.popup__form');
const cardNameInput = document.querySelector('#card__place-name-input');
const imageUrlInput = document.querySelector('#card__link-input');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupEditAvatar = document.querySelector('.popup_type_avatar-edit');
const popupAvatarContent = popupEditAvatar.querySelector('.popup__content');
const popupAvatarForm = popupAvatarContent.querySelector('.popup__form');
const profileImageAvatar =  document.querySelector('.profile__image');
const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

let userId;

function handleCardDelete(cardId) {
  openModal(popupTypeDeleteCard); 
  const yesButton = document.querySelector('.popup__button_type_yes');
  yesButton.onclick = () => {
    deleteCardApi(cardId)
      .then(() => {
        const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
        if (cardElement) {
          cardElement.remove();
        }
        closeModal(popupTypeDeleteCard);
      })
      .catch(err => {
        console.error('Ошибка при удалении карточки:', err);
        closeModal(popupTypeDeleteCard);
      });
  }; 
}

function openPopupCardImage(cardData) {
  openModal(popupTypeImage);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
}

function editProfile() {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
}

profileImageAvatar.addEventListener('click', () => {
  openModal(popupEditAvatar)
  const avatarLink = popupAvatarForm.elements['avatar-link'];
  avatarLink.value = '';
  clearValidation(popupAvatarForm, validationConfig);
});

function updateAvatar(event) {
  event.preventDefault();
  const avatarLink = popupAvatarForm.elements['avatar-link'].value;
  const button = event.submitter;
  button.textContent = 'Сохранение...';
  updateAvatarApi(avatarLink)
    .then(updatedUser => {
      profileImageAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(popupEditAvatar);
      button.textContent = 'Сохранить';
    })
    .catch((error) => {
      console.error('Ошибка при изменения аватарки:', error);
      button.textContent = 'Сохранить';
    });
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const button = event.submitter;
  button.textContent = 'Сохранение...';
  editProfileInfo({
    name: nameInput.value,
    about: jobInput.value
  })
  .then(updatedUser => {
    profileTitle.textContent = updatedUser.name;
    profileDescription.textContent = updatedUser.about;
    closeModal(popupTypeEdit);
    button.textContent = 'Сохранить';
  })
  .catch(err => {
    console.error('Ошибка при редактировании профиля:', err);
    button.textContent = 'Сохранить';
  });
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const button = event.submitter;
  button.textContent = 'Сохранение...';
  addNewCard({
    name: cardNameInput.value,
    link: imageUrlInput.value
  })
  .then(newCard => {
    placesList.prepend(createCard({ 
      userId,
      cardData: newCard, 
      deleteCard: handleCardDelete, 
      likeCard: handleCardLike, 
      openPopupCardImage: openPopupCardImage 
    }));
    popupCardForm.reset();
    button.disabled = true; 
    button.classList.add(validationConfig.inactiveButtonClass);
    closeModal(popupTypeNewCard);
    button.textContent = 'Создать';
  })
  .catch(err => {
    console.error('Ошибка при добавлении карточки:', err);
    button.textContent = 'Создать';
  });
}

function setupPopupClose(buttonClose) {
  const popup = buttonClose.closest('.popup');
  buttonClose.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', closeModalClickOverlay);
  popup.classList.add('popup_is-animated');
}
popupCloseButtons.forEach(setupPopupClose);

profileEditButton.addEventListener("click", editProfile);
profileAddButton.addEventListener("click", () => { openModal(popupTypeNewCard); });

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
popupCardForm.addEventListener('submit', handleNewCardFormSubmit);
popupAvatarForm.addEventListener('submit', updateAvatar);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageAvatar.style.backgroundImage = `url(${userData.avatar})`;
    
    cards.forEach(card => {
      const newCard = createCard({ 
        userId, 
        cardData: card, 
        deleteCard: handleCardDelete, 
        likeCard: handleCardLike, 
        openPopupCardImage: openPopupCardImage 
      });
      placesList.appendChild(newCard);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });