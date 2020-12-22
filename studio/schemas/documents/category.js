// import client from 'part:@sanity/base/client'
// import { MdLink } from 'react-icons/md'

// function myAsyncSlugifier(input) {
//   const query = '*[_id == $id][0]'
//   const params = { id: input._ref }
//   return client.fetch(query, params).then(doc => {
//     return doc.title
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .slice(0, 200)
//   })
// }
export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ]
}
