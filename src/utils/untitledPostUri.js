export const untitledPostUri = (postDate) => {
  const padNum = (num) => `0${num}`;

  const formatDateComponent = ((dateComponent) => {
    let value = dateComponent;
    return value < 10 ? padNum(value) : value;
  });

  const postDateObj = new Date(postDate);

  const year = postDateObj.getFullYear();

  const month = formatDateComponent(postDateObj.getMonth() + 1);
  const day = formatDateComponent(postDateObj.getDate());
  const hour = formatDateComponent(postDateObj.getHours());
  const min = formatDateComponent(postDateObj.getMinutes());

  return `/${year}/${month}/${day}/${hour}${min}/`;
}
