// char data
export const itemsMenu = [
    {
        id: 'inicio',
        title: 'Inicio',
        subtitle: null,
        icon: 'mdi-home',
        color: 'light-blue',
        routeName: 'Home',
        typeRoute: 'general'
    },
    {
        id: 'usuarios',
        title: 'Usuarios',
        subtitle: null,
        icon: 'mdi-account-group',
        color: 'indigo',
        routeName: 'Usuarios',
        typeRoute: 'administrativo'
    },
    {
        id: 'roles',
        title: 'Roles',
        subtitle: 'Roles y Permisos',
        icon: 'mdi-account-switch',
        color: 'blue',
        routeName: 'Roles',
        typeRoute: 'administrativo'
    },
    {
        id: 'encuestasCaracterizacion',
        title: 'Encuestas',
        subtitle: 'Caracterización',
        icon: 'mdi-card-account-details',
        color: 'orange',
        routeName: 'EncuestasCaracterizacion',
        typeRoute: 'caracterizacion'
    },
    {
        id: 'Estadisticas',
        title: 'Estadisticas',
        subtitle: '',
        icon: 'mdi mdi-chart-scatter-plot',
        color: 'purple',
        routeName: 'Estadisticas',
        typeRoute: 'caracterizacion'
    }
]