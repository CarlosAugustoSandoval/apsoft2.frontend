<template>
  <v-window-item :value="step">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ title }}</span>
      <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
      ></v-avatar>
    </v-card-title>
    <v-card-text>
      <slot/>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-btn
          x-large
          :disabled="step === 1"
          text
          @click="$emit('atras')"
      >
        Atrás
      </v-btn>
      <v-spacer/>
      <v-btn
          x-large
          color="primary"
          depressed
          @click="$emit('siguiente', referencia)"
      >
        Siguiente
      </v-btn>
    </v-card-actions>
  </v-window-item>
</template>

<script>
export default {
name: 'ItemWindows',
  props: {
    title: {
      type: String,
      default: ''
    },
    step: {
      type: Number,
      default: 1
    },
    referencia: {
      type: String,
      default: ''
    },
  }
}
</script>

<style scoped>

</style>