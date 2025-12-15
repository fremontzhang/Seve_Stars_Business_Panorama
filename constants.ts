import { Users, PlayCircle, Wallet, FileText, CheckCircle, ArrowRight, Network, Map } from 'lucide-react';

// Navigation Items
export const NAV_ITEMS = [
  { id: 'intro', label: 'Overview (概览)', icon: FileText },
  { id: 'panorama', label: 'Business Panorama (业务全景)', icon: Map },
  { id: 'flows', label: 'Process Flows (流程梳理)', icon: ArrowRight },
  { id: 'access', label: 'Theater Access (剧场接入)', icon: Network }, 
  { id: 'calculator', label: 'Commission Calculator (佣金计算)', icon: Wallet },
  { id: 'onboarding', label: 'Reporting & Onboarding (报备与接入)', icon: CheckCircle },
];

// Roles defined in the doc
export const ROLES = [
  { 
    title: 'Influencer (达人/推广方)', 
    desc: 'Promotes short dramas/novels to earn commission via links. (通过推广短剧、小说来获取收益)',
    icon: Users,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    title: 'Platform (七星平台)', 
    desc: 'Aggregates content, manages orders, and handles settlement. (聚合内容，管理订单，达人/分销商/平台间分佣)',
    icon: PlayCircle,
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    title: 'Theater (剧场方)', 
    desc: 'Provides content (dramas), combats piracy, and pays commission. (提供短剧内容，打击盗版，支付分成)',
    icon: FileText,
    color: 'bg-emerald-100 text-emerald-600'
  },
  { 
    title: 'Distributor (分销商)', 
    desc: 'Intermediary managing teams of influencers. (管理达人团队，参与分佣)',
    icon: Users,
    color: 'bg-orange-100 text-orange-600'
  }
];

// Data for Reporting Section
export const REPORTING_STEPS = [
  {
    title: 'Online Reporting (线上报备)',
    desc: 'Automated API check via Seven Stars dashboard avatar. (七星首页头像——账号报备——接口自动审核)',
    status: 'Optimized in Nov (11月优化)',
    details: ['Interface Validation (接口校验)', 'Account Risk Check (账号风险)', 'Duplicate Material Check (超发素材)']
  },
  {
    title: 'Offline Reporting (线下报备)',
    desc: 'Manual Excel import by operations team. (线下沟通——运营后台导入)',
    status: 'Fallback (老流程)',
    details: ['Used for non-digital scenarios (未线上化场景)', 'Manual communication required (线下沟通)', 'Slower processing (需人工介入)']
  }
];

// --- NEW DATA FOR THEATER ACCESS ---

export const ACCESS_DICTIONARY = [
  { term: 'Token Code (口令码)', desc: 'Quantity varies based on theater rules. (根据不同剧场的规则，获取数量不同)' },
  { term: 'Order Integration (订单接入情况)', desc: 'Whether order data is accessed. (是否接入订单数据)' },
  { term: 'Order Update (订单更新)', desc: 'Time frequency of order updates. (订单更新时间)' },
  { term: 'Refund Support (是否支持退款)', desc: 'Whether refund orders are provided. (是否提供退款订单)' },
  { term: 'Launch Time (上架/发布时间)', desc: 'Displayed from theater API if supported, otherwise our fetch time. (1.对方接口支持则展示对方时间 2.不支持则展示拉取时间)' },
  { term: 'Mandatory Reporting (必须报备)', desc: 'Whether reporting is strictly required for this theater. (各个剧场报备是否必须)' },
  { term: 'Ads Integration (广告接入)', desc: 'Whether ad revenue/data is integrated. (是否接入广告)' },
];

