import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className='w-full h-16 flex gap-4 items-center justify-between bg-white shadow-md rounded'>
      <div className='w-3/4 md:w-2/4 flex gap-4 items-center'>
        <Link to={`/user-profile/${user?._id}`}>
          <img
            src={user?.profileUrl}
            alt={user?.firstName}
            className='w-8 ml-5 md:w-12 h-8 md:h-12 rounded'
          />
        </Link>
        <div className='h-full flex flex-col'>
          <Link
            to={`/user-profile/${user?._id}`}
            className='text-base md:text-lg font-semibold text-gray-600 truncate'
          >
            {user?.firstName} {user?.lastName}
          </Link>
          <span className='text-sm text-blue-600'>{user?.email}</span>
        </div>
      </div>

      <div className='hidden w-2/4 h-full md:flex items-center'>
        <p className='text-base text-start'>{user?.about?.slice(0, 40) + "..."}</p>
      </div>

      <div className='w-1/4 h-full flex flex-col items-center'>
        <p className='text-blue-600 font-semibold'>{user?.projectPosts?.length}</p>
        <span className='text-xs md:base font-normal text-gray-600'>
          Projects Posted
        </span>
      </div>
    </div>
  );
};

export default UserCard;
