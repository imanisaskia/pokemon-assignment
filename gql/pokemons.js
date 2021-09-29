import { gql, useQuery } from '@apollo/client';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        name
        image
      }
    }
  }
`;

export const pokemons = (limit, offset) => {
  return useQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset,
    },
  });
};