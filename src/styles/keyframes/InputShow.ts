import { keyframes } from 'styled-components'

export const ShowInput = keyframes`
  from{
    transform: translateX(-10px);
    opacity: 0;
  }to{
    transform: translateX(0px);
    opacity: 1;
  }
`;