import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import BottomNavigator from './BottomNavigator'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import { mainColor, sideColor } from '../../utils/ThemeColors'
import { AuthContext } from '../../navigation/AuthProvider'
import database from '@react-native-firebase/database'
import FastImage from 'react-native-fast-image'

const WantedUserInfo = ({ navigation, item }) => {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("TargetUserProfile", {
                targetUserId: item.Uid
            })
        }} style={{
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '2%'
        }}>
            <FastImage
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: '5%'
                }}
                source={{
                    uri: item.ImageUrl,
                    priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{
                width: '80%'
            }}>

                <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    height: 20,
                    fontWeight: 'bold'
                }}>
                    {item.NickName}
                </Text>

                <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    height: 20
                }}>
                    {item.Name}
                </Text>

            </View>
        </TouchableOpacity>
    )
}

export default WantedUserInfo