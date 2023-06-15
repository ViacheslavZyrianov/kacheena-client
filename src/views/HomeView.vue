<template>
  <div class="page d-flex align-center justify-center">
    <v-col>
      <h1 class="text-h1 font-weight-black text-uppercase text-center">Kacheena</h1>
      <h2 class="text-overline text-center mb-8">We kach, you eena</h2>
      <v-row justify="center">
        <v-btn
          :to="{ name: 'Auth' }"
          color="primary"
        >
          {{ $t('home.authButton') }}
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="scss" scoped>
.page:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-image: url('@/assets/kacheena-duck.svg');
  background-size: 70%;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: .05;
  animation: pulse 10s linear infinite;
}

@keyframes pulse {
  0% {
    opacity: .05;
  }

  50% {
    opacity: .2;
  }

  100% {
    opacity: .05;
  }
}
</style>
