import React, {useReducer, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import Icon from '../components/Icon';
import axios from 'axios';

const JoinForm = ({
  name,
  setName,
  introduction,
  setIntroduction,
  contact,
  setContact,
}) => {
  return (
    <View style={{height: '80%', padding: 30}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
          Glad you're intrested!
        </Text>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
          Let us know more about you.
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={{fontSize: 15}}>What's your name?</Text>
        <TextInput
          style={{fontSize: 16, height: '80%'}}
          value={name}
          multiline={true}
          maxLength={35}
          onChangeText={string => setName(string)}
          placeholder=""
          keyboardType="default"
        />
      </View>
      <View style={[styles.textContainer, {flex: 2}]}>
        <Text style={{fontSize: 15}}>Introduce yourself.</Text>
        <TextInput
          style={{fontSize: 16, height: '80%'}}
          multiline={true}
          maxLength={140}
          value={introduction}
          onChangeText={string => setIntroduction(string)}
          placeholder="What intrests you about this group?"
          keyboardType="default"
        />
      </View>
      <View style={[styles.textContainer, {flex: 1.2}]}>
        <Text style={{fontSize: 15}}>What's your Contact Info?</Text>
        <TextInput
          style={{fontSize: 16, height: '80%'}}
          value={contact}
          multiline={true}
          maxLength={70}
          onChangeText={string => setContact(string)}
          placeholder=""
          keyboardType="default"
        />
      </View>
    </View>
  );
};

const JoinRequest = ({route}) => {
  const {postId} = route.params;
  const navigation = useNavigation();
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async () => {
    const request = {name, introduction, contact};
    await axios.post('http://localhost:4200/api/todo/join/request', {
      postId: postId,
      name: name,
      description: introduction,
      contact: contact,
    });
    navigation.navigate('PostHistory', {
      request: true,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Modal transparent={true} visible={showCloseModal}>
        <View style={styles.modalConatiner}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Heads Up!</Text>
          <Text>Unsaved Changes Will Be Lost</Text>
          <View style={[styles.modalButton, {backgroundColor: 'gray'}]}>
            <Button
              onPress={() => setShowCloseModal(false)}
              title="Cancel"
              color="black"
            />
          </View>
          <View style={[styles.modalButton, {backgroundColor: 'orange'}]}>
            <Button
              onPress={() => {
                setShowCloseModal(false);
                navigation.navigate('HomeScreen');
              }}
              title="Exit Without Saving"
              color="black"
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showSubmitModal}>
        <View style={styles.modalConatiner}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Heads Up!</Text>
          <Text>Are You Ready To Create the Request?</Text>
          <View style={[styles.modalButton, {backgroundColor: 'gray'}]}>
            <Button
              onPress={() => setShowSubmitModal(false)}
              title="Cancel"
              color="black"
            />
          </View>
          <View style={[styles.modalButton, {backgroundColor: 'lightblue'}]}>
            <Button
              onPress={() => {
                setShowSubmitModal(false);
                handleSubmit();
              }}
              title="Submit"
              color="black"
            />
          </View>
        </View>
      </Modal>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: 'gray',
          }}>
          <View style={[styles.buttonContainer, {paddingLeft: 20}]}>
            <Icon
              iconName="close"
              buttonFunction={() => {
                setShowCloseModal(true);
              }}
              height={25}
              width={25}
            />
          </View>
          <View style={{flex: 3}}>
            <Text style={{fontSize: 30, textAlign: 'center', marginTop: 40}}>
              Join Request
            </Text>
          </View>
          <View style={[styles.buttonContainer, {paddingRight: 20}]}></View>
        </View>
        <View style={{flex: 7, backgroundColor: 'lightblue'}}>
          <JoinForm
            name={name}
            setName={setName}
            introduction={introduction}
            setIntroduction={setIntroduction}
            contact={contact}
            setContact={setContact}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'row',
            paddingBottom: 40,
          }}>
          <View style={[styles.buttonContainer, {paddingLeft: 20}]}>
            <Icon
              iconName="back"
              buttonFunction={() => {
                setShowCloseModal(true);
              }}
            />
          </View>
          <View style={{flex: 3}}></View>
          <View style={[styles.buttonContainer, {paddingRight: 20}]}>
            <Icon
              iconName="next"
              buttonFunction={() => {
                setShowSubmitModal(true);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalConatiner: {
    marginHorizontal: '10%',
    height: '20%',
    marginTop: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 6,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 15,
    minWidth: '48%',
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'blue',
    borderWidth: 0,
  },
  selectedLabel: {
    color: 'white',
  },
  textContainer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
  },
  numberSelectorContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
  },
  counterText: {
    width: '20%',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    fontSize: 20,
    marginHorizontal: 10,
  },
  choiceContainer: {
    flex: 1.5,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalButton: {
    padding: 2,
    borderRadius: 10,
    margin: 5,
    width: '70%',
  },
});

export default JoinRequest;
