"use client";

import { User } from "@/types/user";
import Image from "next/image";

type Props = {
  user: User;
};

export const Card = ({ user }: Props) => {
  return (
    <li className="border border-black rounded-sm w-[380px] h-[479px] m-2.5 text-xl leading-[23px] shadow-[6px_6px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.26)] hover:cursor-pointer">
      <div className="flex flex-col items-center">
        <span className="my-10">ID: {user.id}</span>
        <Image
          className="h-[180px] w-[180px] border border-black rounded-full"
          src={user.avatar}
          alt={`${user.first_name}-${user.last_name}`}
          width={180}
          height={180}
        />
        <span className="text-[30px] leading-[35px] mt-[30px] mb-2.5">
          {user.first_name} {user.last_name}
        </span>
        <span>
          <a href={`mailto:${user.email}`} className="no-underline hover:underline">
            {user.email}
          </a>
        </span>
      </div>
    </li>
  );
};
