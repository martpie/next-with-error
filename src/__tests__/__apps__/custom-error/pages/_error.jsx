import React from 'react';

const Error = (props) => {
  return (
    <>
      <h1>Custom error page: {props.statusCode}</h1>
      <p>{props.message}</p>
      <h2>Additional prop: {props.additional}</h2>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, additional: 42 };
};

export default Error;
