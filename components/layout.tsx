import { Box, Flex, Spacer } from '@chakra-ui/react';

type Props = {
  preview?: boolean
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Flex as="main" direction="column" w="100vw" h="100vh" justifyContent="center" alignItems="center">
      {children}
    </Flex>
  );
}
