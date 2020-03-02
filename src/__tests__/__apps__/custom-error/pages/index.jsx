import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1>Custom Error Example</h1>
      <Link href='posts/[slug]' as='posts/existing-one'>
        <a id='link-200'>existing one</a>
      </Link>
      <br />
      <Link href='posts/[slug]' as='posts/crash-me'>
        <a id='link-500'>crash me</a>
      </Link>
      <br />
      <Link href='posts/[slug]' as='posts/unknown-one'>
        <a id='link-404'>unknown one</a>
      </Link>
    </>
  );
};

export default HomePage;
