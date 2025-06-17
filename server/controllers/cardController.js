import {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
} from '../models/cardModel.js';

export const fetchCards = async (req, res) => {
  try {
    const cards = await getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения карточек' });
  }
};

export const addCard = async (req, res) => {
  const { label, link, image } = req.body;
  try {
    const id = await createCard({ label, link, image });
    res.status(201).json({ message: 'Карточка добавлена', id });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка добавления карточки' });
  }
};

export const editCard = async (req, res) => {
  const { id } = req.params;
  const { label, link, image } = req.body;
  try {
    await updateCard(id, { label, link, image });
    res.status(200).json({ message: 'Карточка обновлена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления карточки' });
  }
};

export const removeCard = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCard(id);
    res.status(200).json({ message: 'Карточка удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления карточки' });
  }
};
