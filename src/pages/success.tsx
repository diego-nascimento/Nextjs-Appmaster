import {Main,Aside, Container, } from '../styles/PageStyles/Home.style'
import React from 'react'
import {AiOutlineRollback} from 'react-icons/ai'
import Link from 'next/link'
import {Message} from '../styles/PageStyles/Sucess.style'
    
const Sucesso: React.FC = () => {
  

  return (
      <Container>
      <Aside></Aside>
      <Main>
        <Message>
          <Link href="/">
            <a><AiOutlineRollback /><span>Voltar</span></a>
          </Link>
          <h1>Muito bom!!</h1>
          <h2>Você receberá seus adesivos em alguns dias</h2>
        </Message>
      </Main>
    </Container>
  )
}

export default Sucesso