const adaptListsToClient = (lists) => lists
  .map((list) => ({
    ...list,
    isOpen: false,
    isChecked: false,
    isDisabled: true,
    isSort: true,
    isVisible: false,
    isNotAllChecked: false,
    mixedItems: [],
    items: list.items.map((item) => ({
      ...item,
      isChecked: false,
    })),
  }));

export default adaptListsToClient;
