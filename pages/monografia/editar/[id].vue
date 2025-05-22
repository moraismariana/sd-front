<template>
  <div class="pagina-editar">
    <HeaderComp />
    <div class="conteudo-container">
      <div class="introducao">
        <h1>Editar monografia</h1>
        <button @click.prevent="modalAtivo = true">
          <IconsTrash />
        </button>
      </div>

      <div class="box">
        <form>
          <div>
            <label for="titulo">Título*</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              v-model="monografia.titulo"
            />
          </div>
          <div>
            <label for="autor">Autor*</label>
            <input
              type="text"
              id="autor"
              name="autor"
              v-model="monografia.autor"
            />
          </div>
          <div>
            <label for="data">Data de defesa*</label>
            <input
              type="date"
              id="data"
              name="data"
              v-model="monografia.data_defesa"
            />
          </div>
          <div>
            <label for="orientador">Orientador*</label>
            <input
              type="text"
              id="orientador"
              name="orientador"
              v-model="monografia.orientador"
            />
          </div>
          <div>
            <label for="coorientador">Coorientador</label>
            <input
              type="text"
              id="coorientador"
              name="coorientador"
              v-model="monografia.coorientador"
            />
          </div>
          <div>
            <label for="resumo">Resumo*</label>
            <textarea
              name="resumo"
              id="resumo"
              cols="30"
              rows="5"
              v-model="monografia.resumo"
            ></textarea>
          </div>
          <div>
            <label for="abstract">Abstract*</label>
            <textarea
              name="abstract"
              id="abstract"
              cols="30"
              rows="5"
              v-model="monografia.abstract"
            ></textarea>
          </div>
          <div>
            <label for="palavras-chave">Palavras-chave*</label>
            <textarea
              name="palavras-chave"
              id="palavras-chave"
              cols="30"
              rows="5"
              v-model="monografia.palavras_chave"
            ></textarea>
          </div>
          <div class="arquivos">
            <div class="arquivos-add">
              <p>Arquivos*</p>
              <button @click.prevent="ativarInputArquivo">
                <IconsPlus /> Adicionar arquivos
              </button>
              <input
                type="file"
                ref="arquivoInputRef"
                multiple
                @change="armazenarArquivo"
                style="display: none"
                accept=".pdf,.doc,.docx"
              />
            </div>
            <div class="arquivo" v-for="arquivo in arquivos" :key="arquivo.id">
              <p>{{ arquivo.nome_arquivo }}</p>
              <button @click.prevent="removerArquivo(arquivo.id)">
                <IconsClose />
              </button>
            </div>
          </div>
          <button @click.prevent="salvarMonografia">Salvar</button>
        </form>
      </div>
    </div>

    <FooterComp />

    <div v-if="modalAtivo" class="excluir-modal">
      <div class="modal-box">
        <h3>Excluir monografia</h3>
        <p>Você deseja excluir permanentemente a monografia?</p>
        <div>
          <button @click.prevent="modalAtivo = false">Cancelar</button>
          <button @click.prevent="excluirMonografia">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp();

const monografia = ref({});
const arquivos = ref([]);
const arquivosParaDeletar = ref([]);
const arquivosParaEnviar = ref([]);
const arquivoInputRef = ref(null);
let tempFileIdCounter = 0;

const getMonografia = () => {
  $api
    .get(`/monografias/monografias/${useRoute().params.id}/`)
    .then((response) => {
      console.log(response.data);
      monografia.value = response.data;
      arquivos.value = (() => {
        const arr = monografia.value.arquivos;
        delete monografia.value.arquivos;
        return arr;
      })();
      console.log(monografia.value);
      console.log(arquivos.value);
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

const modalAtivo = ref(false);

const excluirMonografia = () => {
  $api
    .delete(`/monografias/monografias/${useRoute().params.id}/`)
    .then(() => {
      window.alert("Monografia deletada com sucesso.");
      useRouter().push("/");
    })
    .catch(() => {
      console.log("Não foi possível excluir a monografia.");
    });
};

const removerArquivo = (id) => {
  arquivosParaDeletar.value.push(id);
  const index = arquivos.value.findIndex((arquivo) => arquivo.id === id);
  arquivos.value.splice(index, 1);
  console.log(arquivosParaDeletar.value);
};

const ativarInputArquivo = () => {
  arquivoInputRef.value?.click();
};

const armazenarArquivo = (event) => {
  const arquivosSelecionados = event.target.files;
  console.log(arquivosSelecionados);
  if (!arquivosSelecionados) return;

  for (const file of arquivosSelecionados) {
    console.log(file);
    const tempId = `temp_${Date.now()}_${tempFileIdCounter++}`;

    arquivosParaEnviar.value.push(file);

    arquivos.value.push({
      id: tempId,
      nome_arquivo: file.name,
      arquivo: null,
      monografia: null,
      isNew: true,
      originalFile: file,
    });
  }

  if (arquivoInputRef.value) {
    arquivoInputRef.value.value = "";
  }
};

const salvarMonografia = () => {
  let promises = [];

  // Requisição para salvar textos
  promises.push(
    $api
      .patch(
        `/monografias/monografias/${useRoute().params.id}/`,
        monografia.value
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      })
  );

  // Requisição para deletar arquivos
  if (arquivosParaDeletar.value.length > 0) {
    for (const id of arquivosParaDeletar.value) {
      console.log(id);
      promises.push(
        $api
          .delete(`monografias/arquivos/${id}/`)
          .then(() => {
            arquivosParaDeletar.value = [];
          })
          .catch(`Não foi possivel deletar o arquivo de id ${id}`)
      );
    }
  }

  // Requisição para enviar arquivos
  if (arquivosParaEnviar.value.length > 0) {
    for (const arquivo of arquivosParaEnviar.value) {
      const formData = new FormData();
      formData.append("nome_arquivo", arquivo.name);
      formData.append("arquivo", arquivo, arquivo.name);
      formData.append("monografia", useRoute().params.id);
      promises.push(
        $api
          .post("/monografias/arquivos/", formData)
          .then((response) => {
            console.log(response);
            console.log(response.data);
            arquivosParaEnviar.value = [];
          })
          .catch((erro) => {
            console.log(erro);
            console.log("Não foi possível enviar novas monografias.");
          })
      );
    }
  }

  Promise.all(promises)
    .then(() => {
      window.alert("Monografia atualizada com sucesso.");
      getMonografia();
    })
    .catch((error) => {
      console.error("Erro ao atualizar a monografia:", error);
    });
};
</script>

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
