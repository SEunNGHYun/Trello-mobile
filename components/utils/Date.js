
const Nday = new Date();

const month = Nday.getMonth() + 1; // 월
const Gdate = Nday.getDate(); // 날짜
const TodayWeek = Nday.getDay();
export const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];


export const today = `${month}월${Gdate}일`;

export const tomorrow = `${month}월${Gdate + 1}일`;

const after7 = new Date(Date.parse(Nday) + 7 * 1000 * 60 * 60 * 24);
const aftertMonth = after7.getMonth() + 1;
const aftertDate = Nday.getDate();
export const nextWeek = `${aftertMonth}월${aftertDate}일`;
export const nextWeekDay = week[TodayWeek];

export function changeDate(Xdate, time) {
  const date = Xdate.getDate();
  const year = Xdate.getFullYear();
  const Month = Xdate.getMonth() + 1;
  const hours = time.getHours();
  const Day = time.getDay();
  const minutes = time.getMinutes();
  return `${year}-${Month}-${date} ${week[Day]} ${hours}:${minutes}`;
}
