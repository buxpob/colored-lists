<template>
  <ul class="lists">
    <li class="list" v-for="list in lists" :key="list.id">
      <div class="list__review">

        <button
          type="button"
          class="list__button"
          :class="[list.isOpen ? 'list__button--active' : '']"
          @click="setIsOpen({ listId: list.id, bool: !list.isOpen })">
        </button>

        <label class="list__review-label" :for="list.name">
          <input
            type="checkbox"
            :class="[list.isNotAllChecked ? 'list__review-label--disabled' : '']"
            :disabled="list.isOpen ? list.isDisabled : true"
            :checked="list.isChecked"
            :name="list.name"
            :id="list.name"
            @change="setAllItems({ listId: list.id, bool: !list.isChecked })"
          >
          <span>{{ list.name }}</span>
        </label>

      </div>
      <div class="list__info" v-if="list.isOpen">

        <items-component :list="list" />

      </div>
    </li>
  </ul>
</template>

<script>

import ItemsComponent from '@/components/ItemsComponent.vue';
import { mapMutations } from 'vuex';

export default {
  components: { ItemsComponent },
  props: {
    lists: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'setIsOpen',
      setAllItems: 'setAllItems',
    }),
  },
};
</script>

<style scoped>
.lists {
  min-width: 310px;
  max-width: 600px;
  min-height: 600px;
  list-style: none;
  border: 1px solid black;
  padding: 20px;
  margin-right: 20px;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
}

.list__review {
  display: flex;
}

.list__info {
  padding-left: 40px;
}

.list__button {
  width: 20px;
  height: 20px;
  margin-right: 15px;
  background-image: url('../img/arrow-right.png');
  background-color: white;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
}

.list__button--active {
  background-image: url('../img/arrow-down.png');
}

.list__review-label>input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.list__review-label>span {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.list__review-label>span::before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid black;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.list__review-label>input:checked + span::before {
  background-size: 15px 15px;
  background-image: url('../img/mark.jpg');
}

.list__review-label--disabled + span::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 5px;
  width: 5px;
  height: 5px;
  background-color: black;
}
</style>
