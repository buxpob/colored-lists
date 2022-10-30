import { createStore } from 'vuex';
import LISTS from '@/mock';
import { findList, findItem, mixItems } from '@/util';
import adaptListsToClient from '@/adapt';

export default createStore({
  state: () => ({
    lists: adaptListsToClient(LISTS),
  }),
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
    },
    setIsOpen(state, { listId, bool }) {
      state.lists.find((list) => list.id === listId).isOpen = bool;
      state.lists.find((list) => list.id === listId).isDisabled = !bool;
    },
    setQuantity(state, { listId, itemId, quantity = 0 }) {
      const currentList = findList(state, listId);
      const currentItem = findItem(state, listId, itemId);

      currentList.mixedItems = currentList.mixedItems
        .filter((item) => item.color !== currentItem.color);

      currentItem.quantity = Number((quantity).replace(/\b0+/g, ''));

      for (let i = 0; i < currentItem.quantity; i += 1) {
        const element = { color: currentItem.color, id: Math.random() };

        currentList.mixedItems.push(element);
      }

      currentList.mixedItems.sort(() => Math.random() - 0.5);
    },
    setColor(state, { listId, itemId, color }) {
      const currentItem = findItem(state, listId, itemId);
      currentItem.color = color;
    },
    setItem(state, { listId, itemId, bool }) {
      const currentList = findList(state, listId);
      const currentItem = findItem(state, listId, itemId);
      const listItems = currentList.items;

      mixItems(state, listId, itemId);

      currentItem.isChecked = bool;
      currentList.isVisible = true;
      currentList.isNotAllChecked = true;

      if (listItems.every((item) => item.isChecked === true)) {
        currentList.isDisabled = false;
        currentList.isChecked = true;
        currentList.isNotAllChecked = false;
        return;
      }

      if (listItems.every((item) => item.isChecked === false)) {
        currentList.isDisabled = false;
        currentList.isChecked = false;
        currentList.isVisible = false;
        currentList.isNotAllChecked = false;
        return;
      }

      currentList.isChecked = false;
      currentList.isDisabled = true;
    },
    setAllItems(state, { listId, bool }) {
      const currentList = findList(state, listId);
      const listItems = currentList.items;

      currentList.isVisible = bool;

      if (listItems.every((item) => (item.isChecked === false))) {
        currentList.mixedItems = [];
        listItems.forEach((item) => {
          for (let i = 0; i < item.quantity; i += 1) {
            const element = { color: item.color, id: Math.random() };

            currentList.mixedItems.push(element);
          }
        });

        currentList.mixedItems.sort(() => Math.random() - 0.5);
      }

      if (listItems.every((item) => (item.isChecked === true) || (item.isChecked === false))) {
        findList(state, listId).items = listItems
          .map(((item) => ({ ...item, isChecked: !item.isChecked })));
        currentList.isChecked = bool;
      }
    },
    removeElement(state, { listId, itemId }) {
      const currentItem = findItem(state, listId, itemId);
      currentItem.quantity -= 1;
    },
    removeMixedItemsElement(state, { listId, color, el }) {
      const currentList = findList(state, listId);
      const index = currentList.mixedItems.findIndex((item) => item === el);

      currentList.items.filter((item) => item.color === color)[0].quantity -= 1;
      currentList.mixedItems.splice(index, 1);
    },
    setSort(state, { listId, bool }) {
      const currentList = findList(state, listId);

      currentList.isSort = bool;
      currentList.mixedItems.sort(() => Math.random() - 0.5);
    },
  },
});
