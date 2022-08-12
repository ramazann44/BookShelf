import { useColorScheme, View, Text, Alert, SafeAreaView, TouchableOpacity, TextInput, Button, Modal, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'

import { AuthContext } from '../../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import * as ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
import { mainColor, sideColor } from '../../utils/ThemeColors'
import { Dropdown } from 'react-native-element-dropdown'
import IconAD from 'react-native-vector-icons/AntDesign'

const AddPost = ({ navigation }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { signOut, user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [bookText, setBookText] = useState('');
    const [bookName, setBookName] = useState('');
    const [showModel, setShowModel] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState();
    const [uploadTask, setUploadTask] = useState();
    const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
    const [date, setDate] = useState(null);
    const [state, setState] = useState({});

    

   

    const addBookValidationSchema = yup.object().shape({

        bookText: yup
            .string()
            .required(moment().locale() == "tr" ?
                'Boş Geçilemez'
                :
                'Cannot be blank')
            .min(1, ({ min }) => moment().locale() == "tr" ?
                'Açıklama en az ' + min + ' karakterden olmalıdır'
                :
                'Description must be at least' + min + 'characters')
            .max(100, ({ max }) => moment().locale() == "tr" ?
                'Açıklama en fazla ' + max + ' karakterden olmalıdır'
                :
                'Description must be no more than' + max + 'characters'),

        bookName: yup
            .string()
            .required(moment().locale() == "tr" ?
                'Boş Geçilemez'
                :
                'Cannot be blank')
            .min(1, ({ min }) => moment().locale() == "tr" ?
                'Kitap Adı en az ' + min + ' karakterden olmalıdır'
                :
                'Book Name must be at least' + min + 'characters')
            .max(100, ({ max }) => moment().locale() == "tr" ?
                'Kitap Adı en fazla ' + max + ' karakterden olmalıdır'
                :
                'Book Name must be no more than' + max + 'characters'),

    });

    const getCurrentUser = () => {

        const reference = database().ref('/BookShelf/userList/' + user.uid);

        reference
            .on('value', snapshot => {

                setCurrentUser(snapshot.val());

            });

    }

    const onSelectImagePress = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo', saveToPhotos: true }, onMediaSelect)
    };

    const onMediaSelect = media => {
        if (!media.cancelled) {

            if (media.assets != undefined) {
                let today = new Date();
                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                setDate(date);
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                setDate(date);

                setIsUploading(true);
                const reference = storage().ref("Uploads/UserPosts/" + currentUser.Email + "/" + today + "/" + "resim");

                const task = reference.putFile(media.assets[0].uri);

                setUploadTask(task);
                task.on('state_changed', taskSnapshot => {
                    setUploadTaskSnapshot(taskSnapshot);
                });
                task.then(() => {
                    const downloadURL = reference.getDownloadURL();
                    setDownloadUrl(downloadURL);
                    setIsUploading(false);
                    setUploadTaskSnapshot({});
                    getCurrentUser();
                    setShowModel(false);
                })
            }
        }
    };

    const sharePost = (name,text) => {

        
            let todayy = new Date();

            let today = todayy.getFullYear() + '' +
                ((todayy.getMonth() + 1) < 10 ? ("0" + (todayy.getMonth() + 1))
                    : (todayy.getMonth() + 1)) + '' + todayy.getDate() + ", " +
                todayy.getHours() + ":" +
                ((todayy.getMinutes()) < 10 ? ("0" + (todayy.getMinutes()))
                    : (todayy.getMinutes())) + ":" +
                todayy.getSeconds();

            let date = todayy.getFullYear() + '-' + (todayy.getMonth() + 1) + '-' + todayy.getDate();
            let time = todayy.getHours() + ":" + todayy.getMinutes() + ":" + todayy.getSeconds();

            const newReference1 = database().ref('/BookShelf/usersPosts/' + user.uid).push();

            newReference1
                .set({
                    PostId: newReference1.key,
                    PostUserUid: user.uid,
                    BookText: text,
                    BookName: name,
                    BookImageUrl: downloadUrl._W,
                    PostFullDate: today,
                    PostDate: moment().format('lll'),
                    PostMonth: (todayy.getMonth() + 1),
                    PostLike: 0,
                    PostComment: 0
                });

            const newReference2 = database().ref('/BookShelf/Posts/' + newReference1.key);

            newReference2
                .set({
                    PostId: newReference1.key,
                    PostUserUid: user.uid,
                    BookText: text,
                    BookName: name,
                    BookImageUrl: downloadUrl._W,
                    PostFullDate: today,
                    PostDate: moment().format('lll'),
                    PostMonth: (todayy.getMonth() + 1),
                    PostLike: 0,
                    PostComment: 0
                });

            const reference1 = database().ref('/BookShelf/userList/' + user.uid);
            reference1
                .update({
                    Post: currentUser.Post + 1
                });


            Alert.alert(
                moment().locale() == "tr" ?
                    "Post Paylaşımı Başarılı."
                    :
                    "Post Sharing Successful.",

                moment().locale() == "tr" ?
                    "Postunuz Başarıyla paylaşıldı."
                    :
                    "Your Post Has Been Successfully Shared."

            );
            setBookText('')
            navigation.navigate("HomeScreen")
       

    }

    useEffect(() => {

        onSelectImagePress();
        setShowModel(true)
        getCurrentUser()
        setState({});
        return () => {
            setCurrentUser({});
            setUploadTaskSnapshot({});
        };

    }, []);

    return (
        <SafeAreaView style={{
            width: '100%',
            height: '100%',
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: '2%'
        }}>

            <Modal
                animationType='slide'
                transparent={false}
                visible={showModel}
                onRequestClose={() => {
                    setShowModel(!showModel);
                    navigation.navigate("Profile");
                }}>



                {isUploading && (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                        padding: 20,
                        borderWidth: 20,
                        borderColor: isDarkMode ? Colors.black : Colors.white,
                    }}>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: isDarkMode ? Colors.white : Colors.black,
                            marginBottom: 10
                        }}>
                            {
                                moment().locale() == "tr" ?
                                    "Yükleniyor..."
                                    :
                                    "Loading..."
                            }
                        </Text>

                        <View style={{
                            width: '100%',
                            padding: 5,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: 100,
                            borderColor: isDarkMode ? Colors.white : Colors.black,
                        }}>

                            <View style={{
                                backgroundColor: isDarkMode ? '#00a8ff' : '#00f',
                                width: ((uploadTaskSnapshot.bytesTransferred
                                    / uploadTaskSnapshot.totalBytes) * 100) + '%',
                                height: 30,
                                borderRadius: 100,
                            }} />

                        </View>

                        <Text style={{ fontSize: 20, marginTop: 10, color: '#ff793f' }}>
                            {(
                                (uploadTaskSnapshot.bytesTransferred
                                    /
                                    uploadTaskSnapshot.totalBytes) * 100
                            ).toFixed(2) + "% / 100%"}
                        </Text>

                    </View>
                )
                }

            </Modal>

            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                <Formik
                    validationSchema={addBookValidationSchema}
                    initialValues={{
                        bookName: '',
                        bookText: '',
                    }}
                    onSubmit={values => sharePost(values.bookName,values.bookText)}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
                    }) => (
                        <>

                            <TextInput
                                name="bookName"
                                placeholder={
                                    moment().locale() == "tr" ?
                                        "Kitap Adı"
                                        :
                                        "Book Name"
                                }
                                style={{
                                    width: '90%',
                                    margin: '2%',
                                    borderColor: isDarkMode ? Colors.white : Colors.black,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: '2%',
                                    fontSize: 16,
                                }}
                                color={isDarkMode ? Colors.white : Colors.black}
                                placeholderTextColor={isDarkMode ? Colors.light : '#aaa'}
                                onChangeText={handleChange('bookName')}
                                onBlur={handleBlur('bookName')}
                                value={values.bookName}
                                keyboardType="email-address"
                            />
                            {errors.bookName && <Text style={{ color: '#f00', fontSize: 14 }}>{errors.bookName}</Text>}

                            <TextInput
                                name="bookText"
                                placeholder={
                                    moment().locale() == "tr" ?
                                        "Kitap Hakkındaki Görüşleriniz"
                                        :
                                        "Your Opinion About the Book"
                                }
                                style={{
                                    width: '90%',
                                    margin: '2%',
                                    borderColor: isDarkMode ? Colors.white : Colors.black,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 10,
                                    fontSize: 16,
                                }}
                                color={isDarkMode ? Colors.white : Colors.black}
                                placeholderTextColor={isDarkMode ? Colors.light : '#aaa'}
                                onChangeText={handleChange('bookText')}
                                onBlur={handleBlur('bookText')}
                                value={values.bookText}
                                keyboardType="email-address"
                            />
                            {errors.bookText && <Text style={{ color: '#f00', fontSize: 14 }}>{errors.bookText}</Text>}

                            <View style={{
                                width: '60%',
                                marginTop: 10
                            }}>
                                <Button style={{ margin: 10 }}
                                    color={mainColor}
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    title={
                                        moment().locale() == "tr" ?
                                            "Paylaş"
                                            :
                                            "Share"
                                    } />
                            </View>


                        </>
                    )}
                </Formik>

            </View>

        </SafeAreaView>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});