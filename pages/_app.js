import Head from 'next/head'
import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Header from '../components/Header'
import Footer from '../components/Footer'

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="A simple web app to catch pokemon" />
        <link rel="icon" href="/pokeball.svg" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
