<template>
  <div class="pagina-inicio">
    <HeaderComp />

    <div class="conteudo-container">
      <div class="introducao">
        <h1>Lista de monografias</h1>
        <NuxtLink to="/monografia/criar"><IconsPlus /></NuxtLink>
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
        <p>{{ monografias.length }} monografias</p>
        <div>
          <p>Ordenar por:</p>
          <button>
            Mais recentes
            <IconsArrowDown />
          </button>
        </div>
      </div>

      <div v-if="monografias.length > 0">
        <ul class="lista" v-for="item in monografias" :key="item.id">
          <NuxtLink :to="`/monografia/${item.id}`">
            <li>
              <h4>{{ item.titulo }}</h4>
              <p><b>Autor: </b>{{ item.autor }}</p>
              <p><b>Orientador: </b>{{ item.orientador }}</p>
              <p v-if="item.coorientador">
                <b>Coorientador: </b>{{ item.coorientador }}
              </p>
              <p><b>Data de defesa: </b>{{ item.data_defesa }}</p>
            </li>
          </NuxtLink>
        </ul>
      </div>

      <div class="sem-monografias" v-else>
        <p>Não há nenhuma monografia.</p>
      </div>

      <div class="paginacao">
        <button>Página anterior</button>
        <button>Próxima página</button>
      </div>
    </div>

    <FooterComp />
  </div>
</template>

<script setup>
const { $api } = useNuxtApp();

const monografias = ref([]);

const getMonografias = () => {
  $api
    .get("/monografias/monografias/")
    .then((response) => {
      monografias.value = response.data;
    })
    .catch((erro) => {
      console.log(erro);
      console.log(
        "Não foi possível fazer a requisição GET em /monografias/monografias/."
      );
    });
};

getMonografias();
</script>

<style lang="scss" scoped>
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
  a {
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
  a {
    display: block;
    min-width: 100%;
  }
  li {
    cursor: pointer;
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
        @include text-2;
      }
      b {
        color: $c1;
        font-weight: 500;
      }
    }
  }
}

.sem-monografias {
  p {
    color: $c1;
    & {
      @include text-1;
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
</style>
