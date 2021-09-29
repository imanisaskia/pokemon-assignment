import { gql, useQuery } from '@apollo/client';

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export const pokemonDetail = (name) => {
  return useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name
    },
  });
};