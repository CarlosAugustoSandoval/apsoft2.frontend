export default {
    path: '/',
    redirect: {name: 'Home'},
    component: () => import('@/layouts/full/Layout'),
    children: [
        {
            name: 'Home',
            path: 'home',
            component: () => import('@/modules/home/views/Home'),
            meta: {
                requiresAuth: true,
                title: {
                    text: 'Inicio',
                    icon: 'mdi-home',
                    color: 'light-blue'
                }
            }
        }
    ]
}