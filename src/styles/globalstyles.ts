import { createGlobalStyle } from 'styled-components'
import {ShowInput} from './keyframes/InputShow'
 
export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0px;
    outline: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  h1{
    opacity: 0;
    animation: ${ShowInput} .3s forwards ;
  }

  body{
    width: 100vw;
    height: 100vh;
  }

  label{
    font-size: .8rem;
    padding: 2px 0px;
  }
  
  input{
    height: 20px;
    padding: 0px 10px;
    font-size: .8rem;
    
  }

  .Field{
    transform: translateX(-10px);
    opacity: 0;
    animation: ${ShowInput} .3s forwards ;
  }

  button{
    opacity: 0;
    animation: ${ShowInput} .3s forwards ;
    width: 100%;
    height: 20px;
    cursor: pointer;
  }

`;