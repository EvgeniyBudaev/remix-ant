const countsByMonthBalances: Record<string, number> = {};

export const chartMockData = [
  { month: 'Янв', value: { crypto: 10.105, fiat: 10.105 } },
  { month: 'Янв', value: { crypto: 1.11, fiat: 1.11 } },
  { month: 'Фев', value: { crypto: 1.109, fiat: 1.109 } },
  { month: 'Фев', value: { crypto: 1.108, fiat: 1.108 } },
  { month: 'Фев', value: { crypto: 1.105, fiat: 1.105 } },
  // { month: 'Янв', value: 1.11 },
  // { month: 'Янв', value: 1.12 },
  // { month: 'Фев', value: 1.109 },
  // { month: 'Фев', value: 1.108 },
  // { month: 'Фев', value: 1.105 },
  // { month: 'Мар', value: 1.105 },
  // { month: 'Мар', value: 1.104 },
  // { month: 'Мар', value: 1.103 },
  // { month: 'Апр', value: 1.102 },
  // { month: 'Апр', value: 1.105 },
  // { month: 'Апр', value: 1.109 },
  // { month: 'Май', value: 1.119 },
  // { month: 'Май', value: 1.13 },
  // { month: 'Май', value: 1.13 },
  // { month: 'Июн', value: 1.13 },
  // { month: 'Июн', value: 1.13 },
  // { month: 'Июн', value: 1.13 },
  // { month: 'Июл', value: 1.13 },
  // { month: 'Июл', value: 1.149 },
  // { month: 'Июл', value: 1.128 },
  // { month: 'Авг', value: 1.137 },
  // { month: 'Авг', value: 1.137 },
  // { month: 'Авг', value: 1.137 },
  // { month: 'Сен', value: 1.137 },
  // { month: 'Сен', value: 1.137 },
  // { month: 'Сен', value: 1.137 },
  // { month: 'Окт', value: 1.137 },
  // { month: 'Окт', value: 1.137 },
  // { month: 'Окт', value: 1.137 },
  // { month: 'Ноя', value: 1.146 },
  // { month: 'Ноя', value: 1.148 },
  // { month: 'Ноя', value: 1.148 },
  // { month: 'Дек', value: 1.138 },
  // { month: 'Дек', value: 1.121 },
  // { month: 'Дек', value: 1.139 },
].map((item) => {
  if (!countsByMonthBalances[item.month]) {
    countsByMonthBalances[item.month] = 1;
  } else {
    countsByMonthBalances[item.month] += 1;
  }

  return { ...item, part: countsByMonthBalances[item.month] };
});

export const tdChartMockData = [
  {
    month: "дек. 2022",
    negative: { crypto: 0, fiat: 0 },
    part: 1,
    positive: { crypto: 4, fiat: 0 },
  },
  {
    month: "февр. 2023",
    negative: { crypto: 0, fiat: 0 },
    part: 2,
    positive: { crypto: 3, fiat: 5291935 },
  },
];

export const bdChartMockData = [
  { month: "дек. 2022", part: 1, value: { crypto: 420, fiat: 1092162055 } },
  { month: "февр. 2023", part: 2, value: { crypto: 520, fiat: 1192162055 } },
];
