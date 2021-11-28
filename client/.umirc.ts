import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/2021-10-17', component: '@/pages/2021-10-17' },
        { path: '/2021-10-26', component: '@/pages/2021-10-26' },
        { path: '/2021-11-07', component: '@/pages/2021-11-07' },
        { path: '/2021-11-28', component: '@/pages/2021-11-28' },
        { path: '/2021-11-28-0/:id', component: '@/pages/2021-11-28-0' },
      ]
    },
  ],
  fastRefresh: {},
});
