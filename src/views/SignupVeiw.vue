<template>
    <body class="signup-page">
        
        <div class="signup-page">
            <!-- Background and shapes design -->
            <div class="circle-1"></div>
            <div class="circle-2"></div>
            <div class="square-1"></div>
    
            <!-- Scissor Logo Outside of Main Container -->
            <div class="header-logo">
                <img src="../assets/Scissor logo.svg" alt="Scissor Logo" class="scissor-logo" />
            </div>
    
            <main class="main-container">
                <div class="header-container">
                    <div class="header-content">
                        <div class="header-icons">
                            <img src="../assets/sign up page-header left- circle-link.svg" alt="Header Icon 1" />
                            <img src="../assets/sign up page-header left- circle-qr.svg" alt="Header Icon 2" />
                            <img src="../assets/sign up page-header left- circle-analytics.svg" alt="Header Icon 3" />
                        </div>
                        <div class="header-text">
                            <h1>Join Scissor Today!</h1>
                            <p>
                                Cut through the clutter with seamless link management,
                                <br />
                                custom short URLs, QR codes, and in-depth analytics. Start your
                                journey with us
                            </p>
                        </div>
                    </div>
                </div>
                <div class="form-section">
                    <form class="login-form" @submit.prevent="submitForm">
                        <h1>Create an account</h1>

                        <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
    
                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input class="form-input" id="email" type="email" placeholder="example.email@gmail.com"
                                v-model="email" />
                        </div>
    
                        <div class="form-group">
                            <label class="form-label" for="password">Password</label>
                            <input class="form-input" id="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Enter at least 8+ characters" v-model="password" />
                        </div>
    
                        <input type="checkbox" id="showPasswordCheckbox" @click="togglePasswordVisibility">Show Password
    
                        <button class="signup-button" @click="register"  >Sign up</button>
    
                        <div class="form-footer">
                            <p class="alternative-login">or signup with</p>

                            <a @click="signInWithGoogle" class="fa fa-google"></a>

                            <p class="signup-prompt">
                                Been here before? <router-link class="signup-link" to="login">Log in</router-link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </body>
</template>


<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
  name: "SignupView",
  setup() {
    const email = ref(""); 
    const password = ref("");
    const errMsg = ref("");
    const router = useRouter();

    const register = () => {
        const auth = getAuth()
        

      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          console.log("user data", data)  
          console.log("User signed in successfully!");

          console.log(auth.currentUser)
          router.push('/dashboard'); // Redirect to the dashboard
        })
        .catch((error) => {
          console.error("Error creating user:", error.code);
          alert(error.message);
        });
    };

    const signInWithGoogle = () => {
        const auth = getAuth();
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((data) => {
                    console.log("User signed in with Google successfully!", data);
                    errMsg.value = "";
                    router.push('/dashboard'); // Redirect to the dashboard
                })
                .catch((error) => {
                    console.error("Error signing in with Google:", error.code);
                    alert(error.message);
                    errMsg.value = "Google sign-in failed. Please try again.";
                });
    };

    return {
      email,
      password,
      errMsg,
      register,
      signInWithGoogle,
    };
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    submitForm() {
      // Call the register function on form submission
      this.register();
    },
  },
};
</script>








<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Manrope:wght@200..800&display=swap");

:root {
    --bg_color: #58a6d3;
    --shape_color: #2078aa;
    --btn_color: #ff9c32;
    --font_1: "Lexend", sans-serif;
    --font_2: "Manrope", sans-serif;
}

/* Background Color */
body.signup-page {
    margin: 0;
    padding: 0;
    background-color: var(--bg_color);
    font-family: var(--font_1);
    position: relative;
    overflow: hidden;
    font-size: smaller;}

/* Background Shapes */
.circle-1,
.circle-2,
.square-1 {
    background-color: var(--shape_color);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
}

.circle-1 {
    clip-path: circle(26.1% at 14% 100%);
}

.circle-2 {
    clip-path: circle(23.9% at 91% 6%);
}

.square-1 {
    clip-path: inset(82% 0 0 51%);
}

/* Main container */
.main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    padding: 0 50px;
    position: relative;
    z-index: 2;
    /* Ensure this is on top of the background shapes */
}

.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
    z-index: 2;
}

/* Header logo */
.signup-page .header-logo {
    top: 20px;
    left: 20px;
    
}

.scissor-logo {
    max-width: 110px;
    /* Adjust size as needed */
    height: auto;
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.header-icons {
    display: flex;
    gap: 50px;
}

.header-icons img{
    width: 100px;
    height: auto;
}

.header-text {
    text-align: center;
}

.header-text h1 {
    margin: 0;
    font-size: 2rem;
    color: #fff;
}

.header-text p {
    font-size: 1rem;
    color: #fff;
    margin: 10px 0;
    font-family: var(--font_2);
}

/* Form section */
.form-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-form h1 {
    text-align: center;
}

.form-group {
    margin-bottom: 10px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
}

.form-input {
    padding: 10px;
    border: none;
    border-radius: 30px;
    font-family: var(--font_2);
    background: #f2f3f4;
    transition: 0.5s;
    outline: none;
}

.form-input:focus {
    background: #fff;
    border-color: 3px solid #58a6d3;
    outline: none;
    box-shadow: 0 0 7px #c8e0ef;
}

.signup-button {
    width: 100%;
    max-width: 200%;
    padding: 10px;
    font-size: small;
    background-color: var(--btn_color);
    color: white;
    font-family: var(--font_2);
    border: 1px solid var(--btn_color);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px;
    display: block;
    text-align: center;
}

.signup-button:hover,
.signup-button:focus {
    background-color: white;
    color: var(--btn_color);
}

.signup-page .form-footer {
    text-align: center;
    margin-top: 15px;
    font-family: var(--font_2);
   
   
}

.signup-page .fa-google{
    padding: 5px;
    border: none ;
    background-color: white ;
}

.signup-page .alternative-login {
    margin: 10px;
    font-size: 0.875rem;
    font-weight: 300;
    color: #424856;
}

.signup-page .form-footer a {
    text-decoration: none;
}



.form-footer .fa {
    font-size: 2rem;
    margin-top: 10px;
    color: #58a6d3;
    cursor: pointer;
    transition: color 0.3s ease;
}

.form-footer .fa:hover {
    color: #2e7c9d;
}

.signup-prompt {
    font-size: 0.875rem;
    color: #424856;
    margin-top: 20px;
    font-weight: 300;
}



.signup-link {
    color: #58a6d3;
    text-decoration: none;
}

.signup-link:hover {
    text-decoration: underline;
}

/* Responsive Layout */
@media (max-width: 1075px) {
    body .signup-page {
        overflow-y: auto;
    }

    .main-container {
        flex-direction: column;
        padding: 30px;
        justify-content: flex-start;
        min-height: 100vh;
        box-sizing: border-box;
    }

    .header-container {
        padding: 20px;
        margin-top: 0;
        text-align: center;
    }

    .header-content {
        gap: 20px;
    }

    .header-icons {
        display: none;
    }

    .form-section {
        padding: 0;

    }

    .login-form {
        max-width: 100%;
    }
}

@media (max-width: 760px) {
    .header-container {
        margin-top: 70px;
    }

    .circle-1,
    .circle-2,
    .square-1 {
        display: none;
    }



}


@media (max-width: 414px) {
    .form-extra {
        flex-direction: column;
        padding: 10px;
    }

    .form-extra .remember-me {
        padding: 5px;
    }
}



@media (max-width: 375px) {
    .header-container {
        margin-top: 50px;
    }
}

</style>