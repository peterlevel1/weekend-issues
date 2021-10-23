import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/2021-10-17', component: '@/pages/2021-10-17' },
    { path: '/1023', component: '@/pages/1023' },
  ],
  fastRefresh: {},
});
