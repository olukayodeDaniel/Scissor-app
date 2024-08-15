<template>
  <div class="dashboard">
    <DashboardHeader />
    <div class="container">
      <main>
        <div class="links-section">
          <div class="links-original">
            <h2>Total Links: {{ links.length }} </h2>
            <button class="new-link" @click="showNewLinkModal">New Link</button>
          </div>
          <div class="link-list">
            <LinkItem v-for="(link, index) in links" :key="index" :shortLink="link.shortLink"
              :originalLink="link.originalLink" :clicks="link.clicks" @open-qr-modal="() => showQrModal(link.shortLink)"
              @open-share-modal="() => showShareModal(link)" @delete-link="() => deleteLink(link.id, index)"
              @open-analytics-modal="() => showAnalyticsModal(link)" />
          </div>
        </div>
      </main>
    </div>

    <DashboardModal :visible="qrModalVisible" @close="hideQrModal">
      <h2 id="qr-header">QR Code</h2>
      <img id="qr-code-img" :src="qrCodeImg" alt="QR Code" v-if="qrCodeImg" />
      <button id="download-qr" class="download-button" v-if="qrCodeImg" @click="downloadQrCode">Download
        QR</button>
    </DashboardModal>

    <DashboardModal :visible="newLinkModalVisible" @close="hideNewLinkModal">
      <h2>Create New Branded Link</h2>
      <form @submit.prevent="createLink">
        <div class="form-group">
          <label for="destination-url">Destination URL</label>
          <input type="url" id="destination-url" v-model="newLink.url" placeholder="Input URL" required />
        </div>
        <div class="form-group">
          <label for="signature-slug">Signature Slug</label>
          <input type="text" id="signature-slug" v-model="newLink.slug" placeholder="Custom Slug" required />
        </div>
        <div class="form-group">
          <p>Link Preview:</p>
          <div id="link-preview">{{ newLinkPreview }}</div>
        </div>
        <button type="submit" class="create-link-button">Create Link</button>
      </form>
    </DashboardModal>

    <DashboardModal :visible="shareModalVisible" @close="hideShareModal">
      <h2>Add Description to Your Links!</h2>
      <form @submit.prevent="copyLink">
        <div class="form-group">
          <label for="link-description">Link Description</label>
          <input type="text" id="link-description" v-model="linkDescription" placeholder="Add a description" required />
        </div>
        <div class="form-group">
          <p>Preview:</p>
          <div id="link-preview-share">
            {{ linkDescription }} <br />
            <a :href="currentShortLink" target="_blank">{{ currentShortLink }}</a>
          </div>
        </div>
        <button type="button" class="copy-button" @click="copyLink">Copy Text</button>
      </form>
    </DashboardModal>

    <DashboardModal :visible="analyticsModalVisible" @close="hideAnalyticsModal">
      <h2>Link Analytics</h2>
      <div id="chart-container"></div>
      <div class="date-range-selector">
        <label for="date-range">Select Range:</label>
        <input class="date-range-input" type="date" v-model="startDate" />
        <input class="date-range-input" type="date" v-model="endDate" />
        <button class="data-range-submit" @click="updateChart('custom')">Update Chart</button>
      </div>
      <button class="analytics-buttons" @click="() => updateChart('hourly')">Hourly</button>
      <button class="analytics-buttons" @click="() => updateChart('daily')">Daily</button>
      <button class="analytics-buttons" @click="() => updateChart('monthly')">Monthly</button>
    </DashboardModal>
  </div>
</template>

<script>
import db from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.vue';
import LinkItem from '../components/LinkItem.vue';
import DashboardModal from '../components/DashboardModal.vue';
import QRCode from 'qrcode';
import { GoogleCharts } from 'google-charts';
import { fetchAnalyticsData, addAnalyticsData } from '../services/analyticsService';

