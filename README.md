# next-with-error

Next.js HoC to render the Error page and send the correct HTTP status code from any page.

This higher-order-components allows you to easily return Next.js's Error page + the correct HTTP status code just by defining `error.statusCode` in your pages `getInitialProps`.

## Installation

```bash
npm install next-with-error
```

## Usage

Adapt `pages/_app.js` so it looks similar to [what is described by the official Next.js documentation](https://nextjs.org/docs#custom-app) and add the `withError` HoC.

<details>
 <summary>Example</summary>

```jsx
import App, { Container } from 'next/app';
import React from 'react';

import withError from 'next-with-error';

export class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component && Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withError(MyApp);
```

</details>

Then, in any of your pages, define `error.statusCode` if needed in your page's `getInitialProps`

<details>
 <summary>Example</summary>

```jsx
// pages/article.js
import React from 'react';

class ArticlePage extends React.Component {
  static async getInitialProps() {
    const article = await getPost();

    if (!article) {
      // Will return a 404 status code + display the Error page
      return {
        error: {
          statusCode: 404
        }
      };
    }

    // Otherwise, all good
    return {
      article
    };
  }

  render() {
    return (
      <h1>{this.props.article.title}</h1>
      // ...
    );
  }
}

ArticlePage.getInitialProps = async () => {};

export default HomePage;
```

</details>
