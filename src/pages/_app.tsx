import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: 'linear-gradient(#082e6d, #0f5a93, #619ab5, #cbbca7)',
        color: '#f7f8ff',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      // theme={theme}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
