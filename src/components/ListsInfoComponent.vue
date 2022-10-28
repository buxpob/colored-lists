<template>
    <ul class="lists-info">
      <li class="list-info" v-for="list in lists" :key="list.name">
        <div class="list-info__block">
          <h3>{{ list.name }}</h3>

          <button
            v-show="list.isVisible && list.isOpen"
            class="list-info__button"
            type="button"
            @click="setSort({ listId: list.id, bool: !list.isSort })">
            {{ list.isSort ? 'Перемешать' : 'Сортировать'}}
          </button>

        </div>

          <items-info-component
            :list="list"
            v-if="list.isOpen && list.isVisible"
          />

      </li>
    </ul>
</template>

<script>
import { mapMutations } from 'vuex';
import ItemsInfoComponent from './ItemsInfoComponent.vue';

export default {
  components: { ItemsInfoComponent },
  props: {
    lists: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      setSort: 'setSort',
      mixItemElements: 'mixItemElements',
    }),
  },
};
</script>

<style scoped>
.lists-info {
    list-style: none;
    padding: 20px;
    border: 1px solid black;
    min-width: 400px;
    max-width: 400px;
}

.list-info {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 15px;
}

.list-info__block {
  display: flex;
  justify-content: space-between;
}

.list-info__button {
  padding: 5px;
  background-color: rgb(57, 57, 245);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
