"use client";

const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  let userName: any = localStorage?.getItem("userData");
  userName = JSON.parse(userName)?.firstName;

  return (
    <div className="ml-4 mt-4">
      <h1 className="text-xl font-semibold">
        {title?.replace("JohnXXX", userName)}
      </h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
