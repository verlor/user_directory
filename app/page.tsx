import { Details } from "@/components/Details";
import { User, RandomUserResponse } from "@/types/user";
import { ClientWrapper } from "@/components/ClientWrapper";

const totalPages = 10; // Random User API doesn't provide total pages, so we set a reasonable max
const API_URL = 'https://randomuser.me/api/';
const API_SEED = 'lafe';

async function fetchUsers(page: number, pageSize: number): Promise<User[]> {
  try {
    const url = new URL(API_URL);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('results', pageSize.toString());
    url.searchParams.set('seed', API_SEED);

    const response = await fetch(
      url.toString(),
      { cache: 'no-store' } // Ensures fresh data on each request
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const json: RandomUserResponse = await response.json();
    console.debug({ json });
    
    // Transform Random User API data to match our User interface
    const transformedUsers: User[] = json.results.map((user, index) => ({
      id: (page - 1) * pageSize + index + 1,
      email: user.email,
      first_name: user.name.first,
      last_name: user.name.last,
      avatar: user.picture.large,
    }));
    
    return transformedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 6;
  
  // Fetch users on the server
  const users = await fetchUsers(page, pageSize);

  return (
    <ClientWrapper users={users} currentPage={page} currentPageSize={pageSize} totalPages={totalPages}>
      <Details />
    </ClientWrapper>
  );
}