<template>
  <div class="pagina-monografia">
    <HeaderComp />

    <div class="conteudo-container">
      <div class="introducao">
        <h1>Detalhes da monografia</h1>
        <div>
          <!-- <button><IconsClock /></button> -->
          <NuxtLink :to="`/monografia/editar/${monografia.id}`"
            ><IconsEdit
          /></NuxtLink>
        </div>
      </div>

      <div class="box">
        <h3>{{ monografia.titulo }}</h3>
        <div class="descricoes">
          <p><b>Autor: </b>{{ monografia.autor }}</p>
          <p><b>Orientador: </b>{{ monografia.orientador }}</p>
          <p><b>Coorientador: </b>{{ monografia.coorientador }}</p>
          <p><b>Data de defesa: </b>{{ monografia.data_defesa }}</p>
        </div>
        <p class="descricoes"><b>Resumo: </b>{{ monografia.resumo }}</p>
        <p class="descricoes"><b>Abstract: </b>{{ monografia.abstract }}</p>
        <p class="descricoes">
          <b>Palavras-chave: </b>{{ monografia.palavras_chave }}
        </p>
        <p><b>Arquivos:</b></p>
        <NuxtLink
          v-for="arquivo in monografia.arquivos"
          :key="arquivo.id"
          :to="arquivo.arquivo"
          target="_blank"
          class="arquivo"
        >
          <p>{{ arquivo.nome_arquivo }}</p>
          <IconsArrowUpRight />
        </NuxtLink>
      </div>
    </div>

    <FooterComp />
  </div>
</template>

<script setup>
const { $api } = useNuxtApp();

const monografia = ref({});

const getMonografia = () => {
  $api
    .get(`/monografias/monografias/${useRoute().params.id}/`)
    .then((response) => {
      console.log(response.data);
      monografia.value = response.data;
    })
    .catch((erro) => {
      console.log(erro);
      console.log(
        `Não foi possível fazer a requisição GET em /monografias/monografias/${
          useRoute().params.id
        }/.`
      );
    });
};

getMonografia();
</script>

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
    a {
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
    max-width: none;
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
