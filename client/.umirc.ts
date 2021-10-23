import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/2021-10-17', component: '@/pages/2021-10-17' },
    { path: '/2021-10-23', component: '@/pages/2021-10-23' },
    { path: '/2021-10-26', component: '@/pages/2021-10-26' },
    { path: '/2021-11-07', component: '@/pages/2021-11-07' },

  ],
  fastRefresh: {},
});
