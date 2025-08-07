import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-center p-4">
          <h1 className="text-6xl font-extrabold text-red-600 dark:text-red-400">404</h1>
          <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
          <p className="text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300">
            Go back home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Custom404;
