<template>
  <div class="pagina-login">
    <div class="login-container">
      <div class="box">
        <h1>Login</h1>
        <form>
          <div>
            <label for="username">Usuário</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label for="password">Senha</label>
            <input type="text" id="password" name="password" />
          </div>
          <button @click.prevent>Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.pagina-login {
  background-color: $w2;
  min-height: 100vh;
  .login-container {
    @include container;
  }
  .box {
    background-color: $w1;
    padding: $s9;
    box-sizing: border-box;
    max-width: 450px;
    position: relative;
    top: 50vh;
    transform: translateY(-50%);
    @include shadow;
    @include align-div;
    @include border;
    h1 {
      text-align: center;
      @include mbottom-7;
      & {
        @include title-1;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      gap: $s7;
      label {
        color: $c2;
        display: block;
        @include mbottom-3;
        & {
          @include text-2;
        }
      }
      input {
        width: 100%;
        color: $c1;
        outline: none;
        border: 1px solid $c2;
        background: none;
        flex-grow: 1;
        height: 100%;
        box-sizing: border-box;
        padding: $s2 $s4;
        @include border;
        & {
          @include text-3;
        }
      }
      button {
        @include mtop-2;
        & {
          @include button-3;
        }
      }
    }
  }
}
</style>
