import { forwardRef } from 'react';
import { ForwardedRef } from 'react';
import { Box, Flex, Spacer } from '@chakra-ui/react';

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = forwardRef(({ children }: Props, ref: ForwardedRef<any>) => {
  return (
    <Flex as="main" direction="column" w="100vw" h="100vh" justifyContent="center" alignItems="center" ref={ref}>
      {children}
    </Flex>
  );
});

Layout.displayName = 'Layout';

export default Layout;
