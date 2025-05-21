<template>
  <header class="header">
    <div class="header-container">
      <div class="logout"><IconsLogout />Sair</div>
      <p>Mariana Morais</p>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  background-color: $c1;
  color: $w1;
  @include ptop-5;
  @include pbottom-5;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logout {
      display: flex;
      align-items: center;
      gap: $s4;
      cursor: pointer;
      & {
        @include text-2;
      }
    }
    p {
      cursor: pointer;
      & {
        @include text-2;
      }
    }
    & {
      @include container;
    }
  }
}
</style>
