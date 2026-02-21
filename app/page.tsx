import { Details } from "@/components/Details";
import { ClientWrapper } from "@/components/ClientWrapper";
import { getUsersPage } from "@/lib/users";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 6;
  
  // Server-side render via internal service, no external network dependency.
  const { users, totalPages } = getUsersPage(page, pageSize);

  return (
    <ClientWrapper users={users} currentPage={page} currentPageSize={pageSize} totalPages={totalPages}>
      <Details />
    </ClientWrapper>
  );
}
