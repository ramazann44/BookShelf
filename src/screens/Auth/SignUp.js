import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainColor, sideColor } from '../../utils/ThemeColors'
import { AuthContext } from '../../navigation/AuthProvider'

const SignUp = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);
  const { signup } = useContext(AuthContext);

  const signupValidationSchema = yup.object().shape({

    name: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .max(50, ({ max }) => moment().locale() == "tr" ?
        'Ad en fazla ' + max + ' karakterden oluşmalıdır'
        :
        'Name must be a maximum of ' + max + ' characters')
      .min(1, ({ min }) => moment().locale() == "tr" ?
        'Ad en az ' + min + ' karakterden oluşmalıdır'
        :
        'Nmae must be at least ' + min + ' characters'),

    nickname: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .max(20, ({ max }) => moment().locale() == "tr" ?
        'Kullanıcı Adı en fazla ' + max + ' karakterden oluşmalıdır'
        :
        'Username must be a maximum of ' + max + ' characters')
      .min(5, ({ min }) => moment().locale() == "tr" ?
        'Kullanıcı Adı en az ' + min + ' karakterden oluşmalıdır'
        :
        'NickName must be at least ' + min + ' characters'),

    email: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .email(moment().locale() == "tr" ?
        'Geçerli bir e-mail adresi giriniz!'
        :
        'Please enter a valid email address!'),

    password: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .min(6, ({ min }) => moment().locale() == "tr" ?
        'Şifre en az ' + min + ' karakterden oluşmalıdır'
        :
        'Your Password must be at least ' + min + ' characters')
      .matches(/\w*[a-z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet küçük harf kullanmalısınız!'
        :
        'You must use at least 1 lowercase letter!')
      .matches(/\w*[A-Z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet büyük harf kullanmalısınız!'
        :
        'You must use at least 1 capital letter!')
      .matches(/\d/, moment().locale() == "tr" ?
        'En az 1 adet rakam kullanmalısınız!'
        :
        'You must use at least 1 number!')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, moment().locale() == "tr" ?
        'En az 1 adet özel karakter kullanmalısınız!'
        :
        'You must use at least 1 special character!'),


    passwordConfirm: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz')
      .min(6, ({ min }) => moment().locale() == "tr" ?
        'Şifre en az ' + min + ' karakterden oluşmalıdır'
        :
        'Your Password must be at least ' + min + ' characters')
      .matches(/\w*[a-z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet küçük harf kullanmalısınız!'
        :
        'You must use at least 1 lowercase letter!')
      .matches(/\w*[A-Z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet büyük harf kullanmalısınız!'
        :
        'You must use at least 1 capital letter!')
      .matches(/\d/, moment().locale() == "tr" ?
        'En az 1 adet rakam kullanmalısınız!'
        :
        'You must use at least 1 number!')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, moment().locale() == "tr" ?
        'En az 1 adet özel karakter kullanmalısınız!'
        :
        'You must use at least 1 special character!'),

  });

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <View style={{
        width: '100%',
        alignItems: 'center'
      }}>

        <IconMCI
          name='bookshelf'
          size={60}
          color={mainColor}
        />
        <Text style={{
          fontSize: 24,
          color: mainColor,
          fontFamily: 'PingFangHK-Regular'
        }}>BookShelf</Text>

      </View>

      <View style={{
        width: '100%',
        padding: '5%'
      }}>

        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{
            nickname: '',
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={values => signup(values.email, values.password, values.nickname, values.name, navigation)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
          }) => (
            <>

              <TextInput
                name="email"
                placeholder={
                  moment().locale() == "tr" ?
                    "E-mail Adresi" :
                    "E-mail Adress"
                }
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: isDarkMode ? Colors.white : Colors.black,
                  marginBottom: '2%'
                }}
                color={isDarkMode ? Colors.white : Colors.black}
                placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.email}</Text>}

              <TextInput
                name="nickname"
                placeholder={
                  moment().locale() == "tr" ?
                    "Kullanıcı Adı" :
                    "NickName"
                }
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: isDarkMode ? Colors.white : Colors.black,
                  marginBottom: '2%'
                }}
                color={isDarkMode ? Colors.white : Colors.black}
                placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                onChangeText={handleChange('nickname')}
                onBlur={handleBlur('nickname')}
                value={values.nickname}
                keyboardType="email-address"
              />
              {errors.nickname && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.nickname}</Text>}

              <TextInput
                name="name"
                placeholder={
                  moment().locale() == "tr" ?
                    "Adınız" :
                    "Your Name"
                }
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: isDarkMode ? Colors.white : Colors.black,
                  marginBottom: '2%'
                }}
                color={isDarkMode ? Colors.white : Colors.black}
                placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="email-address"
              />
              {errors.name && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.name}</Text>}


              <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%'
              }}>
                <TextInput
                  name="password"
                  placeholder={
                    moment().locale() == "tr" ?
                      "Şifre" :
                      "Password"
                  }
                  style={{
                    width: '90%',
                    fontSize: 16
                  }}
                  color={isDarkMode ? Colors.white : Colors.black}
                  placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}
                />
                <IconFA5 onPress={() => {
                  setIsSecurePass(!isSecurePass)
                }} style={{
                  position: 'absolute',
                  right: 0,
                  top: '30%'
                }}
                  name={isSecurePass ? 'eye-slash' : 'eye'}
                  size={20}
                  color='#8B4513' />
              </View>

              <View>{errors.password && (<Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.password}</Text>)}</View>

              <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%'
              }}>
                <TextInput
                  name="passwordConfirm"
                  placeholder={
                    moment().locale() == "tr" ?
                      "Şifre Tekrarı" :
                      "Password Repeat"
                  }
                  style={{
                    height: 50,
                    width: '80%',
                    fontSize: 16
                  }}
                  color={isDarkMode ? Colors.white : Colors.black}
                  placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                  secureTextEntry={isSecurePassConfirm}
                />
                <IconFA5 onPress={() => {
                  setIsSecurePassConfirm(!isSecurePassConfirm)
                }} style={{
                  position: 'absolute',
                  right: 0,
                  top: '30%'
                }}
                  name={isSecurePassConfirm ? 'eye-slash' : 'eye'}
                  size={20}
                  color='#8B4513' />
              </View>
              {errors.passwordConfirm && (<Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.passwordConfirm}</Text>)}

              <View style={{
                width: '100%',
                marginTop: '5%',
              }}>

                <TouchableOpacity style={{
                  backgroundColor: isValid ? mainColor : '#BDBDBD',
                  alignItems: 'center',
                  padding: '2%',
                  borderRadius: 10
                }}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}>
                    {
                      moment().locale() == "tr" ?
                        "Üye Ol" : "Sign Up"
                    }
                  </Text>
                </TouchableOpacity>

              </View>


            </>
          )}
        </Formik>

        <TouchableOpacity style={{
          backgroundColor: sideColor,
          alignItems: 'center',
          padding: '2%',
          borderRadius: 10,
          marginTop: '5%'
        }}
          onPress={() => {
            navigation.navigate("Login")
          }}>
          <Text style={{
            color: Colors.white,
            fontSize: 16,
            fontWeight: 'bold'
          }}>
            {
              moment().locale() == "tr" ?
                "Giriş Yap" : "Login"
            }
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default SignUp