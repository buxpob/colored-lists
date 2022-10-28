<template>
  <ul class="items">
    <li class="item" v-for="item in list.items" :key="item.name">

      <label class="item__name-label" :for="list.name + '' + item.name">
        <input
          type="checkbox"
          :name="list.name + '' + item.name"
          :id="list.name + '' + item.name"
          :checked="item.isChecked"
          @change="setItem(
          { listId: list.id,
            itemId: item.id,
            bool: $event.target.checked
          })"
        >
        <span>{{ item.name }}</span>
      </label>

      <div class="item__quantity">

        <label :for="item.quantity">
          <input
            class="item__quantity-input"
            type="number"
            min="0"
            :value="item.quantity"
            @change="setQuantity(
            { listId: list.id,
              itemId: item.id,
              quantity: $event.target.value = $event.target.value.replace(/\b0+/g, '')
            })"
            @keypress="keyPress($event)"
            :name="item.quantity"
            :id="item.name"
            required="true"
          >
        </label>

        <label :for="item.color">
          <input
            class="item__color-input"
            type="color"
            :value="item.color"
            @change="setColor(
            { listId: list.id,
              itemId: item.id,
              color: $event.target.value
            })"
            :name="item.color"
            :id="item.name"
          >
        </label>

      </div>
    </li>
  </ul>
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
      setQuantity: 'setQuantity',
      setColor: 'setColor',
      setItem: 'setItem',
    }),
    keyPress(event) {
      if (event.keyCode === 43 || event.keyCode === 45) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.items {
  list-style: none;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  width: auto;
  margin-left: 20px;
}

.item__quantity {
  display: flex;
  align-items: center;
}

.item__quantity-input {
  align-self: baseline;
  max-width: 40px;
  border: none;
  outline: none;
}

.item__color-input{
  width: 25px;
  height: 30px;
  border: none;
  cursor: pointer;
  outline: none;
  background-color: white;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  bottom: 0;
  padding: 0;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.item__name-label>input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.item__name-label>span {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.item__name-label>span::before {
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

.item__name-label>input:checked + span::before {
  background-size: 15px 15px;
  background-image: url('../img/mark.jpg');
}
</style>
