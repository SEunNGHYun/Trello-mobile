const day = new Date();

const month = day.getMonth() + 1; // 월
const date = day.getDate(); // 날짜
const TodayWeek = day.getDay();
const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];


export const today = `${month}월${date}일`;

export const tomorrow = `${month}월${date + 1}일`;

const after7 = new Date(Date.parse(day) + 7 * 1000 * 60 * 60 * 24);
const aftertMonth = after7.getMonth() + 1;
const aftertDate = day.getDate();
export const nextWeek = `${aftertMonth}월${aftertDate}일`;
export const nextWeekDay = week[TodayWeek];
