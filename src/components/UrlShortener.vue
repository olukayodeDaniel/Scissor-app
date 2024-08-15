<template>
    <div class="url-shortener-section">
        <!-- Your URL shortener content here -->
        <div class="shortener-container">
            <h2>Shorten Your URL</h2>
            <div class="url-input-container">
                <input id="long-url-input" v-model="longUrl" placeholder="Enter your long URL here" />
                <button id="generate-link-btn" @click="generateLink">Generate</button>
            </div>
            <div v-if="shortenedUrl" id="shortened-link-container">
                <input id="shortened-link" :value="shortenedUrl" readonly />
                <div class="shortened-link-actions">
                    <button id="copy-link-btn" @click="copyLink">
                        Copy
                        <span v-if="tooltipVisible" class="tooltip">Copied!</span>
                    </button>
                    <button id="qr-code-btn" @click="showQrCode"><i class="material-symbols-outlined">
                            qr_code
                        </i></button>
                    <button id="analytics-btn" @click="showAnalytics"><i class="material-symbols-outlined">
                            bar_chart_4_bars
                        </i></button>
                </div>
            </div>
        </div>
        <QrCodeModal :isVisible="qrCodeModalVisible" :qrCodeUrl="qrCodeUrl" @close="qrCodeModalVisible = false" />
    </div>
</template>


<script>
import axios from 'axios';
import QrCodeModal from './QrCodeModal.vue'

export default {
    name: 'UrlShortener',
    components: {
        QrCodeModal,
    },


    data() {
        return {
            longUrl: '',
            shortenedUrl: '',
            tooltipVisible: false,
            qrCodeModalVisible: false,
            qrCodeUrl: '',
            tinyUrlApiToken: 'GkFvP5xtXLV7C4NIsaQKuVO1B8AdYP3f4XNSA2l5gOMHqIk51rJBN8CNdIvt',

        };
    },
    methods: {
        async generateLink() {
            try {
                const response = await axios.post(
                    'https://api.tinyurl.com/create',
                    {
                        url: this.longUrl,
                        domain: 'tiny.one', // Adjust domain if necessary
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.tinyUrlApiToken}`,
                        },
                    }
                );

                this.shortenedUrl = response.data.data.tiny_url;
                this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(this.shortenedUrl)}`;
            } catch (error) {
                console.error('Error generating shortened URL:', error);
                this.shortenedUrl = 'Error generating link';
                this.tooltipVisible = true;
                setTimeout(() => {
                    this.tooltipVisible = false;
                }, 2000); // Hide tooltip after 2 seconds
            }
        },
        copyLink() {
            navigator.clipboard.writeText(this.shortenedUrl);
            this.tooltipVisible = true;
            setTimeout(() => {
                this.tooltipVisible = false;
            }, 2000);

        },
        showQrCode() {
           this.qrCodeModalVisible = true;
        },
        showAnalytics() {
            // Logic to show analytics
        },
    },
};
</script>

<style scoped>
/* Component-specific styles here */
.tooltip {
    display: inline-block;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
}

.shortened-link-actions {
    position: relative;
}
</style>

<!-- MY OOWN CODEEEEE -->
