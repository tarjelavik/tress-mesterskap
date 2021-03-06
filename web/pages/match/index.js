import Container from "../../components/container";
import Matches from "../../components/matches";
import Layout from "../../components/layout";
import { getAllMatches } from "../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Header from "../../components/header";
import Title from "../../components/title";

export default function AllMatches({ allMatches, preview }) {
  const matches = allMatches;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <Container>
          <Title>Slag</Title>
          <Matches matches={matches} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allMatches = await getAllMatches(preview);
  return {
    props: { allMatches, preview },
  };
}