export const THEATER_DRAMA_LIST = [
  { name: 'KalosTV', status: 'Online (已上线)', filter: 'API Filter (接口筛选)', download: true, notes: '' },
  { name: 'GoodShort', status: 'Online (已上线)', filter: 'Retroactive (遍历判断)', download: true, notes: '' },
  { name: 'Sereal+', status: 'Paused (暂停合作)', filter: 'Offline Notice (线下通知)', download: true, notes: 'QPS=1 limit' },
  { name: 'MoboReels', status: 'Paused (暂停合作)', filter: 'API Filter (接口筛选)', download: false, notes: '' },
  { name: 'DramaBox', status: 'Online (已上线)', filter: 'None (无)', download: true, notes: 'Need click material link (需要从素材链接点击进入)' },
  { name: 'DreameShort', status: 'Online (已上线)', filter: 'None (无)', download: true, notes: '' },
  { name: 'ShotShort', status: 'Paused (暂停合作)', filter: 'API Filter (接口筛选)', download: false, notes: 'Not Supported (不支持)' },
  { name: 'StardustTV', status: 'Paused (暂停合作)', filter: 'API Filter (接口筛选)', download: true, notes: 'Same IP limit, 300 req/min (同一ip限制请求每分钟300次)' },
  { name: 'SnackShort', status: 'Online (已上线)', filter: 'None (暂无)', download: true, notes: '' },
  { name: 'TouchShort', status: 'Online (已上线)', filter: 'Separate API (单独接口)', download: true, notes: '' },
  { name: 'Rinobox', status: 'Dev (对方开发中)', filter: '-', download: false, notes: '' },
  { name: 'FlickReels', status: 'Online (已上线)', filter: 'API Filter (接口筛选)', download: true, notes: '' },
  { name: 'ReelShort', status: 'Online (已上线)', filter: 'None (无)', download: true, notes: '' },
  { name: 'HoneyReels', status: 'Online (已上线)', filter: 'Remove Taken Down (下架短剧不返回)', download: true, notes: 'Default QPS 10' },
  { name: 'ShortMax', status: 'Online (已上线)', filter: 'Remove Taken Down (下架短剧不返回)', download: true, notes: '' },
  { name: 'Pancake', status: 'Online (已上线)', filter: 'Retroactive (遍历判断)', download: false, notes: 'Not Supported' },
  { name: 'Flareflow', status: 'Online (已上线)', filter: 'API Filter (接口筛选)', download: false, notes: 'Not Supported' },
];

export const THEATER_NOVEL_LIST = [
  { name: 'NovelShort', offlineLogic: 'Separate API (单独接口)', tokenType: 'Static (静态)', tokenLen: 6, orderSync: 'Real-time' },
  { name: 'Novel Master', offlineLogic: 'Separate API (单独接口)', tokenType: 'Static (静态)', tokenLen: 6, orderSync: 'Real-time' },
  { name: 'RealNovel', offlineLogic: 'None (没有下架逻辑)', tokenType: 'Dynamic (动态)', tokenLen: 4, orderSync: 'Real-time' },
  { name: 'GoodNovel', offlineLogic: 'Return Value Filter (接口返回值筛选)', tokenType: 'Dynamic (动态)', tokenLen: 6, orderSync: 'Real-time' },
  { name: 'My Fiction', offlineLogic: 'Return Only Online (接口只返回上架态)', tokenType: 'Dynamic (动态)', tokenLen: 6, orderSync: '15 Hours' },
  { name: 'Motonovel', offlineLogic: 'Return Only Online (接口只返回上架态)', tokenType: 'Dynamic (动态)', tokenLen: '-', orderSync: 'Real-time' },
  { name: 'NovelLia', offlineLogic: 'Return Value Status (接口值返回上架状态)', tokenType: 'Dynamic (动态)', tokenLen: '-', orderSync: 'Real-time' },
  { name: 'SnackShort', offlineLogic: 'Return Only Online (接口值返回上架状态)', tokenType: 'Dynamic (动态)', tokenLen: 6, orderSync: '-' },
  { name: 'Literie', offlineLogic: 'Return Only Online (接口值返回上架状态)', tokenType: 'Dynamic (动态)', tokenLen: 6, orderSync: 'Real-time' },
  { name: 'Novelgo', offlineLogic: 'Separate API (单独下架接口)', tokenType: 'Dynamic (动态)', tokenLen: 6, orderSync: 'Real-time' },
];

export const PENDING_ACCESS = [
  { name: 'Rinobox', type: 'Short Drama (短剧)', status: 'Dev (对方开发中)', delivery: '-' },
  { name: 'FF', type: 'Short Drama (短剧)', status: 'Scheduling (对方排期中)', delivery: 'End of Oct (10月底)' },
  { name: 'Chinese Anime H5 (中文动态漫)', type: 'Anime (动态漫)', status: 'Online (已经上线)', delivery: '-' },
];

export const DRAMA_LIST_RESOURCES = [
  { name: 'KalosTV', link: 'KalosTV Overseas List (海外剧单)' },
  { name: 'DramaBox', link: 'Docs: QQ Sheet ...BB08J2' },
  { name: 'GoodShort', link: 'GoodShort Promo List (短剧推广剧单)' },
  { name: 'MoboReels', link: 'MoboReels Overseas KOC List (海外koc分销剧单)' },
  { name: 'ShotShort', link: 'Peanut Shot Short New List (花生Shot Short分销剧单新版)' },
  { name: 'SnackShort', link: 'SnackShort Drama List' },
  { name: 'StardustTV', link: 'Shanhai Overseas (山海海外短剧——CPS 专用)' },
  { name: 'Literie', link: 'Book Master Sheet (书籍总表格)' },
  { name: 'Pancake', link: 'Anime List (动态漫剧单表)' },
];