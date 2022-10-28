import adaptListsToClient from '@/adapt';
import { createStore } from 'vuex';
import LISTS from '@/mock';
import { findList, findItem, mixItems } from '@/util';

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

      findItem(state, listId, itemId).quantity = Number((quantity).replace(/\b0+/g, ''));

      for (let i = 0; i < currentItem.quantity; i += 1) {
        const element = { color: currentItem.color, id: Math.random() };

        findList(state, listId).mixedItems.push(element);
      }

      findList(state, listId).mixedItems.sort(() => Math.random() - 0.5);
    },
    setColor(state, { listId, itemId, color }) {
      findItem(state, listId, itemId).color = color;
    },
    setItem(state, { listId, itemId, bool }) {
      mixItems(state, listId, itemId);
      findItem(state, listId, itemId).isChecked = bool;

      const listItems = findList(state, listId).items;
      findList(state, listId).isVisible = true;
      findList(state, listId).isNotAllChecked = true;

      if (listItems.every((item) => item.isChecked === true)) {
        findList(state, listId).isDisabled = false;
        findList(state, listId).isChecked = true;
        findList(state, listId).isNotAllChecked = false;
        return;
      }
      if (listItems.every((item) => item.isChecked === false)) {
        findList(state, listId).isDisabled = false;
        findList(state, listId).isChecked = false;
        findList(state, listId).isVisible = false;
        findList(state, listId).isNotAllChecked = false;
        return;
      }

      findList(state, listId).isChecked = false;
      findList(state, listId).isDisabled = true;
    },
    setAllItems(state, { listId, bool }) {
      findList(state, listId).isVisible = bool;
      const listItems = findList(state, listId).items;

      if (listItems.every((item) => (item.isChecked === false))) {
        findList(state, listId).items.forEach((item) => {
          for (let i = 0; i < item.quantity; i += 1) {
            const element = { color: item.color, id: Math.random() };

            findList(state, listId).mixedItems.push(element);
          }
        });

        findList(state, listId).mixedItems.sort(() => Math.random() - 0.5);
      }

      if (listItems.every((item) => (item.isChecked === true) || (item.isChecked === false))) {
        findList(state, listId).items = listItems
          .map(((item) => ({ ...item, isChecked: !item.isChecked })));
        findList(state, listId).isChecked = bool;
      }
    },
    removeElement(state, { listId, itemId }) {
      findItem(state, listId, itemId).quantity -= 1;
    },
    removeMixedItemsElement(state, { listId, color, el }) {
      findList(state, listId).items.filter((item) => item.color === color)[0].quantity -= 1;
      const index = findList(state, listId).mixedItems.findIndex((item) => item === el);
      findList(state, listId).mixedItems.splice(index, 1);
    },
    setSort(state, { listId, bool }) {
      findList(state, listId).isSort = bool;
      findList(state, listId).mixedItems.sort(() => Math.random() - 0.5);
    },
  },
});
