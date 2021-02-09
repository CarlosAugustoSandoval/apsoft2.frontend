// state
const state = {
    tiposIdentificacion: [
        { tipo: 'CC', descripcion: 'Cedula de Ciudadania' },
        { tipo: 'CE', descripcion: 'Cédula de Extranjería' },
        { tipo: 'NI', descripcion: 'NIT' },
        { tipo: 'PE', descripcion: 'Permiso Especial de Permanencia' }
    ],
    tiposTercero: [
        'Propietario Vehiculo',
        'Conductor',
        'Proveedor',
        'Cliente',
        'Empleado',
        'Otro'
    ],
    tiposContribuyente: [
        'Persona Natural',
        'Persona Jurídica'
    ],
    unidadesFrecuencia: [
        'Meses',
        'Kilometros'
    ],
    tiposCombustible: [
        'Diesel',
        'Gasolina',
        'Gas-gasolina',
        'Vehiculo electrico'
    ],
    tiposTraccion: [
        'Delantera',
        'Trasera',
        'Total',
        '4x4'
    ],
    tiposAceite: [
        'Sintetico',
        'Semi-sintetico',
        'Alto kilometraje',
        'Convencional'
    ],
    tiposTransmision: [
        'Manual',
        'Semi-automatico',
        'Automatico',
        'Automatico-CVT'
    ],
    tiposFreno: [
        'Disco',
        'Tambor'
    ]
}

// getters
const getters = {
    tiposIdentificacion: state => {
        return state.tiposIdentificacion
    },
    tiposTercero: state => {
        return state.tiposTercero
    },
    tiposContribuyente: state => {
        return state.tiposContribuyente
    },
    unidadesFrecuencia: state => {
        return state.unidadesFrecuencia
    },
    tiposCombustible: state => {
        return state.tiposCombustible
    },
    tiposTraccion: state => {
        return state.tiposTraccion
    },
    tiposAceite: state => {
        return state.tiposAceite
    },
    tiposTransmision: state => {
        return state.tiposTransmision
    },
    tiposFreno: state => {
        return state.tiposFreno
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
    state,
    getters,
    actions,
    mutations
}
