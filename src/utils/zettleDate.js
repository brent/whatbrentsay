export const zettleDate = (date) => {
  const padNum = (num) => num < 10 ? `0${num}` : num;

  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = ((month) => padNum(month + 1))(dateObj.getMonth()); // month is 0 indexed
  const day = ((day) => padNum(day))(dateObj.getDate());
  const hours = ((hours) => padNum(hours))(dateObj.getHours());
  const minutes = ((minutes) => padNum(minutes))(dateObj.getMinutes());

  return `${year}${month}${day}${hours}${minutes}`;
}
