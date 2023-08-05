import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Dimensions, Alert } from 'react-native'
import TextInputComponent from '../CommonComponent/TextInput'
import { galleryClickImage, isNullOrEmpty } from '../CommonFunction/commonFunctionPage.js'
import Feather from 'react-native-vector-icons/Feather'
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useSelector } from 'react-redux'
import { actions } from '../Redux/actions/actionIndex'

const height = Dimensions.get('window').height;

export default function InfoFormPage({ navigation, route }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [photo, setPhoto] = useState('')
    const [Dob, setDob] = useState('')
    const [marritialSelectedId, setMarritialSelectedId] = useState();
    const [isTimePickerVisible, setIsTimePickerVisible] = useState()
    const infoData = useSelector((state) => state.infoReducer.infoArray)
    //console.log("info in info screen",infoData)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text {...props} style={{ color: '#000000', fontSize: 18, fontWeight: '500' }}>
                    {route?.params?.isForEdit ? 'Edit Info' : 'Add New Info'}
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#ffffff', //Set Header color
            },
        });
    }, []);

    useEffect(() => {
        if (route?.params?.isForEdit) {
            setFirstName(infoData[route.params.index].firstName)
            setLastName(infoData[route.params.index].lastName)
            setDob(infoData[route.params.index].dateOfBirth)
            setMarritialSelectedId(infoData[route.params.index].marritialStatus)
            setPhoto(infoData[route.params.index].photoUrl)
        }
    }, [])


    const radioButtons = useMemo(() => ([
        {
            id: 'Married', // acts as primary key, should be unique and non-empty string
            label: 'Married',
            value: 'option1'
        },
        {
            id: 'UnMarried',
            label: 'UnMarried',
            value: 'option2'
        }
    ]), []);

    const photoUpload = async () => {
        const result = await galleryClickImage()
        //console.log("result galleryClickImage----", JSON.stringify(result))
        setPhoto(result.uri)
    }

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        const setDate = moment(date).format('YYYY-MM-DD')
        setDob(setDate);
        setIsTimePickerVisible(false);
    };

    const hideTimePicker = () => {
        setIsTimePickerVisible(false);
    }

    const validation = () => {
        let isValid = false;
        if (isNullOrEmpty(firstName) && isNullOrEmpty(lastName) && isNullOrEmpty(Dob) && isNullOrEmpty(marritialSelectedId) && isNullOrEmpty(photo)) {
            Alert.alert('Please Enter All avaliable fields')
        } else {
            if (isNullOrEmpty(photo)) {
                Alert.alert('Please Enter Photo')
            } else {
                if (isNullOrEmpty(firstName)) {
                    Alert.alert('Please Enter First Name')
                } else {
                    if (isNullOrEmpty(lastName)) {
                        Alert.alert('Please Enter Last Name')
                    } else {
                        if (isNullOrEmpty(Dob)) {
                            Alert.alert('Please Enter DOB')
                        } else {
                            if (isNullOrEmpty(marritialSelectedId)) {
                                Alert.alert('Please Enter Marritial Status')
                            } else {
                                console.log("Validation done")
                                isValid = true
                            }
                        }
                    }
                }
            }
        }
        return isValid;
    }

    const onSaveButtonPress = () => {
        const vali = validation()

        if (vali) {
            Alert.alert(
                'Save!',
                'Do you want to Add this Info',
                [
                    {
                        text: 'Cancel',
                        onPress: () => navigation.goBack(),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: () => onSave(),
                        style: 'cancel',
                    },
                ],
            );
        }
    }

    const onSave = () => {
        if (route?.params?.isForEdit) {
            actions.editInfo({
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: Dob,
                marritialStatus: marritialSelectedId,
                photoUrl: photo,
                index: route.params.index,
                isForEdit: true
            })
        } else {
            actions.addnewInfo({
                ...infoData,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: Dob,
                marritialStatus: marritialSelectedId,
                photoUrl: photo,
                id: 1 + infoData.length
            })
        }
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ margin: 10, padding: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.profileImg}>
                        {photo &&
                            <Image source={{ uri: photo }}
                                style={styles.profileImg} />
                        }</View>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => photoUpload()}>
                        <Text style={[styles.textStyle, { padding: 10, textAlign: 'center', backgroundColor: 'gray', width: '40%', margin: 10, borderRadius: 10 }]}>Uplaod Image</Text>
                    </TouchableOpacity>
                </View>
                <TextInputComponent
                    text={'First Name'}
                    textStyle={styles.textStyle}
                    textInputStyle={styles.inputBox}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                //viewStyle={styles.viewStyle}
                />
                <TextInputComponent
                    text={'Last Name'}
                    textStyle={styles.textStyle}
                    textInputStyle={styles.inputBox}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                //viewStyle={styles.viewStyle}
                />
                <Text style={styles.textStyle}>Date of Birth</Text>
                <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, }]}>
                    <View style={{ width: '85%' }}>
                        <TextInput
                            style={[styles.textStyle, { fontWeight: 'normal' }]}
                            value={Dob}
                            placeholder='YYYY-MM-DD'
                            editable={false}
                        />
                    </View>
                    <View style={{ width: '10%', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-ends' }}
                            onPress={() => [setIsTimePickerVisible(true), console.log("time picker click")]}
                        >
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Feather name="calendar" size={25} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="date"
                        onConfirm={(date) => {
                            console.log("on Time confirm");
                            handleConfirm(date)
                        }}
                        maximumDate={new Date()}
                        onCancel={() => hideTimePicker()}
                    />
                </View>

                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={styles.textStyle}>Marital Status</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setMarritialSelectedId}
                        selectedId={marritialSelectedId}
                        containerStyle={{ alignItems: 'flex-start', flexDirection: 'row' }}
                    />
                </View>
            </View>
            <View style={{ marginTop: 90, backgroundColor: 'gray', height: 60 }}>
                <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center' }}
                    onPress={() => onSaveButtonPress()}
                >
                    <Text style={[styles.textStyle, { marginTop: 15, fontSize: 20 }]}>SAVE</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 4,
        paddingLeft: 15,
        padding: 12,
    },
    textStyle: {
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10
    },
    // viewStyle: {
    //     marginTop: 10
    // },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 12,
        borderColor: '#000000',
        borderWidth: 2,
        justifyContent: 'center',
        alignSelf: 'center'
    },
})
