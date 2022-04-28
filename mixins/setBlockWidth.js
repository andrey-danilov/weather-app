export default {
  data() {
    return {
      blockWidth: null,
    }
  },
  methods: {
    setBlockWidth(selector) {
      this.blockWidth = document.querySelector(selector).offsetWidth
    },
  },
}
