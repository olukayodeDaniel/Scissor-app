<template>
  <div class="link-item">
    <div class="link-info">
      <p>{{ shortLink }}</p>
      <p>{{ originalLink }}</p>
    </div>
    <div class="link-stats">
      <div class="clicks">
        <p>{{ clicks }} clicks</p>
      </div>
      <button class="arrow-icon" @click="toggleActions">
        <span class="material-symbols-outlined">arrow_drop_down</span>
      </button>
      <div :class="{ active: actionsActive }" class="actions">
        <div class="tooltip-container">
          <button class="action-button" @click="copyToClipboard(shortLink)">
            <span class="material-symbols-outlined">content_copy</span>
          </button>
          <span v-if="isTooltipVisible" class="tooltip">Copied!</span>
        </div>
        <button class="action-button" @click="openQrModal">
          <span class="material-symbols-outlined">qr_code</span>
        </button>
        <!-- Added analytics button -->
        <button class="action-button" @click="openAnalyticsModal">
          <span class="material-symbols-outlined">analytics</span>
        </button>
        <button class="action-button" @click="openShareModal">
          <span class="material-symbols-outlined">share</span>
        </button>
        <button class="action-button" @click="deleteLink">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shortLink: String,
    originalLink: String,
    clicks: Number,
    link: Object // Pass the entire link object to access its ID
  },
  data() {
    return {
      actionsActive: false,
      isTooltipVisible: false,
    };
  },
  methods: {
    toggleActions() {
      this.actionsActive = !this.actionsActive;
    },
    openQrModal() {
      this.$emit('open-qr-modal', this.shortLink); // Pass the short link to the parent
    },
    openShareModal() {
      this.$emit('open-share-modal', this.link); // Pass the entire link object
    },
    openAnalyticsModal() {
      this.$emit('open-analytics-modal', this.link); // Pass the entire link object
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.isTooltipVisible = true;
        setTimeout(() => {
          this.isTooltipVisible = false;
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    },
    deleteLink() {
      this.$emit('delete-link', this.link.id); // Pass the link ID for deletion
    }
  }
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tooltip-container .tooltip {
  opacity: 1;
}

.action-button {
  width: 40px;
  height: 40px;
  background-color: rgb(255, 174, 0);
  border: none;
  cursor: pointer;
  border-radius: 8%;
  transition: background 0.3s ease-in-out;
}

.material-symbols-outlined {
  filter: brightness(0) invert(1);
}

.action-button:hover {
  background-color: rgb(234, 161, 4);
}
</style>
