import { User } from "@/types/user";

const FIRST_NAMES = [
  "Liam", "Olivia", "Noah", "Emma", "Amelia", "Mason", "Sophia", "Lucas", "Mia", "Ethan",
  "Ava", "James", "Isabella", "Benjamin", "Charlotte", "Elijah", "Harper", "Henry", "Evelyn", "Alexander",
];

const LAST_NAMES = [
  "Reed", "Patel", "Nguyen", "Kim", "Morgan", "Sanchez", "Brooks", "Turner", "Evans", "Price",
  "Ross", "Ward", "Campbell", "Bailey", "Cook", "Murphy", "Bennett", "Long", "Cole", "Rivera",
];

const TOTAL_USERS = 60;
const PORTRAITS = [
  "/avatars/portrait-men-1.jpg",
  "/avatars/portrait-men-2.jpg",
  "/avatars/portrait-men-3.jpg",
  "/avatars/portrait-men-4.jpg",
  "/avatars/portrait-men-5.jpg",
  "/avatars/portrait-men-6.jpg",
  "/avatars/portrait-men-7.jpg",
  "/avatars/portrait-men-8.jpg",
  "/avatars/portrait-men-9.jpg",
  "/avatars/portrait-men-10.jpg",
  "/avatars/portrait-men-11.jpg",
  "/avatars/portrait-men-12.jpg",
  "/avatars/portrait-women-1.jpg",
  "/avatars/portrait-women-2.jpg",
  "/avatars/portrait-women-3.jpg",
  "/avatars/portrait-women-4.jpg",
  "/avatars/portrait-women-5.jpg",
  "/avatars/portrait-women-6.jpg",
  "/avatars/portrait-women-7.jpg",
  "/avatars/portrait-women-8.jpg",
  "/avatars/portrait-women-9.jpg",
  "/avatars/portrait-women-10.jpg",
  "/avatars/portrait-women-11.jpg",
  "/avatars/portrait-women-12.jpg",
];

function slugifyName(name: string): string {
  return name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "");
}

function buildUser(id: number): User {
  const firstName = FIRST_NAMES[(id - 1) % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(id * 3) % LAST_NAMES.length];
  const fullName = `${firstName} ${lastName}`;
  const handle = slugifyName(fullName);

  return {
    id,
    first_name: firstName,
    last_name: lastName,
    email: `${handle}@example.com`,
    avatar: PORTRAITS[(id - 1) % PORTRAITS.length],
  };
}

export type UsersPage = {
  users: User[];
  totalUsers: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

export function getUsersPage(page: number, pageSize: number): UsersPage {
  const safePageSize = Math.max(1, Math.min(6, Number.isFinite(pageSize) ? Math.floor(pageSize) : 6));
  const totalPages = Math.ceil(TOTAL_USERS / safePageSize);
  const safePage = Math.max(1, Math.min(totalPages, Number.isFinite(page) ? Math.floor(page) : 1));

  const startId = (safePage - 1) * safePageSize + 1;
  const endId = Math.min(startId + safePageSize - 1, TOTAL_USERS);

  const users: User[] = [];
  for (let id = startId; id <= endId; id += 1) {
    users.push(buildUser(id));
  }

  return {
    users,
    totalUsers: TOTAL_USERS,
    totalPages,
    page: safePage,
    pageSize: safePageSize,
  };
}
