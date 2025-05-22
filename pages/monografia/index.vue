<template>
  <div class="pagina-monografia">
    <HeaderComp />

    <div class="conteudo-container">
      <div class="introducao">
        <h1>Detalhes da monografia</h1>
        <div>
          <button><IconsClock /></button>
          <button><IconsEdit /></button>
        </div>
      </div>

      <div class="box">
        <h3>Título da monografia</h3>
        <div class="descricoes">
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </div>
        <p class="descricoes">
          <b>Resumo: </b>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ex laudantium suscipit incidunt iste tempore expedita laboriosam
          voluptatem doloribus voluptatibus, dolore reprehenderit quisquam quas
          ab enim ducimus molestias ipsa aspernatur harum.
        </p>
        <p class="descricoes">
          <b>Abstract: </b>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ex laudantium suscipit incidunt iste tempore expedita laboriosam
          voluptatem doloribus voluptatibus, dolore reprehenderit quisquam quas
          ab enim ducimus molestias ipsa aspernatur harum.
        </p>
        <p class="descricoes">
          <b>Palavras-chave: </b>Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ex laudantium suscipit incidunt iste tempore
          expedita laboriosam voluptatem doloribus voluptatibus, dolore
          reprehenderit quisquam quas ab enim ducimus molestias ipsa aspernatur
          harum.
        </p>
        <p><b>Arquivos:</b></p>
        <div class="arquivo">
          <p>nome arquivo.pdf</p>
          <IconsArrowUpRight />
        </div>
        <div class="arquivo">
          <p>nome arquivo.pdf</p>
          <IconsArrowUpRight />
        </div>
      </div>
    </div>

    <FooterComp />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.pagina-monografia {
  background-color: $w2;
  min-height: 100vh;

  .conteudo-container {
    @include container;
  }
}

.introducao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $s6;
  @include ptop-9;
  @include pbottom-9;
  h1 {
    & {
      @include title-1;
    }
  }
  div {
    display: flex;
    gap: $s5;
    button {
      line-height: 0;
      & {
        @include button;
      }
    }
  }
}

.box {
  background-color: $w1;
  padding: $s9;
  box-sizing: border-box;
  @include border;
  @include shadow;
  @include mbottom-9;
  h3 {
    @include mbottom-7;
    & {
      @include title-2;
    }
  }
  p {
    color: $c1;
    & {
      @include text-1;
    }
    b {
      color: $b;
      font-weight: 500;
    }
  }
  .descricoes {
    @include mbottom-7;
  }
  .arquivo {
    cursor: pointer;
    color: $c2;
    background-color: $w2;
    display: flex;
    gap: $s5;
    justify-content: space-between;
    padding: $s5;
    @include mtop-5;
    p {
      color: $c4;
    }
  }
}
</style>
