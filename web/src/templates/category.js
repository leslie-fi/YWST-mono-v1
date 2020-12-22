import React from "react";
import { graphql } from "gatsby";
import {Container, GraphQLErrorList, SEO} from "@components/shared";
import CategoryPage from '@components/blog/categoryPage'
import Layout from "containers/layout";

// Add “posts” to the GraphQL query
export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      title
      description
      posts {
        _id
        title
        publishedAt
        mainImage {
          ...SanityImage
          alt
        }
        slug {
          current
        }
      }
    }
  }
`;
const CategoryPageTemplate = ({ data, errors }) => {
  const { title, description, posts } = data.category || {};
  return (
    <Layout>
      <Container>
        {errors && (
          <>
            <SEO title="GraphQL Error" />
            <GraphQLErrorList errors={errors} />
          </>
        )}
        {!data.category && <p>No category data</p>}

        <SEO title={title} description={description} />
        {posts && <CategoryPage {...data.category} />}
      </Container>
    </Layout>
  );
};

export default CategoryPageTemplate;
