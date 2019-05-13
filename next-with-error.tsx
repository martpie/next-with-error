/**
 * This higher-order component is used to render the Error page if a HTTP status
 * code >400 is thrown by one of the pages.
 *
 * To trigger it, just add statusCode to the object returned by getInitialProps
 *
 * This solution is based on Tim Neutkens's insights and inspired by Nuxt.js
 * https://spectrum.chat/next-js/general/error-handling-in-async-getinitialprops~99400c6c-0da8-4de5-aecd-2ecf122e8ad0
 * https://github.com/nuxt/nuxt.js/issues/895#issuecomment-308682972
 */

import React from 'react';
import ErrorPage from 'next/error';
import { default as NextApp, NextAppContext, AppProps, DefaultAppIProps } from 'next/app';

export interface WithErrorProps {
  error?: {
    statusCode: number;
    [key: string]: any;
  };
}

interface AppInitialProps {
  pageProps: WithErrorProps;
}

const withError = function(Error = ErrorPage) {
  return function<P extends WithErrorProps>(WrappedComponent: typeof NextApp) {
    return class WithError extends React.Component<P & WithErrorProps & AppProps & DefaultAppIProps> {
      public static getInitialProps = async (appContext: NextAppContext) => {
        let appProps: AppInitialProps = { pageProps: {} };

        if (WrappedComponent.getInitialProps) {
          appProps = await WrappedComponent.getInitialProps(appContext);
        }

        const { res } = appContext.ctx;
        const { error } = appProps.pageProps;

        if (error && res) {
          res.statusCode = error.statusCode;
        }

        return appProps;
      };

      render() {
        const { pageProps }: AppInitialProps = this.props;
        const { error } = pageProps;

        if (error && error.statusCode >= 400) {
          const { statusCode, ...additionalErrorProps } = error;
          return <Error statusCode={error.statusCode} {...additionalErrorProps} />;
        }

        return <WrappedComponent {...this.props} />;
      }
    };
  };
};

export default withError;
