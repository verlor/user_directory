"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { User } from "@/types/user";

const cardWidth = 402; // width + border + margin

type Props = {
  users: User[];
  currentPage: number;
  currentPageSize: number;
  totalPages: number;
  children: React.ReactNode;
};

export const ClientWrapper = ({
  users,
  currentPage,
  currentPageSize,
  totalPages,
  children,
}: Props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Only calculate dimensions when we have a valid width (client-side)
  const canFit = width > 0 ? Math.min(Math.floor(width / cardWidth), currentPageSize) : currentPageSize;
  const pageWidth = width > 0 ? canFit * cardWidth : 0;

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&pageSize=${currentPageSize}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    router.push(`?page=1&pageSize=${newPageSize}`);
  };

  return (
    <main
      className="font-sans p-5"
      style={width > 0 ? {
        '--page-width': `${pageWidth}px`,
        '--header-margin': `${(width - pageWidth - 10) / 2}px`
      } as React.CSSProperties : undefined}
      suppressHydrationWarning
    >
      <h2 className={width > 0 ? "ml-[var(--header-margin)]" : ""}>
        {users?.length} {users.length === 1 ? "User" : "Users"}
      </h2>
      <div className={`mx-auto flex flex-col flex-wrap justify-center ${width > 0 ? 'w-[var(--page-width)]' : ''}`}>
        <ul className="flex flex-wrap list-none justify-start p-0">
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </ul>
        <div className="flex items-center w-full my-5 mr-[11px] mb-20">
          <div className="flex flex-auto justify-center">
            <button
              className="border border-black outline-none mr-5 bg-black text-white h-[60px] w-[180px] cursor-pointer text-xl leading-[23px] text-center tracking-[2px] uppercase disabled:bg-white disabled:text-[#aaaaaa] disabled:border-[#aaaaaa] disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            >
              previous
            </button>
            <button
              className="border border-black outline-none mr-5 bg-black text-white h-[60px] w-[180px] cursor-pointer text-xl leading-[23px] text-center tracking-[2px] uppercase disabled:bg-white disabled:text-[#aaaaaa] disabled:border-[#aaaaaa] disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            >
              next
            </button>
          </div>
          <select
            value={currentPageSize}
            className="w-[170px] h-[42px] text-base leading-[23px] pl-[5px] outline-none"
            onChange={(event) => {
              handlePageSizeChange(Number(event.target.value));
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </div>
      </div>
      {children}
    </main>
  );
};
