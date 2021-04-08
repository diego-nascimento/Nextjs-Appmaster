import {Aside, Container, Main, Formulario, AddressContainer} from '../styles/PageStyles/Home.style'
import InputMask from 'react-input-mask'
import {useForm } from 'react-hook-form'
import { GetFactory } from '../Factories/GetFactory'
import {PostFactory} from '../Factories/PostFactory'
import React from 'react'
import {requiredFields} from '../Util/RequiredFields'
import { IForm } from '../interfaces/IForm'
import {normalize} from '../Util/Normalize'
    
    
const Home: React.FC = () => {
  const { register, handleSubmit, formState: { errors}, getValues, setValue } = useForm()
  const [addressEditable, setAddressEditable] = React.useState({
    city: true,
    state: true,
    district: true,
    address: true
  })
  const [showAddress, setShowAddress] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handle = async (data: IForm) => {
    const Post = PostFactory()
    try {
      const body: IForm = {
        name: data.name,
        phone:  normalize(data.phone) ,
        addressCity: data.addressCity,
        addressComplement: data.addressComplement,
        addressDistrict: data.addressDistrict,
        addressNumber: data.addressNumber,
        addressState: data.addressState,
        addressStreet: data.addressState,
        addressZip: data.addressZip,
        email: data.email
      }
      setLoading(true)
      const response = await Post.handle({
        body: body,
        url: 'https://simple-api-selection.herokuapp.com/submit/'
        
      })
      console.log(response)
    } finally {
      setLoading(false)
    }
  }

  const handleCepClick = async () => {
    const Get = GetFactory()
    const response = await Get.handle({ body: {}, url: `https://ws.apicep.com/cep/${getValues().addressZip}.json` })
    let Temporary = Object.assign({}, addressEditable)
    
    
    requiredFields.forEach(field => {
      Temporary[field.response] = true
    });
    if (response.body.status === 200) {
      requiredFields.forEach(field => {
        if (response.body[field.response]) {
          setValue(field.field, response.body[field.response], {shouldValidate: true})
        } else {
          Temporary[field.response] = false
        }
      });
      
    } if (response.body.status === 400 || response.body.status === 404) {
      requiredFields.forEach(field => {
          Temporary[field.response] = false
      });
    }
    setAddressEditable(Temporary)
    setShowAddress(true)
  }

  return (
    <Container>
      <Aside></Aside>
      <Main>
        <h1>Formulario</h1>
        <Formulario onSubmit={handleSubmit(handle)}>
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
            <InputMask id="phone" mask="(99)99999-9999" {...register("phone", {required: true, pattern: {value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/, message: "Preenchido Incorretamente"}})}/>
            {errors && errors.phone && errors.phone.type === 'required'? <p>Campo não Preenchido</p>: null}
            {errors && errors.phone && errors.phone.type === 'pattern' ? <p>Preenchido Incorretamente</p> : null}
          </div>
           <div className="Cep">
              <div className="Field"> 
                <label htmlFor="addressZip" >Cep: </label>
                <InputMask id="addressZip"  mask="99999-999" {...register("addressZip", {required: true, pattern: {value: /^[0-9]{5}-[0-9]{3}$/, message: "Preenchido Incorretamente"}})}/>
                {errors && errors.addressZip && errors.addressZip.type === 'required'? <p>Campo não Preenchido</p>: null}
                {errors && errors.addressZip && errors.addressZip.type === 'pattern' ? <p>Preenchido Incorretamente</p> : null}
              </div>
              <button type="button" onClick={handleCepClick}>Buscar</button>
            </div>
            
          <AddressContainer show={showAddress}>
            <div className="Field">
              <label htmlFor="addressStreet" >Rua: </label>
              <input type="text" id="addressStreet" readOnly={addressEditable.address} {...register("addressStreet", {required: true})}/>
              {errors && errors.addressStreet && errors.addressStreet.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="addressNumber" >Numero: </label>
              <input type="text" id="addressNumber"  {...register("addressNumber", {required: true})}/>
              {errors && errors.addressNumber && errors.addressNumber.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="addressComplement" >Complemento: </label>
              <input type="text" id="addressComplement"  {...register("addressComplement", {required: true})}/>
              {errors && errors.addressComplement && errors.addressComplement.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="addressDistrict" >Bairro: </label>
              <input type="text" id="addressDistrict" readOnly={addressEditable.district} {...register("addressDistrict", {required: true})}/>
              {errors && errors.addressDistrict && errors.addressDistrict.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="addressCity" >Cidade: </label>
              <input type="text" id="addressCity" readOnly={addressEditable.city} {...register("addressCity", {required: true})}/>
              {errors && errors.addressCity && errors.addressCity.type === 'required'? <p>Campo não Preenchido</p>: null}
            </div>
            <div className="Field">
              <label htmlFor="addressState" >Estado: </label>
              <input type="text" id="addressState" readOnly={addressEditable.state} {...register("addressState", {required: true})}/>
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