<template>
    <div class="homepage">
        <header id="main-header" :class="{ 'sticky-header': isSticky }">
            <div class="logo-container">
                <!-- Add your logo here -->
                <img src="../assets/Scissor logo.svg" alt="Scissor Logo" />
            </div>
            <div class="burger-menu" @click="toggleMenu">
                <span class="burger-icon">&#9776;</span>
            </div>



            <nav v-if="!isMenuHidden"  class="main-nav" :class="{ 'hidden': isMenuHidden }">
                <ul>
                    <li><a href="#features-section">Features</a></li>
                    <li><a href="#pricing-section">Pricing</a></li>
                    <li><router-link to="/dashboard">Dashboard</router-link></li>
                </ul>
            </nav>

            <button v-if="isAuthenticated" class="signout-button " :class="{ 'hidden': isMenuHidden }"
                @click="signOut">Sign Out</button>


            <div v-if="!isAuthenticated"  class="auth-buttons" :class="{ 'hidden': isMenuHidden }">
                <button @click="goToSignin" class="btn signin-btn">Sign in</button>
                <button @click="goToSignup" class="btn signup-btn">Sign up</button>
            </div>
        </header>

        <main>
            <section id="hero-section" class="hero-section">
                <div class="hero-content">
                    <h1>Cut Through the Clutter</h1>
                    <p>
                        Shorten URLs, generate QR codes, and effortlessly share with your
                        audience. Cut through the digital noise and deliver the right
                        information seamlessly.
                    </p>
                    <div class="hero-actions">
                        <button @click="goToSignup" class="btn primary-btn">Join us now</button>
                        <button @click="scrollToSection('url-shortener-section')" class="btn secondary-btn">Shorten a
                            long URL</button>
                    </div>
                </div>
                <div class="hero-media">
                    <iframe src="https://giphy.com/embed/rqIKDwTnqJ1P2bw55T" width="400" height="400"
                        class="giphy-embed" allowfullscreen></iframe>
                </div>
            </section>

            <UrlShortener />


            <section id="features-section" class="features-section">

                <div class="feature">
                    <div class="feature-text">
                        <h1>Customizable URLs</h1>
                        <p>
                            Tailor your URLs effortlessly with our customizable feature.
                            Whether it's branding or personalization, make your links memorable and impactful.
                        </p>
                        <router-link to="/dashboard"><button class="btn feature-btn">Try now</button></router-link>
                    </div>
                    <div class="feature-image">
                        <img src="https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg"
                            alt="Customizable URLs" />
                    </div>
                </div>

                <div class="feature">
                    <div class="feature-text">
                        <h1>QR Codes</h1>
                        <p>
                            Transform your URLs into QR codes in a snap. Simplify sharing and access—just scan, connect,
                            and go. Cutting-edge convenience at your fingertips.
                        </p>
                        <router-link to="/dashboard"><button class="btn feature-btn">Try now</button></router-link>
                    </div>
                    <div class="feature-image">
                        <img src="https://images.pexels.com/photos/12935064/pexels-photo-12935064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Customizable URLs" />
                    </div>
                </div>

                <div class="feature">
                    <div class="feature-text">
                        <h1>Analytics Page</h1>
                        <p>
                            Gain insights into your link performance with our analytics page. Track clicks, analyze
                            trends, and optimize your strategies with precision. </p>
                        <router-link to="/dashboard"><button class="btn feature-btn">Try now</button></router-link>
                    </div>
                    <div class="feature-image">
                        <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Customizable URLs" />
                    </div>
                </div>





                <!-- Repeat for other features -->
            </section>

            <section id="pricing-section" class="pricing-section">
                <div class="pricing-container">
                    <div class="pricing-header">
                        <div class="pricing-header-text">
                            <h3>Starter</h3>
                            <h1>Free</h1>
                            <h3>Perfect for personal use</h3>
                        </div>
                        <img src="../assets/lightbulb.svg" alt="lightbulb-logo">
                    </div>
                    <div class="pricing-body">
                        <p>✔️ All features are free (For Now! <i>wink wink</i>)</p>
                    </div>
                    <div class="pricing-footer">
                        <router-link to="/dashboard"><button class="btn pricing-btn">Try for Free</button></router-link>
                    </div>
                </div>
            </section>
        </main>

        <footer id="main-footer">
            <div class="footer-content">
                <div class="logo-container">
                    <img src="../assets/Scissor footer logo.svg" alt="Scissor Logo" class="footer-logo" />
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h3>Product</h3>
                        <ul>
                            <li><a href="#features-section">Features</a></li>
                            <li><a href="#pricing-section">Pricing</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Resources</h3>
                        <ul>
                            <li><router-link to="#">Blog</router-link></li>
                            <li><router-link to="#">User Guides</router-link></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><router-link to="#">About</router-link></li>
                            <li><router-link to="#">Join Us</router-link></li>
                        </ul>
                    </div>
                </div>
                <div class="social-media">
                    <a href="#" class="fa fa-github"></a>
                    <a href="#" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-linkedin"></a>
                    <a href="#" class="fa fa-whatsapp"></a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; Scissor</p>
                <p><router-link to="#">Privacy</router-link></p>
                <p><router-link to="#">Terms</router-link></p>
            </div>
        </footer>
    </div>
