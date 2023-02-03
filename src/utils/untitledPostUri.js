export const untitledPostUri = (postDate) => {
  const padNum = (num) => `0${num}`;

  const postDateObj = new Date(postDate);

  const year = postDateObj.getFullYear();

  const month = (() => {
    let month = postDateObj.getMonth() + 1; // zero-indexed
    return month < 10 ? padNum(month) : month;
  })();

  const day = (() => {
    let day = postDateObj.getDate();
    return day < 10 ? padNum(day) : day;
  })();

  const hour = (() => {
    let hour = postDateObj.getHours();
    return hour < 10 ? padNum(hour) : hour;
  })();

  const min = (() => {
    let min = postDateObj.getMinutes();
    return min < 10 ? padNum(min) : min;
  })();

  return `/${year}/${month}/${day}/${hour}${min}/`;
}
