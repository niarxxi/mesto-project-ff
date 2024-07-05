import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openModal, closeModalClickOverlay, closeModal } from './components/modal.js'
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfileContent = popupTypeEdit.querySelector('.popup__content');
const editProfileForm = editProfileContent.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCardContent = popupTypeNewCard.querySelector('.popup__content');
const popupCardForm =  popupCardContent.querySelector('.popup__form');
const cardNameInput = popupCardContent.querySelector('.popup__input_type_card-name');
const imageUrlInput = popupCardContent.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');

function editProfile() {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  placesList.prepend(createCard({ name: cardNameInput.value, link: imageUrlInput.value }, deleteCard, likeCard, openPopupCardImage));
  popupCardForm.reset();
  closeModal(popupTypeNewCard); 
}

function openPopupCardImage(cardData) {
  openModal(popupTypeImage);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.alt;
  popupImageCaption.textContent = cardData.name;
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

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardElement) {
  const newCard = createCard(cardElement, deleteCard, likeCard, openPopupCardImage);
  placesList.appendChild(newCard);
});