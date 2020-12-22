const { isFuture, parseISO } = require("date-fns");
const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@utils": path.resolve(__dirname, "src/utils")
      },
    },
  });
};

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        totalCount
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];
  const datePublished = (date) => parseISO(date);

  postEdges
    .filter((edge) => !isFuture(datePublished(edge.node.publishedAt)))
    .forEach((edge, index) => {
      const { id, slug = {}, publishedAt } = edge.node;
      const path = `/blog/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id },
      });
    });
}

async function createCategoryPages(graphql, actions) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSanityCategory {
        nodes {
          slug {
            current
          }
          id
        }
      }
    }
  `);
 
  if (result.errors) throw result.errors;

  const categoryNodes = (result.data.allSanityCategory || {}).nodes || [];

  categoryNodes
    .forEach((node) => {
      const { id, slug = {} } = node;
      if (!slug) return;

      const path = `/categories/${slug.current}`;

      createPage({
        path,
        component: require.resolve("./src/templates/category.js"),
        context: { id },
      });
    });
}

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPostPages(graphql, actions);
  await createCategoryPages(graphql, actions);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SanityCategory: {
      posts: {
        type: ["SanityPost"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            type: "SanityPost",
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id,
                    },
                  },
                },
              },
            },
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};