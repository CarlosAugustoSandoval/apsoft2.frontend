export default {
    path: '/roles',
    redirect: {name: 'Roles'},
    component: () => import('@/layouts/full/Layout'),
    children: [
        {
            name: 'Roles',
            path: 'roles',
            component: () => import('@/modules/roles/views/Roles'),
            meta: {
                requiresAuth: true,
                withAccess: 'roles.inicio',
                title: {
                    text: 'Roles',
                    icon: 'mdi-account-switch',
                    color: 'blue',
                    breadcrumbs: [
                        {
                            text: 'Roles y Permisos',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}