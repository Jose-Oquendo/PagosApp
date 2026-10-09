const routes = [
  {
    path: '/',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('@/pages/auth/LoginPage.vue'),
  },
  {
    path: '/main',
    component: () => import('@/pages/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/index/HomePage.vue'),
      },
      {
        path: '/payments',
        name: 'payments',
        component: () => import('@/pages/index/PaymentPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    meta: { requiresAuth: false },
    component: () => import('@/pages/[...path].vue'),
  },
]

export default routes
