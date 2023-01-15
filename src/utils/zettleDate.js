export const zettleDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // month is 0 indexed
  const day = dateObj.getDate();
  
  const padNum = (num) => num < 10 ? `${num}` : num;

  const hours = ((hours) => padNum(hours))(dateObj.getHours());
  const minutes = ((minutes) => padNum(minutes))(dateObj.getMinutes());

  return `${year}${month}${day}${hours}${minutes}`;
}
