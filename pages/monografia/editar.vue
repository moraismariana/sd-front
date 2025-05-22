<template>
  <div class="pagina-editar">
    <HeaderComp />
    <div class="conteudo-container">
      <div class="introducao">
        <h1>Editar monografia</h1>
        <button>
          <IconsTrash />
        </button>
      </div>

      <div class="box">
        <form>
          <div>
            <label for="titulo">Título</label>
            <input type="text" id="titulo" name="titulo" />
          </div>
          <div>
            <label for="autor">Autor</label>
            <input type="text" id="autor" name="autor" />
          </div>
          <div>
            <label for="data">Data de defesa</label>
            <input type="date" id="data" name="data" />
          </div>
          <div>
            <label for="orientador">Orientador</label>
            <input type="text" id="orientador" name="orientador" />
          </div>
          <div>
            <label for="coorientador">Coorientador</label>
            <input type="text" id="coorientador" name="coorientador" />
          </div>
          <div>
            <label for="resumo">Resumo</label>
            <textarea name="resumo" id="resumo" cols="30" rows="5"></textarea>
          </div>
          <div>
            <label for="abstract">Abstract</label>
            <textarea
              name="abstract"
              id="abstract"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div>
            <label for="palavras-chave">Palavras-chave</label>
            <textarea
              name="palavras-chave"
              id="palavras-chave"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div class="arquivos">
            <div class="arquivos-add">
              <p>Arquivos</p>
              <button><IconsPlus /> Adicionar arquivos</button>
            </div>
            <div class="arquivo">
              <p>nome arquivo.pdf</p>
              <button>
                <IconsClose />
              </button>
            </div>
            <div class="arquivo">
              <p>nome arquivo.pdf</p>
              <button>
                <IconsClose />
              </button>
            </div>
          </div>
          <button>Salvar</button>
        </form>
      </div>
    </div>

    <FooterComp />

    <!-- <div class="excluir-modal">
      <div class="modal-box">
        <h3>Excluir monografia</h3>
        <p>Você deseja excluir permanentemente a monografia?</p>
        <div>
          <button @click.prevent>Cancelar</button>
          <button @click.prevent>Excluir</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.pagina-editar {
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
  button {
    line-height: 0;
    & {
      @include button;
    }
  }
}

.box {
  background-color: $w1;
  padding: $s9;
  @include shadow;
  @include border;
  @include mbottom-9;
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $s6;
    grid-template-areas:
      "a a"
      "b c"
      "d e"
      "f f"
      "g g"
      "h h"
      "i i"
      "j j";
    div:nth-of-type(1) {
      grid-area: a;
    }
    div:nth-of-type(2) {
      grid-area: b;
    }
    div:nth-of-type(3) {
      grid-area: c;
    }
    div:nth-of-type(4) {
      grid-area: d;
    }
    div:nth-of-type(5) {
      grid-area: e;
    }
    div:nth-of-type(6) {
      grid-area: f;
    }
    div:nth-of-type(7) {
      grid-area: g;
    }
    div:nth-of-type(8) {
      grid-area: h;
    }
    div:nth-of-type(9) {
      grid-area: i;
    }
    button {
      grid-area: j;
    }
    label,
    p {
      color: $c2;
      display: block;
      & {
        @include text-2;
      }
    }
    input,
    textarea {
      width: 100%;
      color: $c1;
      outline: none;
      border: 1px solid $c2;
      background: none;
      box-sizing: border-box;
      resize: none;
      padding: $s2 $s4;
      @include border;
      @include mtop-3;
      & {
        @include text-3;
      }
    }
    input {
      height: 37px;
    }
    .arquivos {
      .arquivos-add {
        display: flex;
        align-items: center;
        gap: $s5;
        justify-content: space-between;
        // @include mbottom-7;
        button {
          display: flex;
          gap: $s3;
          align-items: center;
          & {
            @include button;
          }
        }
      }
      .arquivo {
        @include mtop-5;
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
        button {
          line-height: 0;
        }
      }
    }
    & > button {
      & {
        @include button-3;
      }
    }
  }
}

.excluir-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba($c1, 0.7);
  .modal-box {
    background-color: $w2;
    padding: $s9;
    box-sizing: border-box;
    max-width: 450px;
    position: relative;
    top: 50vh;
    transform: translateY(-50%);
    @include shadow;
    @include align-div;
    @include border;
    h3 {
      @include mbottom-5;
      & {
        @include title-2;
      }
    }
    p {
      @include mbottom-5;
      & {
        @include text-2;
      }
    }
    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: $s5;
      button:nth-of-type(1) {
        @include button-2;
      }
      button:nth-of-type(2) {
        @include button-3;
      }
    }
  }
}
</style>
