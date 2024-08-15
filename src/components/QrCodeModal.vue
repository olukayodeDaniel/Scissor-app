<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button class="close-button" @click="closeModal">×</button>
            <div class="qr-code-container">
                <img :src="qrCodeUrl" alt="QR Code" />
                <a :href="qrCodeUrl" download="qrcode.png">
                    <button class="download-button">Download</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QrCodeModal',
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        qrCodeUrl: {
            type: String,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    text-align: center;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid  #ff9c32ff;
}

.qr-code-container img {
    margin: 20px;
}

.download-button {
    color: #4c6dffff;
    background: #ffffffff;
    opacity: 1;
    border-radius: 4px;
    border: 1px solid #002effff;
    text-decoration: none;
    /* Remove underline */
    margin: 20px;
    padding: 10px 20px;
    /* Optional: Add padding for better appearance */
    transition: background 0.3s ease-in-out;
}

.download-button:hover{
    color: #ffffffff;
    background: #4c6dffff;
}
</style>