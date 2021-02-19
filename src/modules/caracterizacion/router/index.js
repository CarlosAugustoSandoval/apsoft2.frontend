export default {
    path: '/caracterizacion',
    redirect: {name: 'EncuestasCaracterizacion'},
    component: () => import('@/layouts/full/Layout'),
    children: [
        {
            name: 'EncuestasCaracterizacion',
            path: 'caracterizacion/encuestas',
            component: () => import('@/modules/caracterizacion/views/encuestas/Encuestas'),
            meta: {
                requiresAuth: true,
                withAccess: 'encuestas-caracterizacion.inicio',
                title: {
                    text: 'Encuestas',
                    icon: 'mdi-card-account-details',
                    color: 'orange',
                    breadcrumbs: [
                        {
                            text: 'Caracterización',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}