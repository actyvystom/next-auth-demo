import GlobalStyles from "../styles/GlobalStyles";
import {StyledContainer} from "../components/StyledContainer";
import {SessionProvider} from "next-auth/react";
function MyApp({Component, pageProps: {...pageProps}}) {
  return (
    <SessionProvider>
      <GlobalStyles />
      <StyledContainer>
        <h1>🐬 Next Auth Demo 🐬</h1>
        <Component {...pageProps} />
      </StyledContainer>
    </SessionProvider>
  );
}

export default MyApp;
