import {FC} from 'react';
import DashboardContent from './Content';
import Link from 'next/link';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <DashboardContent />
      <div className="flex flex-col items-center mt-10 mb-20">
        <Link href="/">Back to Home</Link>
        <Link href="/blog" className="mt-5">
          Blog(protected route)
        </Link>
      </div>
    </>
  );
};

export default page;
