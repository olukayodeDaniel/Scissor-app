<template>
  <div :class="{ modal: true, 'modal-visible': visible }">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  watch: {
    visible(newValue) {
      console.log("dashboardModal visible prop changed to: " + newValue);
      this.$nextTick(() => {
        console.log('dashboardModal rendered: ', this.$el ? this.$el.outerHTML : 'No element found');
        if (newValue) {
          document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
          document.body.style.overflow = ''; // Enable scrolling
        }
      });
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
      document.body.style.overflow = ''; // Enable scrolling
    }
  }
}
</script>

<style scoped>
.modal {
  display: none; /* Initially hidden */
}

.modal.modal-visible {
  display: flex; /* Flexbox layout for centering */
}

</style>
