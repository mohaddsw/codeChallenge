<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <ValidationProvider :name="type" :rules="rule" v-slot="v">
        <input
            v-model="value"
            v-bind="$attrs"
            v-on="listeners"
        >
        <div class="error">{{ v.errors[0] }}</div>
    </ValidationProvider>
  </div>
</template>

<script>
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
}); 

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },
    value: [String, Number],
    type: {
      type: String,
      default: "",
    },
    rule:{
        type: String,
        default: "",
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style scoped>
.error{
    color: rgb(196, 67, 67);
}
</style>