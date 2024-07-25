// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
function createCard({ userId, cardData, deleteCard, likeCard, openPopupCardImage }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const deleteElement = cardElement.querySelector('.card__delete-button');
  const likeElement = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  const isLiked = cardData.likes.some((like) => like._id === userId);
  
  if (isLiked) {
    likeElement.classList.add('card__like-button_is-active'); 
  }
  imageElement.setAttribute('src', cardData.link);
  imageElement.setAttribute('alt', cardData.name);
  imageElement.addEventListener('click', () => openPopupCardImage(cardData));
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  if (cardData.owner._id === userId) { 
    deleteElement.classList.add('card__delete-button_visible');
  } else {
    deleteElement.remove();
  }

  deleteElement.addEventListener('click', () => deleteCard(cardData._id));
  
  likeCountElement.textContent = cardData.likes.length;
  likeElement.addEventListener('click', (event) => likeCard(event, cardData._id, likeCountElement));

  cardElement.setAttribute('data-id', cardData._id);
  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(cardId) {
  handleCardDelete(cardId);
};

function likeCard(event, cardId, likeCountElement) {
  handleCardLike(event, cardId, likeCountElement);
}

export { createCard, deleteCard, likeCard }