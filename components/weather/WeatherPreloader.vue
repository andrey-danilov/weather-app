<template>
  <div class="weather-preloader">
    <div class="skeleton weather-preloader__days">
      <div class="skeleton__item day-card" />
      <div class="skeleton__item day-card" />
      <div class="skeleton__item day-card" />
      <div class="skeleton__item day-card" />
      <div class="skeleton__item day-card" />
    </div>

    <div class="skeleton weather-info__list">
      <div class="skeleton__item skeleton__item--rotate" />
      <div class="skeleton__item skeleton__item--rotate" />
      <div class="skeleton__item skeleton__item--rotate" />
      <div class="skeleton__item skeleton__item--rotate" />
      <div class="skeleton__item skeleton__item--rotate" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherPreloader',
}
</script>

<style lang="scss" scoped>
@import 'styles/components/weather/day-card';

.weather-preloader {
  overflow: hidden;

  &__days {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(5, 200px);
    grid-column-gap: 20px;
    height: 110px;
    padding: 10px 15px;
  }

  &__info-block {
    display: grid;
    height: 500px;
    grid-template-columns: repeat(5, 1fr);
  }

  .weather-info__list {
    margin: 10px;
  }
}
</style>
