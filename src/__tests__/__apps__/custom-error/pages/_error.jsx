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
