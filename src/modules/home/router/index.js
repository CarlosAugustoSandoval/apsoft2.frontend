// export default {
//     path: '/',
//     redirect: {name: 'Home'},
//     component: () => import('@/layouts/full/Layout'),
//     children: [
//         {
//             name: 'Home',
//             path: 'home',
//             component: () => import('@/modules/home/views/Home'),
//             meta: {
//                 requiresAuth: true,
//                 title: {
//                     text: 'Inicio',
//                     icon: 'mdi-home',
//                     color: 'light-blue'
//                 }
//             }
//         }
//     ]
// }

export default {
    path: '/',
    redirect: {name: 'EncuestasCaracterizacion'},
    component: () => import('@/layouts/full/Layout'),
    children: [
        {
            name: 'Home',
            path: 'home',
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