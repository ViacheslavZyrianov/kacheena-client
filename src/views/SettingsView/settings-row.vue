<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-row align="center">
        <v-col
          cols="6"
          class="subtitle-1 text-left font-weight-bold"
        >
          <slot name="col-left" />
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center justify-end text-right"
        >
          <slot name="col-right" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>