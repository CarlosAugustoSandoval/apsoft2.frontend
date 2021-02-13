<template>
  <ValidationProvider :name="name" :vid="vid" :rules="rules" v-slot="{ errors, validated, invalid }">
    <v-card
        outlined
        class="mb-2"
        :style="invalid && validated ? 'border-color: red; border-width:2px' : 'border-color:rgba(0, 0, 0, 0.38); border-width:1px'"
    >
      <v-card-text
          :style="dense ? 'padding-bottom: 7px; padding-top: 7px;' : 'padding-bottom: 15px; padding-top: 15px;'"
      >
        <v-radio-group
            v-model="model"
            :column="column"
            outlined
            :dense="dense"
            :disabled="disabled"
            :readonly="readonly"
            class="ma-0 pa-0"
            hide-details
            :error="!!errors.length"
        >
          <template v-slot:label>
            <div
                :style="dense ? '' : 'margin-top: 1px !important;'"
                class="text-body-1"
            >
              {{ label }}
            </div>
          </template>
          <template v-for="(radio, indexRadio) in items">
            <v-radio
                :key="`radio${indexRadio}`"
                :class="column ? (dense ? '' : 'mb-3') : (dense ? 'ml-3' : 'ml-4')"
                :value="itemValue ? radio[itemValue] : radio"
            >
              <template v-slot:label>
                <div>
                  {{ radio[itemText] }}
                  <v-btn v-if="radio.help" icon dark color="blue" small @click.stop="$emit('click:help', radio)">
                    <v-icon color="primary">mdi-help-circle</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-radio>
          </template>
          <v-divider class="mt-1 mb-0" v-if="divider"></v-divider>
        </v-radio-group>
      </v-card-text>
    </v-card>
    <div class="v-messages theme--light error--text ml-3" role="alert" v-if="errors.length">
      <div class="v-messages__wrapper">
        <div class="v-messages__message">
          {{ errors[0] }}
        </div>
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CRadio',
  props: {
    value: {
      type: [Number, String, Object, Array, Boolean],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => []
    },
    itemValue: {
      type: String,
      default: null
    },
    itemText: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    vid: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    },
    column: {
      type: Boolean,
      default: true
    },
    divider: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    model: null
  }),
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
      immediate: false
    },
    value: {
      handler(val) {
        this.model = ((typeof val !== 'undefined') ? val : null)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>