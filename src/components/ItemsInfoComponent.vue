<template>
  <div
    v-show="list.isSort"
    class="item"
    v-for="item in list.items"
    :class="[item.isChecked ? '' : 'item--hidden']"
    :key="item.name">
    <div class="item__container">

      <button
        class="item__element"
        v-for="element in item.quantity"
        :key="element + 1"
        :style="{ 'background-color': `${item.color}` }"
        @click="removeElement({ listId: list.id, itemId: item.id })">
      </button>

    </div>
  </div>

  <div
    v-show="!list.isSort"
    class="item">

    <button
      class="item__element"
      v-for="element in list.mixedItems"
      :key="element.id"
      :style="{ 'background-color': `${element.color}` }"
      @click="removeMixedItemsElement({ listId: list.id, color: element.color, el: element })">
    </button>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      removeElement: 'removeElement',
      removeMixedItemsElement: 'removeMixedItemsElement',
    }),
  },
};
</script>

<style scoped>
.item {
  font-size: 0;
  line-height: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: 7px;
}

.item--hidden {
  display: none;
}

.item__element {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 1px;
  border: none;
  cursor: pointer;
}
</style>
