"use client";

import { useEffect, useState } from "react";

const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    let userName: any = localStorage?.getItem("userData");
    userName = JSON.parse(userName)?.firstName;
    setUserName(userName);
  }, []);

  return (
    <div className="ml-4 mt-4">
      <h1 className="text-xl font-semibold">
        {title?.replace("username", userName)}
      </h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
