export const groupRoutes = {
  path: '/groups/:scheduleId',
  name: 'GroupView',
  component: () => import('@/views/GroupView.vue'),
  children: [
    {
      path: 'account-form',
      name: 'AccountForm',
      component: () => import('@/components/splitbill/AccountForm.vue'),
    },
    {
      path: 'account-list',
      name: 'AccountList',
      component: () => import('@/components/splitbill/AccountList.vue'),
    },
    {
      path: 'balance-summary',
      name: 'BalanceSummary',
      component: () => import('@/components/splitbill/BalanceSummary.vue'),
    },
    {
      path: 'share-group',
      name: 'ShareGroup',
      component: () => import('@/components/splitbill/ShareGroup.vue'),
    },
  ],
};

