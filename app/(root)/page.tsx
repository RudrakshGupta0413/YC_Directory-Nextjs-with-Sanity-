import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params}); //It will revalidate the page whenever new changes are made

  console.log(JSON.stringify(posts, null, 2));

  // const posts = [{
  //   _createdAt: new Date().toISOString(),
  //   views: 55,
  //   author: { _id: "1", name: 'John Doe' },
  //   _id: 1,
  //   description: 'This is a description',
  //   image: 'https://placehold.co/48x48',
  //   category: 'Tech',
  //   title: 'Startup 1',
  // }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect With Enterpreneurs</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startus Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
