export const register = () => {
  const menuRegister = document.getElementById("root");
  const registerpage = `
<header>
  <div class="logo-container">
    <img
      class="landing-logo"
      src="resources/images/logo-GG-white.png"
      alt="landing-logo"
    />
  </div>
  <div class="title-container">
    <h1 class="landing-title">Gamer Girl</h1>
    <h2 class="landing-subtitle">Tu espacio seguro</h2>
  </div>
</header>
<form class="register-container">
  <div class="login-inputs">
    <h3 class="login-title">Únete a la legión</h3>
    <input class="user-name"  
    id="user" 
    type="text" 
    placeholder="Ingresa tu usuario"
    maxlength="30"
    autocomplete="on">
    </input>
    <input
      class="user-input"
      id="email"
      type="email"
      placeholder="Ingresa tu correo"
      maxlength="30"
      autocomplete="on"
    />
    <input
      class="user-password"
      id="pass"
      type="password"
      placeholder="Ingresa tu contraseña"
      maxlength="30"
      autocomplete="current-password"
    />
    <button class="login-btn" id="signup" type="button">Regístrate</button>
    <div class="hr-container">
      <hr class="hr-login-left" />
      <p class="hr-or">O</p>
      <hr class="hr-login-right" />
    </div>
    <div class="logo-google-container">
      <img
        class="google-logo"
        src="resources/images/logo-google.png"
        alt="google-logo"
      />
      <button class="google-title" id="googleLogin">
        Regístrate con Google
      </button>
    </div>
    <hr class="hr-login-center" />
    <div class="signup-container">
      <h3 class="register-title">¿Ya tienes una cuenta?</h3>
      <button class="register-btn" type="button">Inicia Sesión</button>
    </div>
  </div>
</form>`;
  menuRegister.innerHTML = registerpage;
  return menuRegister;
};
