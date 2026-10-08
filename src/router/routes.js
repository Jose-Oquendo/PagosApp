const routes = [
  {
    path: '/',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('@/pages/LoginPage.vue'),
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
        path: 'second',
        name: 'second',
        component: () => import('@/pages/index/second.vue'),
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
