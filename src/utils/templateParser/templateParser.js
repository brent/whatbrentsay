const path = require(`path`)
const defaultPost = path.resolve(`../../templates/post/post.js`)

const tagPrefix = 'POST_';

export const stripTemplateTagFromTags = (template, tags) => {
  if (!template || template === '' || template === undefined || template === null || template.length === 0) {
    return tags;
  }

  const displayTags = tags.filter((tag) => {
    return tag !== `${tagPrefix}${template}`;
  })

  return displayTags;
}

export const getTemplateTag = (tags) => {
  let tag = tags.filter((tag) => tag.match(tagPrefix))[0];
  if (tag) {
    return tag.split('POST_')[1];
  }
}