</template>

<script>
import UrlShortener from '../components/UrlShortener.vue';
import { getAuth, signOut } from "firebase/auth";

export default {
    name: 'HomePage',

    components: {
        UrlShortener,
    },

    data() {
        return {
            longUrl: '',
            shortenedUrl: '',
            isSticky: false,
            isMenuHidden: true,
            showModal: false,
            isAuthenticated: false, // Added to track authentication status
        };
    },
    computed: {
        // Update computed property to reflect current auth status
        computedAuthStatus() {
            const auth = getAuth();
            return auth.currentUser !== null;
        }
    },
    methods: {
        goToSignin() {
            this.$router.push('/login');
        },
        goToSignup() {
            this.$router.push('/signup');
        },
        async signOut() {
            const auth = getAuth();
            try {
                await signOut(auth);
                console.log("User signed out successfully!");
                // Update the authentication status after sign out
                this.isAuthenticated = false;
            } catch (error) {
                console.error("Error signing out:", error.message);
            }
        },
        showShortenerModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        toggleMenu() {
            this.isMenuHidden = !this.isMenuHidden; // Corrected the typo here
            console.log('isMenuHidden:', this.isMenuHidden);
        },
        handleScroll() {
            this.isSticky = window.scrollY > 0;
        },
        scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },
    watch: {
        // Watch for changes in authentication status
        computedAuthStatus(newVal) {
            this.isAuthenticated = newVal;
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        // Initialize authentication status
        const auth = getAuth();
        this.isAuthenticated = auth.currentUser !== null;
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>






<style>
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Manrope:wght@200..800&display=swap");

:root {
    --font-primary: "Lexend", sans-serif;
    --font-secondary: "Manrope", sans-serif;
    --color-primary: #002eff;
    --color-secondary: #ff9c32;
    --color-bg: #f2f3f4;
    --color-text: #323743b8;
    --color-light: #ffffff;
    --color-dark: #171a1fff;
    --color-section: #f2f3f4;
}

/* General Styles */
.feature-text p{
    font-family: var(--font-secondary);
}


/* Header */
#main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--color-light);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    transition: background 0.4s ease-in-out, transform 0.3s ease-in-out;
}

#main-header .logo-container {
    flex: 1;
    display: flex;
    align-items: center;
}

#main-header .main-nav {
    flex: 2;
    display: flex;
    justify-content: center;
    font-family: var(--font-primary)
}

#main-header .auth-buttons {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.sticky-header {
    background-color: rgba(242, 243, 244, 0.77);
}

.logo-container img {
    width: 100px;
    height: auto;
}

.burger-icon{
    display: none;
}
.main-nav {
    display: flex;
}

.main-nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 10px;
    margin-right: 40%;
    padding: 0;
}

nav ul li {
    transition: background 0.3s, padding 0.3s;
}

.main-nav li a {
    text-decoration: none;
    color: #565d6d;
    font-weight: bold;
    transition: color 0.3s;
}

