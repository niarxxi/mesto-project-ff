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
const formElement = editProfileContent.querySelector('.popup__form');
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
const popupClose = document.querySelectorAll('.popup__close');

function editProfile() {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  placesList.prepend(createCard({ name: cardNameInput.value, link: imageUrlInput.value }, deleteCard, likeCard, popupCardImage));
  popupCardForm.reset();
  closeModal(popupTypeNewCard); 
}

function popupCardImage(event) {
  openModal(popupTypeImage);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.closest('.card').textContent;
  popupImageCaption.textContent = event.target.closest('.card').textContent;
}

function closeButton(buttonClose) {
  const popup = buttonClose.closest('.popup');
  buttonClose.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', closeModalClickOverlay);
  popup.classList.add('popup_is-animated');
}
popupClose.forEach(closeButton);

profileEditButton.addEventListener("click", editProfile);
profileAddButton.addEventListener("click", () => { openModal(popupTypeNewCard); });

formElement.addEventListener('submit', handleFormSubmit);
popupCardForm.addEventListener('submit', handleNewCardFormSubmit);

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardElement) {
  const newCard = createCard(cardElement, deleteCard, likeCard, popupCardImage);
  placesList.appendChild(newCard);
});