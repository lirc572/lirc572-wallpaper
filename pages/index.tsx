import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layout';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CovidChart from '../components/covid-chart';

const MotionText = motion(Text);

const MotionFlex = motion(Flex);

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
        backgroundColor: 'blue.600',
      }}
      onClick={() => window.open(href, '_blank')}
    >
      <h2>{title}</h2>
      <p>{body}</p>
    </GridItem>
  );
};

const Home: NextPage = () => {
  const layoutRef = useRef(null);
  const [greeting, setGreeting] = useState(getCurrentGreeting());
  setInterval(() => {
    setGreeting(getCurrentGreeting);
  }, 1000);
  return (
    <Layout ref={layoutRef}>
      <MotionFlex direction="column" alignItems="center"
        drag dragConstraints={layoutRef} whileDrag={{ scale: 1.05 }}
        style={{
          position: 'fixed',
          top: 40,
          right: 40,
        }}>
        <Text fontSize="md">SGコロナウイルス感染者数</Text>
        <CovidChart />
      </MotionFlex>
      {/* <Flex direction="column" alignItems="center"
        style={{
          position: 'fixed',
          bottom: 40,
          right: 40,
        }}>
        <iframe width="600" height="400" src="https://data.gov.sg/dataset/covid-19-case-numbers/resource/6c14814b-09b7-408e-80c4-db3d393c7c15/view/f2df5f18-cbcf-4eea-b15e-f80661980b0f" frameBorder="0" />
      </Flex> */}
      <MotionText
        fontSize="6xl"
        fontWeight="bold"
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
