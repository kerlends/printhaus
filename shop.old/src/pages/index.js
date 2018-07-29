import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import withRoot from '../withRoot';

const Item = ({ description, images, title, variants }) => (
  <Card style={{ maxWidth: 500, marginBottom: 16 }}>
    {images.map((image) => (
      <CardContent key={image.id}>
        <Img fluid={image.localFile.childImageSharp.fluid} />
      </CardContent>
    ))}
    <CardContent>
      <Typography gutterBottom variant="title">
        {title}
      </Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
  </Card>
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
            localFile {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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

export default withRoot(IndexPage);
