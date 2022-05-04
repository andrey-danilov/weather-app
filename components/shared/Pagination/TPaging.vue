<template>
  <div class="paging">
    <span>{{ $t('paging.show') }}</span>
    <t-multiselect
      v-model="localValue"
      class="paging__select"
      :searchable="false"
      :show-labels="false"
      :options="sizeOptions"
      small
    />
    <span>{{ $t('paging.records') }}</span>
  </div>
</template>

<script>
export default {
  name: 'TPaging',
  props: {
    sizeOptions: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50]
      },
    },
    value: {
      type: Number,
      default() {
        return null
      },
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss">
.paging {
  height: 74px;
  display: flex;
  align-items: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: rgba($gray1, 0.3);

  &__select {
    width: 91px;
    margin: 0 20px 0 10px;
  }
}
</style>
