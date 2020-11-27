export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5fc157dbd55272c6f4defdc7',
                  title: 'Sanity Studio',
                  name: 'ywst-mono-v-1-studio',
                  apiId: '23c6d035-5372-4db0-b9d1-a9ecccc0129a'
                },
                {
                  buildHookId: '5fc157db1c7659f87d49889f',
                  title: 'Blog Website',
                  name: 'ywst-mono-v-1',
                  apiId: 'a11873a6-bf79-484d-8d0c-df09d0441c09'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/leslie-fi/YWST-mono-v1',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://ywst-mono-v-1.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
