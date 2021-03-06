import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllMatchesWithID, getMatch } from "../../lib/api";
import Title from "../../components/title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Match from "../../components/match";

export default function SingleMatch({ match, preview }) {
  const router = useRouter();
  if (!router.isFallback && !match?._id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Header />
      <Container>
        {router.isFallback ? (
          <Title>Loading…</Title>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {match.name} | {CMS_NAME}
                </title>
              </Head>
              <Match match={match} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getMatch(params.id, preview);
  return {
    props: {
      preview,
      match: data[0] || null,
    },
  };
}

export async function getStaticPaths() {
  const allMatches = await getAllMatchesWithID();
  return {
    paths:
      allMatches?.map((match) => ({
        params: {
          id: match._id,
        },
      })) || [],
    fallback: true,
  };
}