.main-nav li a:hover {
    color: var(--color-primary);
}

.auth-buttons {
    display: flex;
    flex-direction: row;
    margin-right: 30px;
}

.auth-buttons .btn {
    margin-left: 10px;
    padding: 10px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-family: var(--font-primary);
}

/* Sign In Button */
.signin-btn {
    color: #ff9019ff;
    border: none;
    background: transparent;
    transition: background 0.3s, color 0.3s;
}

.signin-btn:hover {
    color: #ff9019ff;
    background: #fff2e5;
}

.signin-btn:focus {
    color: #ff9019ff;
    background: #d3c1faff;
}

/* Sign Up Button */
.signup-btn {
    color: #ffffffff;
    border: none;
    background: #3157edff;
    transition: background 0.3s, color 0.3s;
}

.signup-btn:hover {
    color: #ffffffff;
    background: #0020b0ff;
}

.signup-btn:focus {
    color: #ffffffff;
    background: #0020b0ff;
}

/* signout button */
.signout-button {
    background-color: #ff0000;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    margin-right: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}


.signout-button:hover {
    background-color: #cc0000;
    /* Deeper red on hover */
}



/* Hero Section */
.hero-section {
    display: flex;
    justify-content: space-between;
    padding: 150px 20px 50px 20px;
    background-color: var(--color-section);
    margin: 80px 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    position: relative;
    overflow: hidden;
}

.hero-content {
    max-width: 50%;
}

.hero-content h1 {
    font-family: var(--font-primary);
    font-weight: 700px;
    font-size: 56px;
    margin-top: 30px;
    margin-bottom: 5px;
}

.hero-content p {
    font-family: var(--font-secondary);
    color: var(--color-text);
}

.hero-actions {
    margin-top: 20px;
}

.hero-actions .btn {
    margin-right: 10px;
    font-family: var(--font-secondary);
}

/* Join Us Now Button */
.primary-btn {
    color: #ffffffff;
    background: #ff9c32ff;
    opacity: 1;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    /* Remove underline */
    padding: 10px 20px;
    /* Optional: Add padding for better appearance */
    transition: box-shadow 0.3s ease-in-out;
}

.primary-btn:hover {
    box-shadow: 0px 2px 10px #ff9c32ff, 0px 0px 2px;
}

.primary-btn:focus {
    box-shadow: 0px 2px 10px #ff9c32ff, 0px 0px 2px;
}

/* Shorten a Long URL Button */
.secondary-btn {
    color: #4c6dffff;
    background: #ffffffff;
    opacity: 1;
    border-radius: 4px;
    border: 1px solid #002effff;
    text-decoration: none;
    /* Remove underline */
    padding: 10px 20px;
    /* Optional: Add padding for better appearance */
    transition: background 0.3s ease-in-out;
}

.secondary-btn:hover,
.secondary-btn:focus {
    color: #ffffffff;
    background: #4c6dffff;
}

.hero-media {
    max-width: 40%;
    padding: 10px;
}

/* URL Shortener Section */
.url-shortener-section {
    display: flex;
    justify-content: center;
    padding: 50px 20px;
    background-color: var(--color-light);
}

.shortener-container {
    text-align: center;
    background: #002eff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 100px;
    border-style: dashed;
    border-radius: 20px;
    box-shadow: 0px 5px 20px #4c6dff, 0px 0px 2px #4c6dff;
}

.shortener-container h2 {
    font-family: var(--font-primary);
    color: var(--color-light);
}

.url-input-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    /* Space between input field and generated link container */
    align-items: center;
    /* Align input and button vertically centered */
}

#long-url-input {
    flex-grow: 1;
    /* Allow the input to grow and fill available space */
    border-radius: 5px;
    padding: 15px 10px;
    border: none;
    font-family: var(--font-secondary);
    margin: 10px;
    width: auto;
    /* Changed from 120% to auto to prevent affecting button size */
}

#long-url-input::placeholder {
    color: #888;
}

#long-url-input:focus {
    outline: none;
    border: 1px solid #58a6d3;
}

