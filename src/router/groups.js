import Group from '@/views/Group.vue';
import AccountForm from '@/components/splitbill/AccountForm.vue';
import AccountList from '@/components/splitbill/AccountList.vue';
import BalanceSummary from '@/components/splitbill/BalanceSummary.vue';
import ShareGroup from '@/components/splitbill/ShareGroup.vue';

export const groupRoutes = {
  path: '/groups',
  name: 'GroupView',
  component: () => import('@/views/Group.vue'),
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

