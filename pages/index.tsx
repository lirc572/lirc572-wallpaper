import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layout';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

const getCurrentGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    return 'おはようございます';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'こんにちは';
  } else {
    return 'こんばんは';
  }
};

const LinkCard = ({ title, body, href }: { title: string, body: string, href: string }) => {
  return (
    <GridItem
      w="100%"
      textAlign="left"
      padding="1.5rem"
      textDecoration="none"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.500"
      borderRadius="md"
      cursor="pointer"
      _hover={{
        borderColor: 'blue.500',
        backgroundColor: 'blue.100',
      }}
      onClick={() => window.open(href, '_blank')}
    >
      <h2>{title}</h2>
      <p>{body}</p>
    </GridItem>
  );
};

const Home: NextPage = () => {
  const [covidCaseNumbers, setCovidCaseNumbers] = useState<Record<string, number>>({});
  const [covidStats, setCovidStats] = useState<Array<{ date: string, count: number }>>([]);
  useEffect(() => {
    fetch('https://covid-sg.deno.dev/all/total')
      .then(res => res.json())
      .then(data => setCovidCaseNumbers(data));
  }, []);
  useEffect(() => {
    const stats = [];
    for (const date in covidCaseNumbers) {
      stats.push({
        date,
        count: covidCaseNumbers[date],
      });
    }
    setCovidStats(stats);
  }, [covidCaseNumbers]);

  const [greeting, setGreeting] = useState(getCurrentGreeting());
  setInterval(() => {
    setGreeting(getCurrentGreeting);
  }, 1000);
  return (
    <Layout>
      <MotionText
        fontSize='6xl'
        margin={0}
        alignSelf="center"
        marginBottom="4rem"
        animate={{
          color: ['#f1f1e6', '#d0a616', '#b7c2ff', '#f1f1e6'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        {greeting}、ご主人様！
      </MotionText>
      <Grid gap="2rem" templateColumns="repeat(2, 1fr)" paddingX="2rem" maxWidth="600px">
        <LinkCard
          title="Documentation"
          body="Find in-depth information about Next.js features and API."
          href="https://nextjs.org/docs"
        />
        <LinkCard
          title="Learn"
          body="Find in-depth information about Next.js features and API."
          href="https://nextjs.org/learn"
        />
        <LinkCard
          title="Examples"
          body="Discover and deploy boilerplate example Next.js projects."
          href="https://github.com/vercel/next.js/tree/canary/examples"
        />
        <LinkCard
          title="Deploy"
          body="Instantly deploy your Next.js site to a public URL with Vercel."
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        />
      </Grid>
    </Layout>
  );
};

export default Home;
