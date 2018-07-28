import React from 'react';
import Link from 'gatsby-link';

const Item = ({ description, images, title, variants }) => (
  <div>
    <h2>{title}</h2>
    {images.map((image) => (
      <img key={image.id} src={image.originalSrc} alt={title} />
    ))}
    <p>{description}</p>
  </div>
);

const IndexPage = ({ data }) => (
  <div>
    {data.allShopifyProduct.edges.map(
      ({ node: { id, ...item } }) => (
        <Item key={id} {...item} />
      ),
    )}
  </div>
);

export const query = graphql`
  query Products {
    allShopifyProduct {
      edges {
        node {
          id
          description
          images {
            id
            originalSrc
          }
          title
          variants {
            availableForSale
            price
          }
        }
      }
    }
  }
`;

export default IndexPage;
