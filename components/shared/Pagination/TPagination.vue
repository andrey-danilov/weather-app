<template>
  <div class="pagination" :class="props.theme.wrapper">
    <p v-show="props.hasRecords" class="pagination__info">
      {{ props.count }}
    </p>
    <ul
      v-show="props.showPagination"
      class="pagination__list"
      :class="props.theme.list"
    >
      <!--prev-->
      <li
        class="pagination__item pagination__item--prev"
        :class="props.theme.prev"
        @click="props.setPrevPage"
      >
        <a v-bind="{ ...props.aProps, ...props.prevProps }">
          {{ props.texts.prevPage }}
        </a>
      </li>
      <div class="pagination__pages">
        <!--first-->
        <li
          class="pagination__item"
          :class="`${props.theme.firstPage} ${props.pageClasses(1)}`"
          @click="props.setFirstPage"
        >
          <a v-bind="{ ...props.aProps, ...props.firstPageProps }">1</a>
        </li>
        <!--prev chunk-->
        <li
          v-if="
            props.opts.hasChunksNav &&
            props.totalChunks > 1 &&
            !props.prevChunkProps.disabled
          "
          class="pagination__item"
          :class="props.theme.prevChunk"
          @click="props.setPrevChunk"
        >
          <a v-bind="{ ...props.aProps, ...props.prevChunkProps }">{{
            props.texts.prevChunk
          }}</a>
        </li>

        <!-- pages -->
        <template v-for="page in props.pages">
          <li
            v-if="page !== 1 && page !== props.totalPages"
            :key="page"
            class="pagination__item"
            :class="props.pageClasses(page)"
            v-on="props.pageEvents(page)"
          >
            <a v-bind="props.aProps" :class="props.theme.link">{{ page }}</a>
          </li>
        </template>
        <!--next chunk-->
        <li
          v-if="
            props.opts.hasChunksNav &&
            props.totalChunks > 1 &&
            !props.nextChunkProps.disabled
          "
          class="pagination__item"
          :class="props.theme.nextChunk"
          @click="props.setNextChunk"
        >
          <a v-bind="{ ...props.aProps, ...props.nextChunkProps }">{{
            props.texts.nextChunk
          }}</a>
        </li>
        <!--last-->
        <li
          class="pagination__item"
          :class="`${props.theme.lastPage} ${props.pageClasses(
            props.totalPages
          )}`"
          @click="props.setLastPage"
        >
          <a v-bind="{ ...props.aProps, ...props.lastPageProps }">{{
            props.totalPages
          }}</a>
        </li>
      </div>
      <!--next-->
      <li
        class="pagination__item pagination__item--next"
        :class="props.theme.next"
        @click="props.setNextPage"
      >
        <a v-bind="{ ...props.aProps, ...props.nextProps }">
          {{ props.texts.nextPage }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TPagination',
  props: {
    props: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="scss">
.pagination {
  margin: 0;
  display: grid;
  grid-gap: 10px;
  text-align: center;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
    justify-content: space-between;
  }

  &__info {
    margin: 20px 0 0;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;

    color: $gray1;
    opacity: 0.5;

    @include media-breakpoint-down(lg) {
      display: none;
    }
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    flex-direction: row;

    @include media-breakpoint-down(lg) {
      flex-wrap: wrap;
      margin-top: 5px;
      width: 100%;

      justify-content: space-between;
    }
  }

  &__pages {
    display: flex;
    justify-content: center;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-width: 40px;
    height: 40px;
    background: $white;
    border-radius: 4px;
    margin: 0 2.5px;

    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: $gray2;

    transition-property: background, color;
    transition-duration: 0.5s;
    transition-timing-function: ease;

    &.disabled {
      color: rgba($gray1, 0.3);
      cursor: default;
      pointer-events: none;
    }

    &.active {
      background: linear-gradient(274.3deg, $greenish 0%, $secondary 100%);
      box-shadow: 0 4px 10px rgba(173, 156, 97, 0.15);
      color: $white;
      cursor: default;
      pointer-events: none;
    }

    &--prev,
    &--next {
      color: $gray1;
    }

    &--next {
      margin-left: 27.5px;
    }

    &--prev {
      margin-right: 27.5px;
    }

    &:hover {
      background: $gray2;
      color: $white;
    }

    @include media-breakpoint-down(lg) {
      min-width: 35px;
      height: 35px;

      &--prev,
      &--next {
        width: 45px;
      }

      &--next {
        margin-left: 5px;
      }

      &--prev {
        margin-right: 5px;
      }
    }
  }
}
</style>
