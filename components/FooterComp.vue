<template>
  <footer class="footer">
    <div class="footer-container">
      <p>UFVJM 2025.</p>
      <p>Jhonathan Wallace, Mariana Santiago e Victor Almeida.</p>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  background-color: $c1;
  color: $w1;
  @include ptop-5;
  @include pbottom-5;
  .footer-container {
    display: flex;
    gap: $s5;
    justify-content: space-between;
    & {
      @include container;
    }
    p {
      @include text-3;
    }
  }
}
</style>
