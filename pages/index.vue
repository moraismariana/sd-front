<template>
  <div class="pagina-inicio">
    <header class="header">
      <div class="header-container">
        <div class="logout"><IconsLogout />Sair</div>
        <p>Mariana Morais</p>
      </div>
    </header>
    <div class="conteudo-container">
      <div class="introducao">
        <h1>Lista de monografias</h1>
        <button @click.prevent><IconsPlus /></button>
      </div>

      <form class="buscas">
        <div>
          <input
            type="text"
            placeholder="Título, autor, orientador, coorientador, resumo, abstract, palavras-chave..."
          />
          <button @click.prevent><IconsSearch /></button>
        </div>
        <div>
          <input type="date" />
          <button @click.prevent><IconsSearch /></button>
        </div>
      </form>

      <div class="ordenacao">
        <p>120 monografias</p>
        <div>
          <p>Ordenar por:</p>
          <button>
            Mais recentes
            <IconsArrowDown />
          </button>
        </div>
      </div>

      <ul class="lista">
        <li>
          <h4>Título da monografia</h4>
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </li>
        <li>
          <h4>Título da monografia</h4>
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </li>
        <li>
          <h4>Título da monografia</h4>
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </li>
        <li>
          <h4>Título da monografia</h4>
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </li>
        <li>
          <h4>Título da monografia</h4>
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </li>
        <li>
          <h4>Título da monografia</h4>
          <p><b>Autor: </b>Nome do autor</p>
          <p><b>Orientador: </b>Nome do orientador</p>
          <p><b>Coorientador: </b>Nome do coorientador</p>
          <p><b>Data de defesa: </b>21/05/2025</p>
        </li>
      </ul>

      <div class="paginacao">
        <button>Página anterior</button>
        <button>Próxima página</button>
      </div>
    </div>
    <footer class="footer">
      <div class="footer-container">
        <p>UFVJM 2025.</p>
        <p>Jhonathan Wallace, Mariana Morais e Victor Almeida.</p>
      </div>
    </footer>
  </div>
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

.pagina-inicio {
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

.buscas {
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: $s5;
  @include mbottom-7;
  & > div {
    display: flex;
    align-items: center;
    border: 1px solid $c2;
    @include border;
    button {
      line-height: 0;
    }
    input {
      color: $c1;
      background: none;
      flex-grow: 1;
      height: 100%;
      box-sizing: border-box;
      padding: $s2 $s4;
      border: none;
      outline: none;
      & {
        @include text-3;
      }
      &::placeholder {
        font-style: italic;
      }
      &::-webkit-calendar-picker-indicator {
        display: none;
      }
    }
    button {
      padding: 0 $s3;
    }
  }
}

.ordenacao {
  display: flex;
  align-items: center;
  gap: $s5;
  justify-content: space-between;
  @include mbottom-7;
  p {
    color: $c2;
    & {
      @include text-3;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: $s5;
    button {
      display: flex;
      align-items: center;
      gap: $s2;
      & {
        @include button;
      }
    }
  }
}

.lista {
  display: flex;
  flex-direction: column;
  gap: $s5;
  @include mbottom-7;
  li {
    background-color: $w1;
    padding: $s7;
    @include shadow;
    h4 {
      color: $c1;
      @include mbottom-5;
      & {
        @include title-2;
      }
    }
    p {
      color: $c2;
      & {
        @include text-1;
      }
      b {
        font-weight: 500;
      }
    }
  }
}

.paginacao {
  display: flex;
  gap: $s5;
  justify-content: end;
  @include mbottom-9;
  button {
    @include button-2;
  }
}

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
