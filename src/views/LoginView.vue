<template>

    <body class="login-page">
        <div>
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
                            <img src="../assets/sign up page-header left- circle-link.svg" alt="Header Icon 2" />
                            <img src="../assets/sign up page-header left- circle-qr.svg" alt="Header Icon 1" />
                            <img src="../assets/sign up page-header left- circle-analytics.svg" alt="Header Icon 3" />
                        </div>
                        <div class="header-text">
                            <h1>Welcome Back to Scissor!</h1>
                            <p>
                                Manage your links effortlessly, generate QR codes, and track your
                                analytics.<br />
                                Dive back in and see what’s new.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <form class="login-form" @submit.prevent="login">
                        <h1>Login</h1>

                        <!-- Conditionally Render Error Message -->
                        <p v-if="errMsg" class="error-message">{{ errMsg }}</p>

                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input class="form-input" id="email" v-model="email" type="text"
                                placeholder="example.email@gmail.com" />
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="password">Password</label>
                            <input class="form-input" id="password" v-model="password"
                                :type="showPassword ? 'text' : 'password'" placeholder="Enter at least 8+ characters" />
                        </div>

                        <input type="checkbox" id="showPasswordCheckbox" v-model="showPassword"> Show Password

                        <button type="submit" class="login-button">Log in</button>

                        <div class="form-extra">
                            <div class="remember-me">
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label for="rememberMe">Remember me</label>
                            </div>

                            <a class="forgot-password" href="#">Forgot password?</a>
                        </div>
                        <hr class="divider" />
                        <div class="form-footer">
                            <p class="alternative-login">or continue with</p>
                            <a href="#" class="fa fa-google" @click.prevent="signInWithGoogle"></a>
                            <p class="signup-prompt">
                                Don't have a Scissor account?
                                <router-link class="signup-link" to="/signup">Sign up</router-link>
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
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
    name: "LoginView",
    setup() {
        const email = ref("");
        const password = ref("");
        const showPassword = ref(false);
        const errMsg = ref();
        const router = useRouter();

        const login = () => {
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((data) => {
                    console.log("User signed in successfully!", data);
                    errMsg.value = "";
                    router.push('/dashboard'); // Redirect to the dashboard
                })
                .catch((error) => {
                    console.error("Error signing in:", error.code);

                    switch (error.code) {
                        case "auth/invalid-email":
                            errMsg.value = "Invalid email format. Please check your email.";
                            break;
                        case "auth/user-not-found":
                            errMsg.value = "No account found with this email. Please sign up first.";
                            break;
                        case "auth/wrong-password":
                            errMsg.value = "Incorrect password. Please try again.";
                            break;
                        default:
                            errMsg.value = "Email or password was incorrect. Please try again.";
                    }
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
            showPassword,
            errMsg,
            login,
            signInWithGoogle,
        };
    },
};
</script>








<style>
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
body.login-page {
    margin: 0;
    padding: 0;
    background-color: #58a6d3;
    font-family: var(--font_1);
    position: relative;
    overflow: hidden;
    font-size: smaller;
}

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

/* Flex Layout for Main Container */
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

/* Flex Layout for Header Container */
.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
    z-index: 2;
    /* Ensure this is on top of the background shapes */
}

.header-logo {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 3;
}

.scissor-logo {
    max-width: 110px;
    /* Adjust size as needed */
    height: auto;
    filter: invert(100);
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

.header-icons img {
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
    font-family: var(--font_2)
}

.form-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-form {
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 3;
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
    font-weight: 600;
}

.form-group .form-input {
    padding: 10px;
    border: none;
    border-radius: 30px;
    font-family: var(--font_2);
    background: #f2f3f4;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    outline: none;
}

.form-group .form-input:focus {
    background: #fff;
    border: 3px solid #58a6d3;
    outline: none;
    -moz-box-shadow: 0 0 7px #C8E0EF;
    -webkit-box-shadow: 0 0 7px #C8E0EF;
    -o-box-shadow: 0 0 7px #C8E0EF;
    -ms-box-shadow: 0 0 7px #C8E0EF;
    box-shadow: 0 0 7px #C8E0EF;

}

.login-page .login-button {
    width: 100%;
    padding: 12px;
    color: var(--btn_color);
    background-color: #fff;
    border: 1px solid var(--btn_color);
    border-radius: 10px;
    cursor: pointer;
    font-family: var(--font_2);
    font-weight: 700;
    transition: background 0.3s ease-in-out;
    margin: 10px;
}

.login-button:hover,
.login-button:focus {
    background: var(--btn_color);
    color: #fff;
}

.form-extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-family: var(--font_2);

}

.forgot-password,
.signup-link {
    color: var(--bg_color);
    text-decoration: none;
    font-weight: 600;
}

.forgot-password:hover,
.forgot-password:focus,
.signup-link:hover,
.signup-link:focus {
    color: var(--shape_color);
}



.divider {
    margin: 20px 0;
    border: none;
    border-top: 1px solid #ccc;
}

.form-footer {
    text-align: center;
    font-family: var(--font_2);
}

.form-footer a {
    text-decoration: none;
}

.fa-google {
    padding: 10px 50px;
    border-radius: 20px;
    background-color: #fff2f2;
    color: #c6160f;
}

.fa-google:hover,
.fa-google:focus {
    background-color: #fce1e0;
}


.alternative-login {
    margin-bottom: 10px;
    font-weight: 500;
}



.signup-prompt {
    font-weight: 500;
}

/* Responsive Layout */
@media (max-width: 1075px) {
    body.login-page {
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

.error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
}
</style>