import App from 'next/app';

import withError from '../next-with-error/next-with-error';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withError()(MyApp);
