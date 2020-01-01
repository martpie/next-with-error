import React from 'react';
import dynamic from 'next/dynamic';
import { default as NextApp, AppContext, AppProps } from 'next/app';

const ErrorPage = dynamic(() => import('next/error'));

export interface PageErrorInitialProps<T = Record<string, any>> {
  error?: {
    statusCode: number;
  } & T;
}

export type ExcludeErrorProps<P> = Pick<P, Exclude<keyof P, keyof PageErrorInitialProps>>;

type AppInitialProps = {
  pageProps: PageErrorInitialProps;
};

/**
 * Small helper to generate errors object if needed
 */
export const generatePageError = function<T extends Record<string, any>>(
  statusCode: number,
  params?: T
): PageErrorInitialProps<T | {}> {
  return {
    error: {
      statusCode,
      ...(params || {})
    }
  };
};

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
const withError = function(ErrorComponent = ErrorPage) {
  return function<P extends PageErrorInitialProps>(WrappedComponent: typeof NextApp) {
    return class WithError extends React.Component<P & PageErrorInitialProps & AppProps> {
      public static getInitialProps = async (appContext: AppContext) => {
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
          return <ErrorComponent statusCode={error.statusCode} {...additionalErrorProps} />;
        }

        return <WrappedComponent {...this.props} />;
      }
    };
  };
};

export default withError;
