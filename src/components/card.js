import { deleteCardApi, addLikeApi, deleteLikeApi } from './api.js';
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
  deleteCardApi(cardId)
    .then(() => {
      const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
    })
    .catch(err => {
      console.error('Ошибка при удалении карточки:', err);
    });
};

function handleCardLike(event, cardId, likeCountElement) {
  const isLiked = event.target.classList.contains('card__like-button_is-active');

  if (isLiked) {
    deleteLikeApi(cardId)
      .then(updatedCard => {
        event.target.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error('Ошибка при снятии лайка:', err));
  } else {
    addLikeApi(cardId)
      .then(updatedCard => {
        event.target.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error('Ошибка при постановке лайка:', err));
  }
}

export { createCard, deleteCard, handleCardLike }