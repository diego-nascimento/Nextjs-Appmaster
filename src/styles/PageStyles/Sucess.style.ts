import styled from 'styled-components'

export const Message = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  a{
    width: 100px;
    position: absolute;
    top: 20px;
    left: 0px;
    background: transparent;
    border: none;
    color: black;
    text-decoration: none;
    
    
    svg{
      margin: 0px 5px;
    }
  }

  @media(max-width: 800px){
    width: 100%;
  
  }
`;