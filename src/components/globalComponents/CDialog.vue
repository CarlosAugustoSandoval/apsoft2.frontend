<template>
  <v-dialog
      v-model="dialog"
      :max-width="maxWidth"
  >
    <v-card>
      <loading v-model="loading" absolute/>
      <v-toolbar
          :color="color"
          dark
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text
          v-html="text"
          class="font-weight-regular title text-center pt-4"
      />
      <v-card-actions>
        <v-btn
            text
            @click="close"
        >
          {{ textCancel }}
        </v-btn>
        <v-spacer/>
        <v-btn
            :color="color"
            @click="save"
        >
          {{ textConfirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CDialog',
  props: {
    maxWidth: {
      type: [String, Number],
      default: '500'
    },
    color: {
      type: String,
      default: 'error'
    },
    title: {
      type: String,
      default: 'Eliminar Registro'
    },
    textCancel: {
      type: String,
      default: 'Cancelar'
    },
    textConfirm: {
      type: String,
      default: 'Eliminar'
    }
  },
  data: () => ({
    dialog: false,
    loading: false,
    text: ''
  }),
  methods: {
    save () {
      this.loading = true
      this.$emit('save')
    },
    close () {
      this.dialog = false
      this.$emit('close')
      setTimeout(() => {
        this.loading = false
        this.text = ''
      }, 400)
    },
    open (text) {
      this.text = text
      this.dialog = true
    }
  }
}
</script>
