import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import { mainColor, sideColor } from '../../utils/ThemeColors'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../../navigation/AuthProvider'

const color = '#aaa';

const Login = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isSecurePass, setIsSecurePass] = useState(true);
  const { login } = useContext(AuthContext);

  const loginValidationSchema = yup.object().shape({

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
        'Password must be at least' + min + 'characters')

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
        alignItems:'center'
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
          validationSchema={loginValidationSchema}
          initialValues={{
            nickname: '',
            email: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={values => login(values.email, values.password, navigation)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
          }) => (
            <>

              <TextInput
                name="email"
                placeholder={moment().locale() == "tr" ?
                  "E-mail Adresi" : "Your E-mail Adress"}
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

              <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%'
              }}>
                <TextInput
                  name="password"
                  placeholder={moment().locale() == "tr" ?
                    "Şifre" : "Password"}
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
                marginTop: '2%',
              }}>

                <TouchableOpacity style={{
                  alignItems: 'flex-end',
                }}
                  onPress={() => {
                    navigation.navigate("ResetPassword");
                  }}>
                  <Text style={{
                    color: mainColor,
                    fontSize: 14,
                    fontWeight: 'bold'
                  }}>{moment().locale() == "tr" ?
                    "Şifremi Unuttum" : "I forgot my password"}</Text>
                </TouchableOpacity>

              </View>

              <View style={{
                width: '100%',
                marginTop: '2%',
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
                        "Giriş Yap" : "Login"
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
            navigation.navigate("SignUp")
          }}>
          <Text style={{
            color: Colors.white,
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

    </SafeAreaView>
  )
}

export default Login