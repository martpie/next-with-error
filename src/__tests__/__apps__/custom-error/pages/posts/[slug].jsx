const PostSinglePage = () => {
  return <h1>Post page</h1>;
};

PostSinglePage.getInitialProps = async (ctx) => {
  if (ctx.query.slug === 'existing-one') {
    return {};
  }

  if (ctx.query.slug === 'crash-me') {
    return {
      error: {
        statusCode: 500,
        message: 'something went wrong'
      }
    };
  }

  return {
    error: {
      statusCode: 404,
      message: 'could not find that'
    }
  };
};

export default PostSinglePage;
