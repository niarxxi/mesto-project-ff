// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
function createCard(cardData, deleteCard, likeCard, popupCardImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const deleteElement = cardElement.querySelector('.card__delete-button');
  const likeElement = cardElement.querySelector('.card__like-button');
  imageElement.setAttribute('src', cardData.link);
  imageElement.setAttribute('alt', cardData.alt);
  imageElement.addEventListener('click', (event) => popupCardImage(event));
  cardElement.querySelector('.card__title').textContent = cardData.name;
  deleteElement.addEventListener('click', (event) => deleteCard(event));
  likeElement.addEventListener('click', (event) => likeCard(event));
  return cardElement;
};
// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.places__item').remove();
};

function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }