<template>
  <button
    :type="type"
    class="button"
    :class="{
      'button--small': small,
      'button--circle': circle,
      'button--icon': icon,
      'button--outline': outline,
      'button--border': border,
      'button--close': close,
      [`button--${color}`]: color,
    }"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <transition name="fade" mode="out-in">
      <div v-if="!loading" key="text" class="button__content">
        <slot />
      </div>
      <div v-else key="load" class="button__content">
        <div v-if="!$slots.loader" class="button__loader" />
        <slot name="loader" />
      </div>
    </transition>
  </button>
</template>

<script>
export default {
  name: 'TButton',
  props: {
    disabled: Boolean,
    loading: Boolean,
    small: Boolean,
    circle: Boolean,
    icon: Boolean,
    outline: Boolean,
    close: Boolean,
    border: Boolean,
    color: {
      type: String,
      default() {
        return ''
      },
    },
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<style lang="scss">
:root {
  --textColor: #{$white};
  --background: #{$gradient};
  --border-color: transparent;
}

.button {
  @include reset-button-styles();

  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  border-radius: 4px;

  padding: 0 41.56px;
  min-height: 48px;

  color: var(--textColor);
  cursor: pointer;

  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.01em;

  transition-property: box-shadow, opacity, color, border, background;
  transition-duration: 0.3s;
  box-sizing: border-box;
  background-origin: border-box;
  border: 1px solid transparent;

  &:hover {
    box-shadow: 0 0 30px rgba(173, 156, 97, 0.25);
    --border-color: #{$greenish};
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--outline {
    background: transparent;
    border: 1px solid transparent;
    color: var(--background);

    &:hover {
      border-color: var(--border-color);
    }
  }

  &--border {
    --border-color: #{$greenish};
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--background);

    &:hover {
      color: var(--textColor);
      background: var(--background);
    }
  }

  &--small {
    padding: 0 15px;
    min-height: 40px;
    font-weight: 500;
  }

  &--circle {
    width: 40px;
    min-height: 40px;
    border-radius: 50%;
    padding: 0;

    &:hover {
      box-shadow: 0 0 10px $gray3;
    }
  }

  &--close {
    position: absolute;

    top: 0;
    right: 0;

    background: $white;

    transform: translate(50%, -50%);
  }

  &--icon {
    background: transparent;
    color: $gray1;

    font-weight: 500;
    font-size: 13px;
    line-height: 18px;

    &:hover {
      color: $greenish;
      box-shadow: none;
    }
  }

  &--white {
    --textColor: #{$gray2};
    --background: #{$white};
    --border-color: #{$white};

    &:hover {
      --textColor: #{$greenish};
      --background: #{$white};
      --border-color: #{$white};
    }
  }

  &--light {
    --textColor: #{$gray1};
    --border-color: #{$white};
    --background: #{$white};

    &:hover {
      --textColor: #{$gray1};
      --background: #{$white};
      --border-color: #{$white};
    }
  }

  &--warning {
    --textColor: #{$white};
    --background: #{$warning};
    --border-color: #{$warning};

    &:hover {
      --textColor: #{$white};
      --border-color: #{$warning};
      --background: #{$warning};
    }
  }

  &--danger {
    --textColor: #{$white};
    --background: #{$red};
    --border-color: #{$red};

    &:hover {
      --textColor: #{$white};
      --border-color: #{$red};
      --background: #{$red};
    }
  }

  &--gray {
    --background: #{$gray6};
    --textColor: #{$gray1};
    --border-color: #{$gray1};

    &:hover {
      --background: #{$gray1};
      --textColor: #{$white};
      --border-color: #{$gray1};
    }
  }

  &--dark {
    background: linear-gradient(90deg, $gray2 0%, $gray1 100%);
    box-shadow: 0 4px 10px rgba(173, 156, 97, 0.15);

    color: $white;
  }

  &--primary-transparent {
    --textColor: #{$greenish};
    --background: #{rgba($greenish, 0.08)};
  }

  &__loader {
    width: 40px;
    height: 40px;

    box-sizing: border-box;

    border-radius: 50%;

    border: 4px solid rgba($gray6, 0.8);

    border-top-color: $gray2;

    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite;
  }

  @keyframes spinning {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(2turn);
    }
  }
}
</style>
