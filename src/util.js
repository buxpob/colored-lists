const findList = (state, listId) => state.lists.find((list) => list.id === listId);

const findItem = (state, listId, itemId) => state.lists
  .find((list) => list.id === listId).items
  .find((item) => item.id === itemId);

const mixItems = (state, listId, itemId) => {
  const currentItem = findItem(state, listId, itemId);
  if (currentItem.isChecked) {
    findList(state, listId).mixedItems = findList(state, listId).mixedItems
      .filter((item) => item.color !== currentItem.color);
    return;
  }

  for (let i = 0; i < currentItem.quantity; i += 1) {
    const element = { color: currentItem.color, id: Math.random() };

    findList(state, listId).mixedItems.push(element);
  }
};

export { findList, findItem, mixItems };