#generate-link-btn {
    background: #ff9c32;
    color: white;
    padding: 15px 20px;
    /* Added consistent padding for a standard button size */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    font-family: var(--font-secondary);
    flex-shrink: 0;
    /* Prevent button from shrinking based on the input field size */
}

#generate-link-btn:hover,
#generate-link-btn:focus {
    box-shadow: 0px 2px 10px #ff9c32ff, 0px 0px 2px;
}

#shortened-link-container {
    display: hidden;
    /* Initially hidden */
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;
}

#shortened-link {
    border-radius: 5px;
    padding: 15px 10px;
    border: none;
    background-color: var(--color-light);
    color: #323743;
    width: 100%;
    text-align: center;
    font-family: var(--font-secondary);
}

.shortened-link-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}



#copy-link-btn,
#qr-code-btn,
#analytics-btn {
    background: #ff9c32;
    color: white;
    transition: box-shadow 0.3s ease-in-out;
    outline: none;
    border-radius: 5px;
    border: none;
    padding: 5px;
}

#copy-link-btn:hover,
#copy-link-btn:focus,
#qr-code-btn:hover,
#qr-code-btn:focus,
#analytics-btn:hover,
#analytics-btn:focus {
    box-shadow: 0px 2px 10px #ff9c32ff, 0px 0px 2px;
}








/* Features Section */
.features-section {
    padding: 50px 20px;
    background-color: var(--color-light);
}

.feature {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}

.feature:nth-of-type(2) {
    flex-direction: row-reverse;
}

.feature-text {
    max-width: 50%;
}

.feature-text h1 {
    font-family: var(--font-primary);
    color: var(--color-primary);
}

.feature-text p {
    color: var(--color-text);
}

/* Features Button */
.feature-btn {
    color: #4c6dffff;
    background: #ffffffff;
    opacity: 1;
    border-radius: 4px;
    border: 1px solid #002effff;
    text-decoration: none;
    /* Remove underline */
    padding: 10px 20px;
    /* Add padding for better appearance */
    transition: background 0.3s ease-in-out;
}

.feature-btn:hover,
.feature-btn:focus {
    color: #ffffffff;
    background: #4c6dffff;
}

.feature-image img {
    width: 100%;
    max-width: 400px;
    height: auto;
}

/* Pricing Section */
.pricing-section {
    padding: 50px 20px;
    background-color: var(--color-light);
    display: flex;
}

.pricing-container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    border: none;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.pricing-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 50px;
    background-color: var(--color-section);
    border-radius: 10px;
}

.pricing-header-text {
    text-align: left;
}

.pricing-header-text h1 {
    font-weight: 500;
    color: #323743ff;
    font-size: 40px;
}

.pricing-header-text h3 {
    font-weight: 400;
    color: #323743ff;
    font-size: 16px;
}

.pricing-body {
    margin-bottom: 130px;
}

.pricing-body p {
    margin: 20px 0;
    text-align: left;
}

.pricing-footer button {
    font-family: var(--font-secondary);
    background-color: #fff6e536;
    color: #ff9c32ff;
    border: none;
    padding: 10px 20px;
    border-radius: 26px;
    opacity: 1;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    width: 100%;
    /* Make button full width */
    transition: background 0.3s ease-in-out;
}

.pricing-footer button:hover,
.pricing-footer button:focus {
    color: #ffffff;
    background: #ff9c32ff;
}

/* Footer */
#main-footer {
    padding: 20px;
    background-color: var(--color-dark);
    color: var(--color-light);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-links {
    display: flex;
    gap: 20px;
}

.footer-column h3 {
    font-family: var(--font-primary);
    margin-bottom: 10px;
}

.footer-column ul {
    list-style: none;
    padding: 0;
}

.footer-column ul li a {
    text-decoration: none;
    color: var(--color-light);
}

.footer-column ul li a:hover {
    text-decoration: none;
    color: var(--color-secondary);
}

.social-media a {
    margin-left: 10px;
    color: var(--color-light);
    text-decoration: none;
}

.fa {
    padding: 3px;
    transition: background 0.3s ease-in-out;
    border-radius: 5px;
}

.fa-github:hover {
    background: #ffffff;
    color: rgb(0, 0, 0);
}

