<template>
  <header>
    <h1 class="logo">SCISSOR</h1>
    <nav>
      <span class="burger-icon" id="burger-icon" @click="toggleNav">&#9776;</span>
      <ul :class="{ active: navActive }" id="nav-links">
        <li>
          <router-link to="/dashboard">Links</router-link>
        </li>
        <li>
          <router-link to="/">Homepage</router-link>
        </li>
      </ul>
    </nav>
    <div class="user-info">Hi, {{ username }}</div>
  </header>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      navActive: false,
      username: ''
    };
  },
  methods: {
    toggleNav() {
      this.navActive = !this.navActive;
    },
    getUserName() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.username = user.displayName || user.email.split('@')[0]; // Display name or email username
      } else {
        this.username = 'User'; // Default if no user is logged in
      }
    }
  },
  mounted() {
    this.getUserName();
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
