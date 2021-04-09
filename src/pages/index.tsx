
import InputMask from 'react-input-mask'
import {useForm } from 'react-hook-form'
import React from 'react'
import Router from 'next/router'
import {
  AddressContainer, Aside, Container, ErrorContainer, Formulario, Main, //Importando os Components Styled
  PostFactory, GetFactory, //Factorys
  normalize, //Normalizer dos Campos Cep e Phone
  requiredFields //Campos Requiridos para preencher o endereço após consulta
} from '../PageProtocols/indexProtocols' //As importações estão sendo feitas em PageProtocols
import {IForm} from '../interfaces/IForm'  //Interface dos Formularios
  import Head from 'next/head'
    
const Home: React.FC = () => {
  const { register, handleSubmit, formState: { errors}, getValues, setValue } = useForm() //React form
  const [addressEditable, setAddressEditable] = React.useState({ //State se campos estão editaveis ou não
    city: true,
    state: true,
    district: true,
    address: true
  })
  const [showAddress, setShowAddress] = React.useState(false) //State se deve ou não mostrar os campos de endereço
  const [loading, setLoading] = React.useState(false) //State se a tela esta carregando ou não
  const [error, setError] = React.useState<any | null>(null) //State do erro Apresentado apos submit

  const handle = async (data: IForm) => { //Function q lida com o Submit
    const Post = PostFactory() 
    try {
      setLoading(true) //Inicia o estado de loading
      const body: IForm = { //Preenchendo campo body
        name: data.name,
        phone:  normalize(data.phone) , //Normalize para tirar qualquer caracter q nao seja number
        addressCity: data.addressCity,
        addressComplement: data.addressComplement,
        addressDistrict: data.addressDistrict,
        addressNumber: data.addressNumber,
        addressState: data.addressState,
        addressStreet: data.addressState,
        addressZip: normalize(data.addressZip),
        email: data.email
      }
      
      const response = await Post.handle({ //Realizendo o post
        body: body,
        url: 'https://simple-api-selection.herokuapp.com/submit/'
        
      })
      switch (response.StatusCode) { //testando respostas
        case 200:
          Router.push('/success')
          break;
        case 400:
          setError(response.body) //Se houve Erro, Ele está sendo setado agora
          setTimeout(() => {   //Timer que remove o erro da tela apos x segundos
            setError(null)
          }, 10000)
          break;
        case 500:
          setError('Algo deu Errado, tente novamente mais tarde')
          setTimeout(() => {
            setError(null)
          }, 5000)
          break;
      }
    } finally {
      setLoading(false) //Finaliza o estado de loading
    }
  }

  const handleCepClick = async () => { //FUnction que lida com a consulta do cep
    const Get = GetFactory()
    const response = await Get.handle({ body: {}, url: `https://ws.apicep.com/cep/${getValues().addressZip}.json` })
    let Temporary = Object.assign({}, addressEditable) //Copiando o State de Editaveis
    
    
    requiredFields.forEach(field => { //Reseta todos os campos antes da consulta
      Temporary[field.response] = true
    });
    if (response.body.status === 200) { //Se A consulta der certo
      requiredFields.forEach(field => { //Prenche os campos Inserindo os valores
        if (response.body[field.response]) {
          setValue(field.field, response.body[field.response], {shouldValidate: true})
        } else {  //Se uma informção não esta disponivel, o campo fica editavel
          Temporary[field.response] = false
        }
      });
      
    } if (response.body.status === 400 || response.body.status === 404) { //Se a consulta falhou, todos sao editaveis
      requiredFields.forEach(field => {
          Temporary[field.response] = false
      });
    }
    setAddressEditable(Temporary) //Seta os Campos selecionados
    setShowAddress(true)  //Seta para mostrar os campos de endereço
  }  

  return (
    <Container>
      <Aside></Aside> {/*Campo com a Imagem*/}
      <Main>
        <ErrorContainer> {/*Onde é inserido o erro na tela, testando se a resposta eh um array ou so uma string*/}
           {Array.isArray(error) && error.map((err, index) => {
            return <p key={index}>{err.field}. {err.error}</p>
           })}
          {typeof(error) === 'string' && <p>{error}</p>}
        </ErrorContainer>
       {/*Os Estados do campos dos formularios são controlados pelo react-hook-form e as mascaras são feitas através  do react-input-mask*/}
        <h1>Formulario </h1>
        <Formulario onSubmit={handleSubmit(handle)} >
          <Head>
            <title>Formulario - Solicitar Adesivo</title>
          </Head>
          <div className="Field">
            <label htmlFor="name" >Nome: </label>
            <input type="text" id="name"  {...register("name", {required: true})}/>
            {errors && errors.name && errors.name.type === 'required'? <p>Campo não Preenchido</p>: null}
          </div>
          <div className="Field">
            <label htmlFor="email" >Email: </label>
            <input id="email" type="email" {...register("email", {required: true})}/>
            {errors && errors.email && errors.email.type === 'required'? <p>Campo não Preenchido</p>: null}
          </div>
          <div className="Field">
            <label htmlFor="phone" >Telefone: </label>
              <InputMask id="phone" mask="(99)9999-9999" 
            {...register("phone", { required: true, pattern: { value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/, message: "Preenchido Incorretamente" } })}/>
            {errors && errors.phone && errors.phone.type === 'required'? <p>Campo não Preenchido</p>: null}
            {errors && errors.phone && errors.phone.type === 'pattern' ? <p>Preenchido Incorretamente</p> : null}
          </div>
           <div className="Cep">
              <div className="Field"> 
                <label htmlFor="Cep" >Cep: </label>
                <InputMask id="Cep"  mask="99999-999" {...register("addressZip", {required: true, pattern: {value: /^[0-9]{5}-[0-9]{3}$/, message: "Preenchido Incorretamente"}})}/>
                {errors && errors.addressZip && errors.addressZip.type === 'required'? <p>Campo não Preenchido</p>: null}
                {errors && errors.addressZip && errors.addressZip.type === 'pattern' ? <p>Preenchido Incorretamente</p> : null}
              </div>
              <button type="button" onClick={handleCepClick}>Buscar</button>
            </div>
            
          <AddressContainer show={showAddress}>
            <div className="Field">
              <label htmlFor="Rua" >Rua: </label>
              <input type="text" name="Rua" id="Rua" readOnly={addressEditable.address} {...register("addressStreet", {required: true})}/>
              {errors && errors.addressStreet && errors.addressStreet.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="Numero" >Numero: </label>
              <input type="text" name-="Numero" id="Numero"  {...register("addressNumber", {required: true})}/>
              {errors && errors.addressNumber && errors.addressNumber.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="Complemento" >Complemento: </label>
              <input type="text" name="Complemento" id="Complemento"  {...register("addressComplement", {required: true})}/>
              {errors && errors.addressComplement && errors.addressComplement.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="Bairro" >Bairro: </label>
              <input type="text" name="Bairro" id="Bairro" readOnly={addressEditable.district} {...register("addressDistrict", {required: true})}/>
              {errors && errors.addressDistrict && errors.addressDistrict.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="Cidade" >Cidade: </label>
              <input type="text" name="Cidade"id="Cidade" readOnly={addressEditable.city} {...register("addressCity", {required: true})}/>
              {errors && errors.addressCity && errors.addressCity.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="Estado" >Estado: </label>
              <input type="text" name="Estado"id="Estado" readOnly={addressEditable.state} {...register("addressState", {required: true})}/>
              {errors && errors.addressState && errors.addressState.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
          </AddressContainer>
          {loading? <button type="submit" disabled>Carregando</button>: <button type="submit">Enviar</button>}
          </Formulario>
      </Main>
    </Container>
  )
}

export default Home