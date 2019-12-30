# next-with-error

Next.js plugin to render the Error page and send the correct HTTP status code from any page's `getInitialProps`.

This higher-order-components allows you to easily return Next.js's Error page + the correct HTTP status code just by defining `error.statusCode` in your pages `getInitialProps`:

```jsx
// pages/something.js

const SomePage = () => (
  <h1>I will only render if error.statusCode is lesser than 400</h1>
)

SomePage.getInitialProps = async () => {
  const isAuthenticated = await getUser();

  if (!isAuthenticated) {
    return {
      error: {
        statusCode: 401;
      }
    };
  }

  return {
    // ...
  };
}
```

## Installation

```bash
npm install next-with-error
```

## Usage

### `withError([ErrorPage])(App)`

Adapt `pages/_app.js` so it looks similar to [what is described in the official Next.js documentation](https://nextjs.org/docs#custom-app) and add the `withError` HoC.

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

export default withError()(MyApp);
```

</details>

Then, in any of your pages, define `error.statusCode` if needed in your page's `getInitialProps`

```jsx
// pages/article.js
import React from 'react';
import fetchPost from '../util/fetch-post';

class ArticlePage extends React.Component {
  static async getInitialProps() {
    const article = await fetchPost();

    if (!article) {
      // No article found, let's display a "not found" page
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

export default HomePage;
```

### `generatePageError(statusCode[, additionalProps])`

If you find the code to write the error object is a bit verbose, feel free to use the `generatePageError` helper:

```jsx
SomePage.getInitialProps = async () => {
  const isAuthenticated = await getUser();

  if (!isAuthenticated) {
    return generatePageError(401);
  }

  return {};
};
```

You can use the `additionalProps` argument to pass [custom props to the Error component](#custom-props).

### Custom error page

By default, `withError` will display the default Next.js error page. If you need to display your own error page, you will need to pass it as the first parameter of your HoC:

```jsx
import ErrorPage from './_error';

// ...

export default withError(ErrorPage)(MyApp);
```

Work to automate this [is tracked here](https://github.com/martpie/next-with-error/issues/2).

### Custom props

You can also pass custom props to your Error Page component by adding anything you would like in the `error` object:

```jsx
// /pages/article.js
const HomePage = () => <h1>Hello there!</h1>;

HomePage.getInitialProps = () => {
  return {
    error: {
      statusCode: 401,
      message: 'oopsie'
    }
  };
};

export default HomePage;
```

```jsx
// /pages/_error.js

import React from 'react';

const Error = (props) => {
  return (
    <>
      <h1>Custom error page: {props.statusCode}</h1>
      <p>{props.message}</p>
    </>
  );
};

export default Error;
```