.fa-twitter:hover {
    background: #55acee;
    color: white;
}

.fa-linkedin:hover {
    background: #007bb5;
    color: white;
}

.fa-whatsapp:hover {
    background: #25d366;
    color: white;
}

.footer-bottom {
    display: flex;
    text-align: center;
    margin-top: 20px;
    /* Adjust margin as needed */
    font-family: var(--font_2);
    color: #8e94a0;
}

.footer-bottom a {
    text-decoration: none;
}




/* Media query for screen width of 1000px or less */
@media (max-width: 1000px) {
    #main-header {
        position: relative;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        transition: height 0.3s ease-in-out;
    }

    #main-header .logo-container,
    #main-header .main-nav,
    #main-header .auth-buttons {
        flex: none;
        width: 100%;
        text-align: center;
    }

    .hidden {
        display: none;
    }

    .main-nav,
    .auth-buttons {
        display: none;
        flex-direction: column;
        width: 100%;
        margin-left: auto;
    }

    .burger-icon {
        display: flex;
        font-size: 25px;
        cursor: pointer;
        margin-bottom: 10px;
    }


    .menu-expanded .main-nav,
    .menu-expanded .auth-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .main-nav ul {
        flex-direction: column;
        gap: 10px;
        padding: 0;
        margin: 0;
    }

    nav ul li:hover,
    nav ul li:active {
        background-color: #eaeaea;
        border-radius: 5px;
        padding: 10px;
    }

    .hero-section {
        flex-direction: column;
        text-align: center;
    }

    .hero-content {
        max-width: 100%;
        margin-bottom: 20px;
    }

    .hero-content h1 {
        margin-top: -40px;
    }

    .hero-media {
        max-width: 100%;
        margin-top: 20px;
    }

    .features-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 15px;
        /* Adjust padding for mobile */
    }

    .feature {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        /* Center text for better readability */
        margin-bottom: 30px;
        /* Add space between features */
    }

    .feature-image {
        order: 2;
        /* Move image below the text for all features */
        width: 100%;
        /* Make image responsive */
        max-width: 400px;
        /* Adjust max-width for images */
        margin-top: 20px;
        /* Add space above image */
    }

    .feature-text {
        order: 1;
        /* Ensure text is above the image */
    }

    .feature:nth-child(2) {
        display: flex;
        flex-direction: column-reverse;
    }

    .feature:nth-child(2) .feature-image {
        order: 1;
        /* Reverse the order of the second feature */
    }

    .feature:nth-child(2) .feature-text {
        order: 2;
        /* Ensure text is below the image for the second feature */
    }
}

@media (max-width: 760px) {
    .url-shortener-section {
        padding: 30px 15px;
        /* Adjust padding for mobile */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .shortener-container {
        width: auto;
        /* Remove specified width */
        padding: 20px;
        /* Adjust padding for mobile */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .url-input-container {
        flex-direction: column;
        /* Stack input and button vertically */
        align-items: center;
        /* Center align items */
    }

    #long-url-input {
        width: 100%;
        /* Make input field responsive */
        margin-bottom: 10px;
        /* Add space between input and button */
    }

    #generate-link-btn {
        width: 100%;
        /* Make button full width */
    }

    #shortened-link-container {
        width: 100%;
        /* Make container full width */
        margin-top: 20px;
        /* Add space above container */
    }
}

@media (max-width: 500px) {
    .hero-media {
        display: none;
    }

    /*  mainfooter  */
    .main-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 15px;
        /* Adjust padding for mobile */
        text-align: center;
        /* Center text for better readability */
    }

    .footer-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 80px 0 20px 0;
        /* Add space below links */
    }

    .footer-links a {
        margin: 10px 0;
        /* Add vertical space between links */
    }

    .footer-social {
        display: flex;
        justify-content: center;
        gap: 15px;
        /* Add space between social icons */
        margin-bottom: 20px;
        /* Add space below social icons */
        margin-top: auto;
    }

    .footer-logo {
        top: 20px;
        left: 15px;
        text-align: left;

    }


}

@media (max-width: 414px) {
    .primary-btn {
        margin: 10px;
    }
}
</style>