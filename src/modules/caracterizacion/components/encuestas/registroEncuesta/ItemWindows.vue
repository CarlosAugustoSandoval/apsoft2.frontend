<template>
  <v-window-item :value="step">
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
        {{ textButton }}
      </v-btn>
    </v-card-actions>
    <v-divider/>
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>
        <v-avatar
            color="primary lighten-2"
            class="subheading white--text mb-1"
            size="24"
            v-text="step"
        />
        {{ title }}
      </span>
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
        {{ textButton }}
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
    textButton: {
      type: String,
      default: 'Siguiente'
    },
  }
}
</script>

<style scoped>

</style>