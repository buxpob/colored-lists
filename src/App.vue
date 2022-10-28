<template>
  <div class="app">
    <div class="main">
      <div class="main__container">

        <lists-component :lists="lists" />

        <lists-info-component :lists="lists" />

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListsComponent from '@/components/ListsComponent.vue';
import ListsInfoComponent from './components/ListsInfoComponent.vue';

export default {
  components: { ListsComponent, ListsInfoComponent },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
    }),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  position: absolute;
  top: 0;
  min-height: 100%;
  min-width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  min-width: 300px;
  min-height: 300px;
  max-width: 1000px;
  padding: 30px;
}

.main__container {
  display: flex;
  justify-content: space-between;
  align-content: center;
  min-width: 100%;
  padding: 20px;
  border: 1px solid black;
}
</style>
