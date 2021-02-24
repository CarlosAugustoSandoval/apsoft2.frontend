<template>
  <div>
    <v-container
        v-if="value.filters || value.advanceFilters"
        fluid
        grid-list-md
        class="pa-0"
    >
      <v-card
          v-if="value.buttonZone"
          class="mx-auto elevation-0"
      >
        <v-card-actions>
          <slot name="top-actions-left"></slot>
          <v-spacer></v-spacer>
          <slot name="top-actions-right"></slot>
        </v-card-actions>
      </v-card>
      <v-container fluid>
        <v-row align="center" justify="end" v-if="value.filters">
          <v-col cols="2" md="1">
            <v-row align="center" justify="center">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon large @click="reloadCurrentPage">
                    <v-icon color="grey">mdi-cached</v-icon>
                  </v-btn>
                </template>
                <span>Recargar Registros</span>
              </v-tooltip>
            </v-row>
          </v-col>
          <v-col cols="10" sm="5" md="3" lg="2">
            <v-select
                label="Columnas visibles"
                multiple
                v-model="value.headers"
                :items="value.makeHeaders.filter(x => !x.selectable)"
                item-text="text"
                item-value="id"
                return-object
                clearable
                hide-details
            >
              <template
                  slot="selection"
                  slot-scope="{ item, index }"
              >
              <span
                  v-if="index === 0"
                  class="grey--text caption"
              >
                  {{ `${value.headers.length} de ${value.makeHeaders.length}` }}
              </span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" sm="5" md="3" lg="2">
            <v-select
                label="Registros por página"
                v-model="pagination.per_page"
                :items="value.optionsPerPage"
                item-text="text"
                item-value="value"
                @change="reloadCurrentPage"
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="5" lg="6">
            <v-container fluid class="py-0">
              <v-row justify="center" align="center">
                <v-text-field
                    v-model="value.search"
                    label="Buscar"
                    clearable
                    hide-details
                    :autocomplete="false"
                    prepend-inner-icon="mdi-magnify"
                    @keyup.enter="reloadCurrentPage"
                >
                </v-text-field>
                <v-dialog
                    v-if="value.advanceFilters"
                    v-model="dialog"
                    persistent max-width="1020px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        small
                        class="ml-2"
                        :class="$vuetify.breakpoint.xsOnly ? 'mt-2' : ''"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="$emit('openFilters')"
                    >
                      <v-icon left>mdi-tune</v-icon>
                      Filtros
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar class="elevation-0">
                      <v-toolbar-title>
                        <v-avatar color="primary" size="40">
                          <v-icon dark>mdi-tune</v-icon>
                        </v-avatar>
                        {{ value.titleFilters }}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                          icon
                          @click="() => {
                            dialog = false
                            $emit('applyFilters')
                          }"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-divider class="my-0"></v-divider>
                    <v-container fluid>
                      <slot name="filters"></slot>
                    </v-container>
                    <loading :value="loadingFilter"/>
                    <v-card-actions>
                      <v-btn
                          text
                          color="primary"
                          @click="() => {
                            dialog = false
                            $emit('applyFilters')
                          }"
                      >
                        Cerrar
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="primary"
                          @click.stop="() => {
                            dialog = false
                            $emit('applyFilters')
                          }"
                      >
                        Aplicar Filtros
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <slot name="tagsfilters" v-bind="{ tags: tagsfilters }"></slot>
    <slot name="tabla" v-bind="{ items: value.items, headers: value.headersTable, loading: loading }"></slot>
    <div v-show="!value.headers.length" class="title grey--text text-center pa-4">No hay columnas seleccionadas para
      mostrar
    </div>
    <template v-if="pagination && pagination.total">
      <div
          v-if="paginationFooter"
          style="left: 0px !important; right: 0px !important; bottom: 0px !important; position: fixed !important;"
      >
        <v-sheet
            tile
            elevation="5"
        >
          <v-container fluid>
            <v-row align="center" justify="center">
              <span class="title grey--text text--darken-1 text-center caption">
              Registros del {{ pagination.from }} al {{ pagination.to }} de {{ pagination.total }} totales
            </span>
            </v-row>
            <v-row align="center" justify="center" class="mt-2">
              <v-pagination v-model="pagination.current_page" :total-visible="7"
                            :length="pagination.last_page" @input="reloadPage"></v-pagination>
            </v-row>
          </v-container>
        </v-sheet>
      </div>
      <div v-else class="text-center">
        <span class="title grey--text text--darken-1 text-center caption pa-1">
          Registros del {{ pagination.from }} al {{ pagination.to }} de {{ pagination.total }} totales
        </span>
        <v-pagination v-model="pagination.current_page" :total-visible="7" :length="pagination.last_page" @input="reloadPage"/>
      </div>
    </template>
  </div>
</template>
<script>
import lodash from 'lodash'

