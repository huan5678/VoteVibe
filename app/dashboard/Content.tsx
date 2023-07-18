'use client';
import {FC, useEffect, useState} from 'react';

import LogoutButton from '#/components/LogoutButton';
import Link from 'next/link';
import {format} from 'date-fns';
import {PassageUserInfo, getCurrentUserInfo} from '#/lib/getCurrentUserInfo';

interface DashboardContentProps {}

const DashboardContent: FC<DashboardContentProps> = ({}) => {
  const [userInfo, setUserInfo] = useState<PassageUserInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessionInfo = async () => {
      const sessionInfo = await getCurrentUserInfo();
      setUserInfo(sessionInfo.userInfo);
      setIsLoading(false);
    };

    fetchSessionInfo();
  }, []);

  if (isLoading) {
    // Render loading state if the session information is still being fetched
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    // Render the message if the session doesn't exist
    return (
      <main className="flex justify-center p-24 ">
        <div className="flex justify-center border border-black w-96 rounded-xl">
          <div className="p-10 pb-5">
            <div className="mb-5 text-2xl font-bold">
              <h1>Unauthorized</h1>
            </div>
            <div className="break-normal"></div>
            <p>
              You have not logged in and cannot view the dashboard.
              <br />
              <a href="/" className="font-bold underline hover:text-blue-600 ">
                Login to continue.
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }

  const formattedCreatedAt = format(new Date(userInfo.created_at), 'yyyy-MM-dd HH:mm:ss');

  return (
    <>
      <main className="flex justify-center p-24 ">
        <div className="flex justify-center border border-black w-96 rounded-xl">
          <div className="p-10 pb-5">
            <div className="mb-5 text-2xl font-bold">
              <h1>Welcome</h1>
            </div>
            <div className="break-normal"></div>
            <p>
              You successfully signed in with Passage.
              <br />
              Your username is: <b> {userInfo.email}</b>
              <br />
              Account created at:
              <br /> <b> {formattedCreatedAt}</b>
            </p>
            <LogoutButton />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardContent;
