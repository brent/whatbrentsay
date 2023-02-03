export const POST_TYPE = {
  SHORT: 'short',
  LONG: 'long',
  FEATURE: 'feature',
};

export const getPostType = (post) => {
  const type = post.categories.nodes.find(category => {
    for (let type in POST_TYPE) {
      if (POST_TYPE[type] === category.name) {
        return POST_TYPE[type];
      }
    }
    return null;
  })

  return type.name;
};
