import Vue from 'vue'
// Inputs components
import CText from '@/components/globalComponents/CText'
import CPassword from '@/components/globalComponents/CPassword'
import CDate from '@/components/globalComponents/CDate'
import CDateRange from '@/components/globalComponents/CDateRange'
import CRadio from '@/components/globalComponents/CRadio'
import CCheck from '@/components/globalComponents/CCheck'
import CChipFilters from '@/components/globalComponents/CChipFilters'
import CTooltip from '@/components/globalComponents/CTooltip'
import CSelectComplete from '@/components/globalComponents/CSelectComplete'
import CNumber from '@/components/globalComponents/CNumber'
import CTextArea from '@/components/globalComponents/CTextArea'
import CLocation from '@/components/globalComponents/CTextArea'

import CDialog from '@/components/globalComponents/CDialog'
import ViewTitle from '@/components/globalComponents/ViewTitle'
import IconBase from '@/components/globalComponents/IconBase'

import Snackbar from '@/modules/snackbar/components/Snackbar'
import Loading from '@/modules/loading/components/Loading'
import DataTable from '@/modules/dataTable/components/DataTable'

Vue.use({
  install (Vue) {
    Vue.component('CText', CText)
    Vue.component('CPassword', CPassword)
    Vue.component('CDate', CDate)
    Vue.component('CDateRange', CDateRange)
    Vue.component('CRadio', CRadio)
    Vue.component('CCheck', CCheck)
    Vue.component('CChipFilters', CChipFilters)
    Vue.component('CTooltip', CTooltip)
    Vue.component('CSelectComplete', CSelectComplete)
    Vue.component('CNumber', CNumber)
    Vue.component('CTextArea', CTextArea)
    Vue.component('CLocation', CLocation)

    Vue.component('CDialog', CDialog)
    Vue.component('ViewTitle', ViewTitle)
    Vue.component('IconBase', IconBase)

    Vue.component('Snackbar', Snackbar)
    Vue.component('Loading', Loading)
    Vue.component('DataTable', DataTable)
  }
})
