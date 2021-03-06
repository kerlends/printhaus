// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

import Cart from '../components/Cart';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OpenCartButton from '../components/OpenCartButton';

import Main from './Main';
import withRoot from '../withRoot';
import './fonts/Walbaum.css';

type Props = {
  children: any,
  data: any,
  location: any,
};

const Layout = ({ children, data, location }: Props) => (
  <Cart>
    <Helmet>
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={data.icon.src}
      />
    </Helmet>
    <Header collections={data.collections} />
    <Main>{children()}</Main>
    <Footer
      pages={data.pages}
      instagramProfileUrl="https://www.instagram.com/printhausco"
    />
    <OpenCartButton />
  </Cart>
);

export default withRoot(Layout);

export const query = graphql`
  query IndexLayoutQuery {
    ...CollectionsFragment

    ...PagesFragment

    site {
      siteMetadata {
        title
      }
    }

    icon: file(base: { eq: "icon-100.png" }) {
      src: publicURL
    }
  }
`;
