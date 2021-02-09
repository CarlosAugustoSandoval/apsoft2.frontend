<template>
  <v-dialog
      v-model="dialogMenu"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
          icon
          large
          v-on="on"
          @click.stop="dialogMenu = true"
      >
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </template>
    <v-card tile>
      <v-toolbar>
        <v-toolbar-title>MENÚ</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="dialogMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <template v-for="(modulo, key) in items">
        <v-card-text
            v-if="modulo.length"
            :key="key"
        >
          <template>
            <v-subheader class="font-weight-bold">{{key.toUpperCase()}}</v-subheader>
            <list
                @clickitem="dialogMenu = false"
                :items-menu="modulo"
            />
          </template>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import List from './List'

export default {
  name: 'AppMenu',
  data: () => ({
    dialogMenu: false,
    dialog: {
      heading: '',
      message: '',
      loading: false,
      registro: null,
      btnColor: 'warning'
    }
  }),
  components: {
    List
  },
  computed: {
    ...mapGetters([
      'itemsMenu'
    ]),
    items() {
      if (this && this.itemsMenu && this.itemsMenu.length) {
        return this.itemsMenu.reduce((value, key) => {
          (value[key['typeRoute']] = value[key['typeRoute']] || []).push(key)
          return value
        }, {})
      } else {
        return []
      }
    }
  }
}
</script>