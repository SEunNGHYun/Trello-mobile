const day = new Date();

const month = day.getMonth() + 1; // 월
const date = day.getDate(); // 날짜


export const today = `${month}월${date}일`;

export const tomorrow = `${month}월${date + 1}일`;
