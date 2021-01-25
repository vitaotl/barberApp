import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { UserContext } from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessaButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './styles'
import Api from '../../Api'


import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'
import { useState } from 'react/cjs/react.development'

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()
  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const handleSignUpClick = async () => {
    if(nameField && emailField && passwordField) {
      let res = await Api.signUp(nameField, emailField, passwordField)
      if (res.token) {
        await AsyncStorage.setItem('token', res.token)

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: res.data.avatar
          }
        })

        navigation.reset({
          routes: [{ name: 'MainTab' }]
        })
      } else {
        alert('Erro: ' + res.error)
      }
    } else {
      alert('Preencha os campos')
    }
  }


  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    })
  }

  return (
    <Container>
      <BarberLogo width='100%' height='160' />
      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder='Digite seu nome'
          value={nameField}
          onChangeText={(t) => setNameField(t)}
          secureTextEntry={false}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder='Digite seu email'
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
          secureTextEntry={false}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder='Digite sua senha'
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          secureTextEntry={true}
        />

        <CustomButton onPress={handleSignUpClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>

      </InputArea>

      <SignMessaButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça o login</SignMessageButtonTextBold>
      </SignMessaButton>
    </Container>
  )
}