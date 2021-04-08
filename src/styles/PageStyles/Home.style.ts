import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: calc(100% - 20px);

  @media(max-width: 1000px){
    grid-template-columns: 1fr;
  }
`;

export const Aside = styled.div`
  @media(max-width: 1000px){
    display: none;
  }
`;

export const Main = styled.main`
  width: 100%;
`;

export const Formulario = styled.form`
  width: 100%;
  margin: 0px;

  input{
    height: 30px;
    padding: 0px 10px;
  }

  .Field{
    margin-bottom: 5px;

    p{
      padding: 0px;
      margin: 0px;
      color: red;
    }
  }
  
  input{
    width: 100%;
  }
  
  .Cep{
    display: flex;
    flex-direction: row;
    width: 100%;

    input{
      width: 100%;
    }
    
    button{
      margin-left: 20px;
      width: 100px;
      height: 30px;
    }
  }
`;


interface IAddressContainer{
  show: boolean
}

export const AddressContainer = styled.section<IAddressContainer>`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
`;