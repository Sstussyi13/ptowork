import {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
} from '../models/cardModel.js';

export const fetchCards = (req, res) => {
  try {
    const cards = getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Ошибка получения карточек:', error);
    res.status(500).json({ message: 'Ошибка получения карточек' });
  }
};

export const addCard = (req, res) => {
  const { label, link, image } = req.body;
  try {
    const id = createCard({ label, link, image });
    res.status(201).json({ message: 'Карточка добавлена', id });
  } catch (error) {
    console.error('Ошибка добавления карточки:', error);
    res.status(500).json({ message: 'Ошибка добавления карточки' });
  }
};

export const editCard = (req, res) => {
  const { id } = req.params;
  const { label, link, image } = req.body;
  try {
    updateCard(id, { label, link, image });
    res.status(200).json({ message: 'Карточка обновлена' });
  } catch (error) {
    console.error('Ошибка обновления карточки:', error);
    res.status(500).json({ message: 'Ошибка обновления карточки' });
  }
};

export const removeCard = (req, res) => {
  const { id } = req.params;
  try {
    deleteCard(id);
    res.status(200).json({ message: 'Карточка удалена' });
  } catch (error) {
    console.error('Ошибка удаления карточки:', error);
    res.status(500).json({ message: 'Ошибка удаления карточки' });
  }
};
