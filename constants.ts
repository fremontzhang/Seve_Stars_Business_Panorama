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

export interface DramaTheaterConfig {
    coopStatus: string;
    name: string;
    status: string;
    notes: string;
    dramaInterface: string;
    takedownLogic: string;
    downloadType: string;
    playSupport: boolean;
    taskInterface: boolean;
    tokenRule: string;
    tokenLen: string;
    appLink: boolean;
    shortLink: boolean;
    deepLink: string;
    orderSync: boolean;
    orderFreq: string;
    adSync: boolean;
    refundSupport: boolean;
    refundReturn: string;
    launchTime: boolean;
    mustReport: boolean;
    orderDataStatus: string;
    queryRange: string;
    authMethod: string;
}

export const THEATER_DRAMA_LIST: DramaTheaterConfig[] = [
  {
    name: 'kalosTV', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'API Filter (接口筛选)', takedownLogic: 'Support', downloadType: 'm3u8', playSupport: true, taskInterface: true, tokenRule: 'Dynamic No Limit (动态 没有数量限制)', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'Not Provided (未提供)', orderSync: true, orderFreq: '10-20m', adSync: false, refundSupport: true, refundReturn: 'Filter Supported', launchTime: false, mustReport: true, orderDataStatus: 'ID for Homepage (首也订单也给ID)', queryRange: 'Range 7+ (区间查询 7+)', authMethod: 'Token once'
  },
  {
    name: 'goodShort', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'Retroactive (遍历判断)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: 'Static No Limit (静态 没有数量限制)', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'Manual Config (人工配置)', orderSync: true, orderFreq: '10-15m', adSync: false, refundSupport: true, refundReturn: 'Paging 500 (分页500)', launchTime: false, mustReport: false, orderDataStatus: 'Only Token Orders (仅有口令码订单)', queryRange: 'Range 7+ (区间查询 7+)', authMethod: '-'
  },
  {
    name: 'sereal+', coopStatus: 'Paused', status: 'Offline (已下线)', notes: 'qps=1', dramaInterface: 'Offline Notice (线下通知)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: 'Dynamic 5000/w (动态 每周5000)', tokenLen: '5', appLink: true, shortLink: true, deepLink: '-', orderSync: true, orderFreq: 'Daily 1.24 (天级)', adSync: false, refundSupport: true, refundReturn: 'Order has Amt (订单数据上有退款金额)', launchTime: false, mustReport: false, orderDataStatus: 'Only Token Orders (仅有口令码订单)', queryRange: 'Range 7+ (区间查询 7+)', authMethod: '-'
  },
  {
    name: 'moboReels', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'API Filter (接口筛选)', takedownLogic: 'Support', downloadType: '-', playSupport: true, taskInterface: true, tokenRule: 'Static (静态)', tokenLen: '5', appLink: true, shortLink: true, deepLink: 'API Return (接口返回)', orderSync: true, orderFreq: '10-15m', adSync: true, refundSupport: true, refundReturn: 'Filter Supported', launchTime: false, mustReport: false, orderDataStatus: '3 Types (三种类型订单)', queryRange: 'Range Max 31', authMethod: 'Sign (签名)'
  },
  {
    name: 'dramaBox', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'None (无)', takedownLogic: 'Click Link (支持, 需要从素材链接点击进入)', downloadType: '-', playSupport: true, taskInterface: true, tokenRule: 'Dynamic 5000/w', tokenLen: '5', appLink: false, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Daily 5:15 (天级)', adSync: false, refundSupport: false, refundReturn: 'No Refund (无退款)', launchTime: true, mustReport: true, orderDataStatus: 'Only Token Orders (仅有口令码订单)', queryRange: 'Single Day (单天查询)', authMethod: '-'
  },
  {
    name: 'dreameShort', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'None (无)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: false, taskInterface: false, tokenRule: 'No Support (不支持口令)', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Daily 8:15', adSync: false, refundSupport: true, refundReturn: 'Pay+Refund (两条订单)', launchTime: false, mustReport: false, orderDataStatus: '-', queryRange: 'Single Day (单天查询)', authMethod: '-'
  },
  {
    name: 'shotShort', coopStatus: 'Paused', status: 'Offline (已下线)', notes: '', dramaInterface: 'API Filter (接口筛选)', takedownLogic: 'Not Supported', downloadType: '-', playSupport: false, taskInterface: false, tokenRule: 'Static (静态)', tokenLen: '6', appLink: false, shortLink: false, deepLink: '-', orderSync: true, orderFreq: 'Realtime (实时)', adSync: false, refundSupport: true, refundReturn: 'Single Interface (一条订单)', launchTime: false, mustReport: false, orderDataStatus: 'No ID on Home (首页订单不给ID)', queryRange: 'Range 7+', authMethod: 'Sign (签名)'
  },
  {
    name: 'stardustTV', coopStatus: 'Paused', status: 'Online (已上线)', notes: 'IP Limit 300/m', dramaInterface: 'API Filter (接口筛选)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: 'Static No Limit', tokenLen: '8', appLink: true, shortLink: true, deepLink: '-', orderSync: true, orderFreq: '1/hr (1小时)', adSync: false, refundSupport: false, refundReturn: 'Single Interface', launchTime: false, mustReport: false, orderDataStatus: '-', queryRange: 'Range 7+', authMethod: '-'
  },
  {
    name: 'snackShort', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'None (暂无)', takedownLogic: 'Support', downloadType: 'm3u8/mp4', playSupport: true, taskInterface: true, tokenRule: 'Dynamic 1000/d (动态 每天自然日限定1000个)', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Realtime (实时)', adSync: false, refundSupport: false, refundReturn: 'None (暂无)', launchTime: true, mustReport: false, orderDataStatus: 'promote_id', queryRange: 'Range 7+', authMethod: 'token'
  },
  {
    name: 'touchshort', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'Separate API (单独接口)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: 'Dynamic (动态)', tokenLen: '8', appLink: false, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Realtime (实时)', adSync: false, refundSupport: true, refundReturn: 'Single Interface (单独接口)', launchTime: true, mustReport: false, orderDataStatus: 'promotionId', queryRange: 'Range 3+ (30天)', authMethod: 'Token once'
  },
  {
    name: 'rinobox', coopStatus: '', status: 'Dev (对方开发中)', notes: '', dramaInterface: '-', takedownLogic: '-', downloadType: '-', playSupport: false, taskInterface: false, tokenRule: '-', tokenLen: '-', appLink: false, shortLink: false, deepLink: '-', orderSync: false, orderFreq: '-', adSync: false, refundSupport: false, refundReturn: '-', launchTime: false, mustReport: false, orderDataStatus: '-', queryRange: '-', authMethod: '-'
  },
  {
    name: 'flickreels', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'API Filter (接口筛选)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: 'Static No Limit', tokenLen: '6', appLink: false, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: '10-20m', adSync: true, refundSupport: true, refundReturn: 'Single Interface (单独接口)', launchTime: false, mustReport: false, orderDataStatus: 'Only Open Chain (仅有开剧链接订单)', queryRange: 'Range 7', authMethod: 'Sign (签名)'
  },
  {
    name: 'reelshort', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'None (无)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: '1000/drama (每部剧1000个)', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Day 2 18:00 (第二天)', adSync: false, refundSupport: true, refundReturn: 'Negative Value (接口返回值筛选)', launchTime: true, mustReport: true, orderDataStatus: '3 Types (三种类型)', queryRange: 'Range 20', authMethod: 'token'
  },
  {
    name: 'honeyreels', coopStatus: '', status: 'Online (已上线)', notes: 'Default QPS 10', dramaInterface: 'No Return if Down (下架短剧不返回)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: true, tokenRule: '-', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Realtime (实时)', adSync: false, refundSupport: true, refundReturn: 'Return Value (接口返回值筛选)', launchTime: true, mustReport: false, orderDataStatus: 'link_id', queryRange: 'Range 30+', authMethod: 'token'
  },
  {
    name: 'shortmax', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'No Return if Down (下架短剧不返回)', takedownLogic: 'Support', downloadType: 'mp4', playSupport: true, taskInterface: false, tokenRule: 'No Support (不支持口令)', tokenLen: '-', appLink: true, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: '1/hr (1小时)', adSync: false, refundSupport: false, refundReturn: '-', launchTime: true, mustReport: true, orderDataStatus: 'promotionCode', queryRange: 'Range 30+', authMethod: 'token (Get new if expired)'
  },
  {
    name: 'pancake', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'Retroactive (遍历判断)', takedownLogic: 'Not Supported', downloadType: '-', playSupport: true, taskInterface: true, tokenRule: 'Dynamic No Limit', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'No (无)', orderSync: true, orderFreq: 'Day-1 Data', adSync: false, refundSupport: true, refundReturn: 'Filter Supported', launchTime: true, mustReport: true, orderDataStatus: 'code', queryRange: 'Range 30d', authMethod: 'token (refresh)'
  },
  {
    name: 'flareflow', coopStatus: '', status: 'Online (已上线)', notes: '', dramaInterface: 'API Filter (接口筛选)', takedownLogic: 'Not Supported', downloadType: '-', playSupport: true, taskInterface: false, tokenRule: '-', tokenLen: '-', appLink: false, shortLink: true, deepLink: 'Auto Jump (会自动跳转)', orderSync: true, orderFreq: 'Realtime (实时)', adSync: false, refundSupport: true, refundReturn: 'Filter Supported', launchTime: true, mustReport: false, orderDataStatus: 'promote_id', queryRange: 'Range 30+', authMethod: 'token once'
  },
  {
    name: 'starshort', coopStatus: 'Pending', status: 'Dev (待上线)', notes: 'No QPS Limit', dramaInterface: 'Retroactive (遍历判断)', takedownLogic: 'Support', downloadType: 'm3u8', playSupport: true, taskInterface: true, tokenRule: 'Dynamic 1/acct (动态 一个账号申请一个)', tokenLen: '6', appLink: true, shortLink: true, deepLink: 'Auto Jump (会自动跳转)', orderSync: true, orderFreq: 'Realtime (实时)', adSync: false, refundSupport: false, refundReturn: 'No Refund', launchTime: true, mustReport: false, orderDataStatus: '3 Types', queryRange: 'Range 30+', authMethod: 'Sign'
  },
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