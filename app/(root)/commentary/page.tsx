import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Searchbar from "@/components/shared/Searchbar";
import { fetchUser } from "@/lib/actions/user.actions";
import { getCommentary } from "@/lib/actions/bible.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const explanation = await getCommentary(searchParams.q)
  return (
    <>
      <h1 className="head-text">Commentary</h1>

      <div className="mt-5">
        <Searchbar routeType="commentary" placeholder="Search commentary"/>
      </div>

      <div className="text-light-1" dangerouslySetInnerHTML={{ __html: explanation }}></div>
    </>
  );
}

export default Page;
