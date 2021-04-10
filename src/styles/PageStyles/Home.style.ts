import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(100% - 20px);
  min-height: 100vh;

  @media(max-width: 1000px){
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

export const Aside = styled.div`
  background: url('/wallpaper.jpg');
  background-position: center center;
  background-size: cover;
  @media(max-width: 1000px){
    display: none;
  }
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  position: relative;
  align-items: center;
  justify-content: center;

  h1{
  }
`;

export const Formulario = styled.form`
  width: 100%;
  justify-content: center;

  .Field{
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;

    p{
      padding: 0px;
      margin: 0px;
      color: red;
    }
  }
  
  input{
    width: 100%;
  }

  button{
    height: 40px;
  }
  
  .Cep{
    display: grid;
    grid-template-columns: 1fr 100px;
    width: 100%;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 5px;

    input{
      width: 100%;
    }

    button{
      height: 100%;
    }
  }
`;

export const ErrorContainer = styled.div`
  color: red;
`;


interface IAddressContainer{
  show: boolean
}

export const AddressContainer = styled.section<IAddressContainer>`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
`;