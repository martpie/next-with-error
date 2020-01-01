import React from 'react';
import App from 'next/app';

import withError from '../next-with-error/next-with-error';
import Error from './_error';

class MyApp extends App {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withError(Error)(MyApp);
