export const boardlist = [{ id: 1, title: '황소개구리' }, { id: 2, title: '황소개구리' }, { id: 3, title: '황소뿔' }, { id: 4, title: '황소뿔' }, { id: 5, title: '황소뿔' }, { id: 6, title: '황소뿔' }, { id: 7, title: '황소뿔' }, { id: 8, title: '황소뿔' }, { id: 9, title: '황소뿔' }, { id: 10, title: '황소뿔' }, { id: 11, title: '황소뿔' }, { id: 12, title: '황소뿔' }, { id: 13, title: '황소뿔' }, { id: 14, title: '황소뿔' }, { id: 15, title: '황소뿔' }];

let id = 0;
export function data(value) {
  const fake = { id, title: value };
  id += 1;
  return fake;
}
