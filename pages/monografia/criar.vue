<template>
  <div class="pagina-editar">
    <HeaderComp />
    <div class="conteudo-container">
      <div class="introducao">
        <h1>Criar monografia</h1>
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
              required
            />
          </div>
          <div>
            <label for="autor">Autor*</label>
            <input
              type="text"
              id="autor"
              name="autor"
              v-model="monografia.autor"
              required
            />
          </div>
          <div>
            <label for="data">Data de defesa*</label>
            <input
              type="date"
              id="data"
              name="data"
              v-model="monografia.data_defesa"
              required
            />
          </div>
          <div>
            <label for="orientador">Orientador*</label>
            <input
              type="text"
              id="orientador"
              name="orientador"
              v-model="monografia.orientador"
              required
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
              required
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
              required
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
              required
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
  </div>
</template>

<script setup>
const { $api } = useNuxtApp();

const monografia = ref({
  titulo: "",
  autor: "",
  orientador: "",
  coorientador: "",
  resumo: "",
  abstract: "",
  palavras_chave: "",
  data_defesa: "",
});

const arquivos = ref([]);
const arquivosParaEnviar = ref([]);
const arquivoInputRef = ref(null);
let tempFileIdCounter = 0;

const ativarInputArquivo = () => {
  arquivoInputRef.value?.click();
};

const armazenarArquivo = (event) => {
  const arquivosSelecionados = event.target.files;
  if (!arquivosSelecionados) return;

  for (const file of arquivosSelecionados) {
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

const removerArquivo = (id) => {
  const indexEmArquivos = arquivos.value.findIndex(
    (arquivo) => arquivo.id === id
  );
  if (indexEmArquivos === -1) return;

  const arquivoParaRemoverObj = arquivos.value[indexEmArquivos];
  arquivos.value.splice(indexEmArquivos, 1);

  if (arquivoParaRemoverObj && arquivoParaRemoverObj.originalFile) {
    const indexEmArquivosParaEnviar = arquivosParaEnviar.value.findIndex(
      (file) => file === arquivoParaRemoverObj.originalFile
    );
    if (indexEmArquivosParaEnviar !== -1) {
      arquivosParaEnviar.value.splice(indexEmArquivosParaEnviar, 1);
    }
  }
};

const salvarMonografia = () => {
  $api
    .post("/monografias/monografias/", monografia.value)
    .then((response) => {
      console.log(response);
      console.log(response.data);

      const id = response.data.id;

      for (const arquivo of arquivosParaEnviar.value) {
        const formData = new FormData();
        formData.append("nome_arquivo", arquivo.name);
        formData.append("arquivo", arquivo, arquivo.name);
        formData.append("monografia", id);

        $api
          .post("/monografias/arquivos/", formData)
          .then(() => {
            console.log("Arquivos enviados com sucesso.");
            arquivosParaEnviar.value = [];
          })
          .catch((erro) => {
            console.log(erro);
            console.log("Não foi possível enviar novas monografias.");
          });
      }
    })
    .then(() => {
      window.alert("Nova monografia criada com sucesso.");
      useRouter().push("/");
    })
    .catch((erro) => {
      console.log(erro);
      console.log("Não foi possível criar uma nova monografia.");
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
</style>
