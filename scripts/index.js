// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.setAttribute('src', cardData.link);
  imageElement.setAttribute('alt', cardData.alt);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  return cardElement;
};
// @todo: Функция удаления карточки
function deleteCard(event) {
  const deleteElement = event.target.closest('.places__item');
  deleteElement.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardElement) {
  const newCard = createCard(cardElement, deleteCard);
  placesList.appendChild(newCard);
});