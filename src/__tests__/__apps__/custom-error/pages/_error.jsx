import React from 'react';

const Error = (props) => {
  return (
    <>
      <h1>Custom error page: {props.error.statusCode}</h1>
      <p>{props.error.message}</p>
      <h2>Additional prop: {props.additional}</h2>
    </>
  );
};

Error.getInitialProps = () => {
  return {
    additional: 42
  };
};

export default Error;
