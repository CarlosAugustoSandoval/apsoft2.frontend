export default {
    path: '/usuarios',
    redirect: {name: 'Usuarios'},
    component: () => import('@/layouts/full/Layout'),
    children: [
        {
            name: 'Usuarios',
            path: 'usuarios',
            component: () => import('@/modules/usuarios/views/Usuarios'),
            meta: {
                requiresAuth: true,
                withAccess: 'usuarios.inicio',
                title: {
                    text: 'Usuarios',
                    icon: 'mdi-account-group',
                    color: 'indigo',
                    breadcrumbs: [
                        {
                            text: 'Usuarios',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}