export default {
  name: 'DataTable',
  props: {
    value: {
      type: Object,
      default: null
    },
    paginationFooter: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    tagsfilters: [],
    dialog: false,
    loadingFilter: false,
    loading: false,
    // Data de Tabla
    activePetition: false,
    filtrado: false,
    stringSort: '',
    pagination: {
      current_page: 1,
      from: 1,
      last_page: 0,
      per_page: 15,
      to: 15,
      total: 0,
      next: null,
      prev: null,
      descending: null,
      sortBy: null
    }
  }),
  computed: {
    stateItem() {
      return (this.value && this.value.nameItemState) ? this.value.nameItemState : null
    },
    item() {
      return JSON.parse(JSON.stringify(this.stateItem ? this.$store.state.dataTable.tables[this.stateItem] : {}))
    },
    version() {
      return JSON.parse(JSON.stringify(this.stateItem ? this.$store.state.dataTable.tables[this.stateItem + 'Version'] : {}))
    }
  },
  watch: {
    'item'(val) {
      val && this.reloadPage()
    },
    'version'(val) {
      val && this.reloadHeaders(true)
    },
    'value.route': {
      handler(val) {
        if (val) {
          this.reloadCurrentPage()
        }
      },
      immediate: true
    },
    'value.headers'(items) {
      this.value.headersTable = JSON.parse(JSON.stringify(items)).sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }
        if (a.id < b.id) {
          return -1
        }
        return 0
      })
      if (this.value.nameItemState) {
        localStorage.setItem(this.value.nameItemState, JSON.stringify(items))
      }
    },
    'value.search'(val) {
      !val && this.reloadPage()
    },
    'value.sortBy': {
      handler(val, old) {
        if (val !== old) {
          this.formarSort()
        }
      },
      immediate: false,
      deep: true
    },
    'value.sortDesc': {
      handler(val, old) {
        if (val !== old) {
          this.formarSort()
        }
      },
      immediate: false,
      deep: true
    }
  },
  created() {
    this.$set(this.value, 'items', [])
    this.$set(this.value, 'filters', true)
    if (typeof this.value.buttonZone === 'undefined') {
      this.$set(this.value, 'buttonZone', false)
    }
    if (typeof this.value.advanceFilters === 'undefined') {
      this.$set(this.value, 'advanceFilters', false)
    }
    this.$set(this.value, 'search', '')
    this.$set(this.value, 'headers', [])
    this.$set(this.value, 'headersTable', [])
    if (!this.value.simplePaginate) this.$set(this.value, 'simplePaginate', false)
    if (!this.value.optionsPerPage) {
      this.$set(this.value, 'optionsPerPage', [
        {
          text: 15,
          value: 15
        },
        {
          text: 50,
          value: 50
        },
        {
          text: 100,
          value: 100
        },
        {
          text: 200,
          value: 200
        },
        {
          text: 500,
          value: 500
        },
        {
          text: 1000,
          value: 1000
        }
      ])
    }
    this.pagination.per_page = this.value.optionsPerPage[0].value
    if (this.stateItem && localStorage.getItem(this.stateItem + 'Version') === null) {
      this.reloadHeaders(true)
    } else if (this.stateItem && localStorage.getItem(this.stateItem + 'Version') && localStorage.getItem(this.stateItem + 'Version') !== this.version.toString()) {
      this.reloadHeaders(true)
    } else {
      this.reloadHeaders()
    }
    localStorage.setItem((this.stateItem + 'Version'), this.version)
  },
  methods: {
    formarSort: lodash.debounce(function () {
      this.stringSort = ''
      if (this.value.sortBy[0] && (typeof this.value.sortDesc[0] !== 'undefined')) {
        this.stringSort = `&sort=${this.value.sortDesc[0] ? '-' : ''}${this.value.sortBy[0]}`
      }
      this.reloadPage()
    }, 500),
    getProperty(obj, array) {
      while (array.length) {
        obj = obj[array.shift()]
      }
      return obj
    },
    reloadHeaders(force = false) {
      this.value.makeHeaders.forEach((item, index) => {
        item.id = index
        if (typeof item.visibleColumn === 'undefined') item.visibleColumn = true
      })
      if (this.value.nameItemState) {
        if (force) {
          localStorage.setItem(this.value.nameItemState, JSON.stringify(this.value.makeHeaders.filter(x => x.visibleColumn)))
        } else {
          if (localStorage.getItem(this.value.nameItemState) === null) {
            localStorage.setItem(this.value.nameItemState, JSON.stringify(this.value.makeHeaders.filter(x => x.visibleColumn)))
          }
        }
        this.value.headers = JSON.parse(localStorage.getItem(this.value.nameItemState))
      } else {
        this.value.headers = JSON.parse(JSON.stringify(this.value.makeHeaders.filter(x => x.visibleColumn)))
      }
    },
    reloadCurrentPage() {
      this.pagination.current_page = 1
      this.activePetition = true
      this.reloadPage()
    },
    async reloadPage() {
      if (this.activePetition) {
        this.activePetition = false
        this.loading = true
        this.axios.get(this.value.route + (this.value.route.indexOf('?') > -1 ? '&' : '?') + 'per_page=' + this.pagination.per_page + this.stringSort + '&page=' + this.pagination.current_page + '&filter[search]=' + ((this.value.search === null || typeof this.value.search === 'undefined') ? '' : this.value.search))
            .then(response => {
              this.filtrado = true
              response.data.per_page = this.value.optionsPerPage.find(page => page.value === parseInt(response.data.per_page)) ? parseInt(response.data.per_page) : -1
              this.pagination.last_page = response.data.last_page
              this.pagination.from = response.data.from
              this.pagination.to = response.data.to
              this.pagination.total = response.data.total
              this.pagination.next = response.data.next_page_url
              this.pagination.prev = response.data.prev_page_url
              this.tagsfilters = this.$slots && this.$slots.filters && this.$slots.filters[0] && this.$slots.filters[0].componentInstance ? this.$slots.filters[0].componentInstance.filters.models : []
              this.value.items = Object.freeze(response.data.data)
              this.loading = false
              this.activePetition = true
            })
            .catch(e => {
              this.loading = false
              this.activePetition = true
              this.$store.commit('SET_SNACKBAR', {
                color: 'error',
                message: `Error al hacer la búsqueda de registros.`,
                error: e
              })
            })
      }
    }
  }
}
</script>
