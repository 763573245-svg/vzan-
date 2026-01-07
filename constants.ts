
import { StyleType } from './types';

export const STYLE_CONFIGS = [
  {
    type: StyleType.PROFESSIONAL,
    description: '适用于正式商务场合，显得严谨可靠。',
    icon: '👔',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    type: StyleType.FRIENDLY,
    description: '拉近客户距离，像朋友一样沟通。',
    icon: '😊',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    type: StyleType.EMPATHETIC,
    description: '处理投诉或情感需求，展现理解与关怀。',
    icon: '🧡',
    color: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  {
    type: StyleType.CONCISE,
    description: '直奔主题，高效解决问题，不拖泥带水。',
    icon: '⚡',
    color: 'bg-gray-50 text-gray-700 border-gray-200'
  },
  {
    type: StyleType.HUMOROUS,
    description: '适当玩梗，化解尴尬，增加品牌趣味性。',
    icon: '🤡',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    type: StyleType.PERSUASIVE,
    description: '侧重价值传递，引导客户做出决策。',
    icon: '📈',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  }
];

export const CONTEXTS = [
  '常规咨询',
  '售后投诉',
  '产品推介',
  '拒绝请求',
  '节日问候',
  '邀约回访'
  '消息通知'

];
