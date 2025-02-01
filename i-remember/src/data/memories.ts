// src/data/memories.ts
const memories = [
  {
    id: 1,
    title: '夏日海滩',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '阳光洒在金色的沙滩上，海浪轻轻拍打着岸边，孩子们在沙滩上奔跑嬉戏，天空蔚蓝无垠，点缀着几朵白云。海风拂过脸颊，带着淡淡的咸味，令人心旷神怡。',
    date: '2023-07-15',
  },
  {
    id: 2,
    title: '冬日雪景',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '白雪覆盖了整个山林，树枝上挂满了晶莹的冰凌，空气中弥漫着寒冷的气息。湖面结了厚厚的冰，人们在上面滑冰，欢声笑语在雪地里回荡。',
    date: '2023-01-20',
  },
  {
    id: 3,
    title: '秋日登山',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '秋天的山林五彩斑斓，枫叶红似火，金黄的银杏叶铺满小径。登山途中，微风拂面，远处的山峰被晨曦染上了温暖的色彩。',
    date: '2023-10-05',
  },
  {
    id: 4,
    title: '春日樱花祭',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '樱花纷纷扬扬飘落，粉色的花瓣铺满地面，如同梦境一般。人们在樱花树下野餐，品味美食，享受春天的温暖气息。',
    date: '2023-04-08',
  },
  {
    id: 5,
    title: '夜市探险',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '夜市灯火辉煌，各种小吃摊位排满街道，香气四溢。炸鸡、烤串、糖葫芦……每一口都是美味的体验。',
    date: '2023-06-22',
  },
  {
    id: 6,
    title: '夏日海滩',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '阳光洒在金色的沙滩上，海浪轻轻拍打着岸边，孩子们在沙滩上奔跑嬉戏，天空蔚蓝无垠，点缀着几朵白云。海风拂过脸颊，带着淡淡的咸味，令人心旷神怡。',
    date: '2023-07-15',
  },
  {
    id: 7,
    title: '冬日雪景',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '白雪覆盖了整个山林，树枝上挂满了晶莹的冰凌，空气中弥漫着寒冷的气息。湖面结了厚厚的冰，人们在上面滑冰，欢声笑语在雪地里回荡。',
    date: '2023-01-20',
  },
  {
    id: 8,
    title: '秋日登山',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '秋天的山林五彩斑斓，枫叶红似火，金黄的银杏叶铺满小径。登山途中，微风拂面，远处的山峰被晨曦染上了温暖的色彩。',
    date: '2023-10-05',
  },
  {
    id: 9,
    title: '春日樱花祭',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '樱花纷纷扬扬飘落，粉色的花瓣铺满地面，如同梦境一般。人们在樱花树下野餐，品味美食，享受春天的温暖气息。',
    date: '2023-04-08',
  },
  {
    id: 10,
    title: '夜市探险',
    imageUrls: ['https://avatars.githubusercontent.com/u/59861477?v=4','https://lh3.googleusercontent.com/ogw/AF2bZyhA0IlAt_TpS-7JIfFa02llRvtU3rFuLhKQO0Wi6mzhuQ=s64-c-mo'],
    content: '夜市灯火辉煌，各种小吃摊位排满街道，香气四溢。炸鸡、烤串、糖葫芦……每一口都是美味的体验。',
    date: '2023-06-22',
  },
];

export default memories;