export default {
  name: 'DashboardView',

  components: {
    DashboardHeader,
    LinkItem,
    DashboardModal,
  },
  data() {
    return {
      links: [],
      qrModalVisible: false,
      newLinkModalVisible: false,
      shareModalVisible: false,
      analyticsModalVisible: false,
      newLink: {
        url: '',
        slug: '',
      },
      linkDescription: '',
      qrCodeImg: '',
      baseDomain: 'rebrand.ly',
      currentShortLink: '',
      selectedLink: null,
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    newLinkPreview() {
      return `${this.baseDomain}/${this.newLink.slug}`;
    },
  },
  created() {
    this.loadLinks();
  },

  methods: {
    async saveLinks() {
      const linksCollection = collection(db, 'links');
      try {
        for (const link of this.links) {
          await addDoc(linksCollection, link);
        }
      } catch (error) {
        console.error('Error saving links to Firestore:', error);
      }
    },

    async loadLinks() {
      const linksCollection = collection(db, 'links');
      try {
        const querySnapshot = await getDocs(linksCollection);
        const loadedLinks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter out invalid or blank links
        this.links = loadedLinks.filter(link => link.shortLink && link.originalLink);

        // Remove duplicates
        this.links = this.links.filter(
          (link, index, self) =>
            index === self.findIndex(t => t.shortLink === link.shortLink)
        );
      } catch (error) {
        console.error('Error loading links from Firestore:', error);
      }
    },

    async deleteLink(linkId, index) {
      try {
        // Delete from Firestore
        const linkDoc = doc(db, 'links', linkId);
        await deleteDoc(linkDoc);

        // Remove from local list
        this.links.splice(index, 1);
        console.log('Link deleted successfully.');
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    },

    showQrModal(shortLink) {
      if (shortLink) {
        this.qrCodeImg = '';
        this.qrModalVisible = true;
        this.generateQrCode(shortLink);
      }
    },

    hideQrModal() {
      this.qrModalVisible = false;
    },

    showNewLinkModal() {
      this.newLinkModalVisible = true;
    },
    hideNewLinkModal() {
      this.newLinkModalVisible = false;
    },

    showShareModal(link) {
      this.linkDescription = '';
      this.currentShortLink = link.shortLink;
      this.shareModalVisible = true;
    },

    hideShareModal() {
      this.shareModalVisible = false;
    },

    async showAnalyticsModal(link) {
      this.selectedLink = link;
      this.analyticsModalVisible = true;
      this.startDate = '';
      this.endDate = '';

      try {
        const analyticsData = await fetchAnalyticsData(link.shortLink, 'daily');
        console.log('Analytics data', analyticsData);
        GoogleCharts.load(() => {
          this.renderChart(analyticsData, 'daily');
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    },

    hideAnalyticsModal() {
      this.analyticsModalVisible = false;
    },

    async createLink() {
      try {
        const response = await axios.post(
          'https://api.rebrandly.com/v1/links',
          {
            destination: this.newLink.url,
            slashtag: this.newLink.slug,
            domain: { fullName: this.baseDomain },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              apikey: 'your-rebrandly-api-key',
            },
          }
        );

        const newLinkData = {
          shortLink: response.data.shortUrl,
          originalLink: this.newLink.url,
          clicks: 0,
        };

        this.links.push(newLinkData);
        await this.saveLinks();
        this.hideNewLinkModal();
        await addAnalyticsData(response.data.shortUrl);
      } catch (error) {
        console.error('Error creating link:', error);
      }
    },

    copyLink() {
      const copyText = document.createElement('textarea');
      copyText.value = `${this.linkDescription}\n${this.currentShortLink}`;
      document.body.appendChild(copyText);
      copyText.select();
      document.execCommand('copy');
      document.body.removeChild(copyText);
      this.hideShareModal();
    },

    generateQrCode(url) {
      QRCode.toDataURL(url, (err, url) => {
        if (err) throw err;
        this.qrCodeImg = url;
      });
    },

    downloadQrCode() {
      const link = document.createElement('a');
      link.href = this.qrCodeImg;
      link.download = 'qrcode.png';
      link.click();
    },


    async updateChart(period) {
      if (!this.selectedLink) return;
      try {
        const analyticsData = await fetchAnalyticsData(this.selectedLink.shortLink, period);
        console.log('Updated analytics data', analyticsData);
        GoogleCharts.load(() => {
          this.renderChart(analyticsData, period);
        });
      } catch (error) {
        console.error('Error updating chart:', error);
      }
    },

    renderChart(analyticsData, period) {
      const dataTable = new GoogleCharts.api.visualization.DataTable();
      dataTable.addColumn('string', 'Date');
      dataTable.addColumn('number', 'Clicks');

      analyticsData.forEach(data => {
        dataTable.addRow([data.date, Math.floor(data.clicks)]);
      });

      const chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chart-container'));
      chart.draw(dataTable, {
        title: `Link Clicks (${period})`,
        height: 400,
        width: 600,
        colors: ['#d36d00'],
        hAxis: { title: 'Date' },
        vAxis: { title: 'Clicks', format: '' },
      });
    },
  },
};
</script>

<style>
/* general dashboard styling */
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Manrope:wght@200..800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Material+Icons&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap');

:root {
  --font_1: "Lexend", sans-serif;
  --font_2: "Manrope", sans-serif;
}

.dashboard body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: white;
}

.dashboard .container {
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: var(--font_2);
}

.dashboard header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 40px;
  border-bottom: 1px solid #ddd;
  font-family: var(--font_1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.dashboard nav {
  display: flex;
  align-items: center;
}

.dashboard ul {

  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.dashboard ul li {
  display: block;
}

.dashboard ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.user-info {
  font-size: 16px;
}

.dashboard .burger-icon {
  display: none;
  font-size: 24px;
  cursor: pointer;
}

.links-original {
  border: 1px solid #949292;
  background-color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
}

.links-section {
  font-size: 14px;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(194, 192, 192, 0.1);
  padding: 20px;
}

.links-section h2 {
  margin: 0;
}

.new-link {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 14px;
  transition: background 0.2s ease-in-out;
}

.new-link:hover {
  background-color: #0056b3;
}

.link-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #949292;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
}

.link-info {
  display: flex;
  flex-wrap: wrap;

}

.link-info p {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.link-stats {
  display: flex;
  align-items: center;
  gap: 10px;
}

.clicks {
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
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

.arrow-icon {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgb(255, 174, 0);
  border: none;
  cursor: pointer;
  border-radius: 8%;
  transition: background 0.3s ease-in-out;
}

.arrow-icon:hover {
  background-color: rgb(234, 161, 4);
}

/* Media Queries */
@media (max-width: 1000px) {
  .dashboard nav ul {
    display: none;
    position: absolute;
    top: 60px;
    right: 20px;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
    gap: 10px;
  }

  .dashboard ul.active {
    display: flex;
  }

  .dashboard ul li {
    padding: 10px;
  }

  .dashboard nav ul li:hover {
    background-color: #eaeaea;
    border-radius: 5px;
  }

  .dashboard .burger-icon {
    display: block;
  }

  .user-info {
    display: none;
  }

  .actions {
    display: none;
    position: absolute;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
  }

  .actions.active {
    display: flex;
  }

  .arrow-icon {
    display: flex;
  }
}

@media (max-width: 550px) {
  .link-item {
    flex-direction: column;
    flex-wrap: wrap;
  }
}


/* General Modal Background */
.modal {
  display: none;
  /* Ensure default state is hidden */
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.visible {
  display: block;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 600px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 28px;
  color: #ff9c32;
  cursor: pointer;
}

.close-button:hover {
  color: #d36d00;
}

.close-button .material-symbols-outlined {
  filter: none;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button .material-symbols-outlined:hover,
.close-button .material-symbols-outlined:focus {
  color: #d36d00;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.form-group button:hover {
  background-color: #0056b3;
}





/* analytics styling */
.analytics-buttons {
  display: flex;
  flex-direction: row;
  border-color: #007bff;
  background-color: white;
  cursor: pointer;
  border-radius: 8%;
  margin: 5px;
  padding: 10px;
  transition: background 0.3s ease-in-out;
}

.analytics-buttons:hover,
.analytics-buttons:active {
  background-color: #007bff;
  border: none;
}

.date-range-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-family: var(--font_2);
  transition: border-color 0.3s ease;
}

.date-range-input:focus {
  border-color: #007bff;
  outline: none;
}

.data-range-submit {
  background-color: #007bff;
  color: white;
  border: none;
  margin: 10px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.data-range-submit:hover {
  background-color: #0753a4;
  color: #f2f3f4c5;
}
</style>