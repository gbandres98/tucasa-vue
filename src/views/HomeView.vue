<template>
  <div class="p-1">
    <div class="p-1_text">
      <h1>Diseña hoy TuCasa modular</h1>
      <h2 style="font-weight: 500">
        Un nuevo concepto de casas container prefabricadas
      </h2>
      <h3>CALIDAD, DISEÑO Y SOSTENIBILIDAD</h3>
      <span style="margin-top: 50px; text-align: center"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.</span
      >
      <button class="button-primary">Diseña tu Casa</button>
    </div>
    <Carousel :autoplay="10000" :transition="1500" :wrapAround="true">
      <Slide v-for="slide in carouselImgs" :key="slide">
        <img class="p-1_img" :src="slide" alt="Casa Container" />
      </Slide>
    </Carousel>
  </div>
  <div class="wrapper">
    <div class="p-2">
      <div class="p-2_col-1">
        <h1 class="p-title">¿Por qué una Casa Container?</h1>
        <span class="text"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.</span
        >
        <span class="text"
          >Maecenas lorem dui, commodo et massa facilisis, rutrum varius nisl.
          Nam bibendum, libero sed auctor mollis, est dui fermentum diam, et
          luctus metus tortor eget dui.</span
        >
      </div>
      <div class="p-2_col-2">
        <img
          class="screenshot"
          src="https://s03.s3c.es/imag/_v0/770x420/e/7/c/casas-prefabricadas-modulares-pixavay.jpg"
          alt="scn"
        />
      </div>
    </div>
    <div class="p-2">
      <div class="p-2_col-2">
        <img class="screenshot" :src="scn1" alt="scn" />
      </div>
      <div class="p-2_col-1">
        <h1 class="p-title">Diseña con nuestro Editor 3D</h1>
        <p class="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button class="button-primary">Accede al editor</button>
      </div>
    </div>
    <div class="p-2">
      <div class="p-2_col-1">
        <h1 class="p-title">En tu parcela, o elige de nuestro catálogo</h1>
        <span class="text"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. </span
        ><span class="text"
          >Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </div>
      <div class="p-2_col-2">
        <img
          class="screenshot"
          src="https://www.mojuru.com/wp-content/uploads/2019/07/CASAS_CONTAINER_MOJURU_CASA_EN_LA_SIERRA_14.jpeg"
          alt="scn"
        />
      </div>
    </div>
    <div class="faq">
      <h1 class="faq-title">Preguntas Frecuentes</h1>
      <div class="faq-list">
        <FaqComponent v-for="faq in faqs" :key="faq.title" :faq="faq" />
      </div>
    </div>
    <div class="footer">
      <div class="footer-2">
        <span>2022 TuCasa S.L. Todos los derechos reservados</span>
        <span>tucasa@gbandres.com</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import scn1 from "@/assets/img/scn-1.png";
import type { Ref } from "vue";
import type { Faq } from "@/model/model";
import { ref } from "vue";
import FaqComponent from "@/components/FaqComponent.vue";

const carouselImgs = [
  "https://www.mojuru.com/wp-content/uploads/2020/07/MODELO-150-4DL-CASA-CONTAINER-FACHADA.jpg",
  "https://www.mojuru.com/wp-content/uploads/2020/07/MODELO-90.2D-CASA-CONTAINER-MOJURU-FACHADA-3D..jpg",
  "https://www.mojuru.com/wp-content/uploads/2020/07/MODELO-150-4DL-CASA-CONTAINER-INGRESO.jpg",
  "https://www.mojuru.com/wp-content/uploads/2020/02/MODELO-180-5-U-CASA-CONTAINER-MOJURU-FACHADA.jpg",
  "https://www.mojuru.com/wp-content/uploads/2020/04/MODELO-150-4-CASA-CONTAINER-MOJURU-FACHADA-2-3D-P.jpg",
];

const faqs: Ref<Array<Faq>> = ref([
  {
    title: "¿Cuánto se tarda en fabricar mi casa modular?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "¿Dónde puedo colocar mi vivienda?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "¿Está incluído el transporte?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "¿Con qué marcas trabajáis en cocina y baño?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "¿Puedo instalar mi casa en un terreno con pendiente?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
]);
</script>

<style scoped>
.wrapper {
  width: 70vw;
  margin: 0 auto;
}

.p-1 {
  height: 70vh;
  position: relative;
  margin-bottom: 200px;
}

.p-1_img {
  height: 70vh;
  width: 100%;
  object-fit: cover;
  filter: brightness(50%);
}

.p-1_text {
  color: white;
  position: absolute;
  z-index: 10;
  top: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.p-1_text h1 {
  font-size: 3rem;
}

.p-1_text h3 {
  margin-top: 30px;
  margin-bottom: 30px;
}

.p-1_text span {
  width: 600px;
}

.button-primary {
  margin-top: 30px;
  font-size: 1.2rem;
  padding: 15px 20px;
}

.p-2 {
  display: flex;
  gap: 60px;
  margin-bottom: 50px;
}

.p-2_col-1 {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.p-2_col-1 button {
  margin-top: 20px;
  align-self: center;
}

.p-2_col-2 {
  flex: 0 0 50%;
}

.p-2_col-2 img {
  width: 100%;
}

.screenshot {
  width: 90%;
}

.p-title {
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--primary);
  font-size: 2.5rem;
}

.faq {
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
}

.faq-title {
  width: fit-content;
  border-bottom: 2px solid var(--primary);
  margin-bottom: 100px;
  font-size: 2.5rem;
}

.footer {
  padding: 30px;
}

.footer-2 {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #626262;
}

.text {
  font-size: 1.4rem;
  margin-bottom: 20px;
}
</style>
