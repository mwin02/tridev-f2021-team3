import React, {useReducer, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Switch,
} from 'react-native';
import Icon from '../components/Icon';
import {useGlobalContext} from '../context';

const defaultState = {
  posterId: '',
  category: '',
  postTitle: '',
  postDescription: '',
  contactInfo: '',
  numMembers: 1,
  numTargetMember: 5,
  searchOption: 'open',
  autoFill: 'false',
  postDuration: 15,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHOOSE_GROUP':
      const newCategory = action.payload;
      return {...state, category: newCategory};
    case 'POST_DETAILS_1':
      const postTitle = action.payload;
      return {...state, postTitle};
    case 'POST_DETAILS_2':
      const postDescription = action.payload;
      return {...state, postDescription};
    case 'POST_DETAILS_3':
      const contactInfo = action.payload;
      return {...state, contactInfo};
    case 'MEMBER_DETAILS_1':
      const numMembers = action.payload;
      return {...state, numMembers};
    case 'MEMBER_DETAILS_2':
      const numTargetMember = action.payload;
      return {...state, numTargetMember};
    case 'SEARCH_DETAILS_1':
      const searchOption = action.payload;
      return {...state, searchOption};
    case 'AUTO_FILL':
      const autoFill = action.payload;
      return {...state, autoFill};
    case 'POST_DURATION':
      const postDuration = action.payload;
      return {...state, postDuration};
    default:
      throw new Error();
  }
};

const PageOne = ({state, dispatch}) => {
  const values = [
    'gaming',
    'studying',
    'social',
    'collab',
    'school_club',
    'community',
  ];
  const labels = [
    'Gaming',
    'Studying',
    'Social',
    'Collab',
    'School Club',
    'Community',
  ];
  return (
    <View style={{height: '70%', padding: 30}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>Hey There!</Text>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
          What Kind of Group Do You Want to Create?
        </Text>
      </View>
      <View style={styles.row}>
        {values.map(value => (
          <TouchableOpacity
            key={value}
            onPress={() => dispatch({type: 'CHOOSE_GROUP', payload: value})}
            style={[
              styles.button,
              state.category === value && styles.selected,
            ]}>
            <Text
              style={[
                styles.buttonLabel,
                state.category === value && styles.selectedLabel,
              ]}>
              {labels[values.findIndex(val => val === value)]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 1}}></View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

const PageTwo = ({state, dispatch}) => {
  return (
    <View style={{height: '80%', padding: 30}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>Alright!</Text>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
          Let's Set Up The Details.
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={{fontSize: 15}}>Title</Text>
        <TextInput
          style={{fontSize: 16, height: '80%'}}
          value={state.postTitle}
          multiline={true}
          maxLength={35}
          onChangeText={string =>
            dispatch({type: 'POST_DETAILS_1', payload: string})
          }
          placeholder="Title - Give A Title To Your Post"
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
      <View style={[styles.textContainer, {flex: 2}]}>
        <Text style={{fontSize: 15}}>Description</Text>
        <TextInput
          style={{fontSize: 16, height: '80%'}}
          multiline={true}
          maxLength={140}
          value={state.postDescription}
          onChangeText={string =>
            dispatch({type: 'POST_DETAILS_2', payload: string})
          }
          placeholder="Give a brief description of what you are looking for."
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
      <View style={[styles.textContainer, {flex: 1.2}]}>
        <Text style={{fontSize: 15}}>Contact Info</Text>
        <TextInput
          style={{fontSize: 16, height: '80%'}}
          value={state.contactInfo}
          multiline={true}
          maxLength={70}
          onChangeText={string =>
            dispatch({type: 'POST_DETAILS_3', payload: string})
          }
          placeholder="Preferred Method of Contact."
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
    </View>
  );
};

const NumCounter = ({decreaseFunction, increaseFunction, value}) => {
  return (
    <View
      style={{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
      }}>
      <Icon iconName="subtract" buttonFunction={decreaseFunction} />
      <Text style={styles.counterText}>{value}</Text>
      <Icon iconName="increment" buttonFunction={increaseFunction} />
    </View>
  );
};

const PageThree = ({state, dispatch}) => {
  const increaseNumMembers = () => {
    dispatch({type: 'MEMBER_DETAILS_1', payload: state.numMembers + 1});
  };
  const decreaseNumMembers = () => {
    dispatch({type: 'MEMBER_DETAILS_1', payload: state.numMembers - 1});
  };
  const increaseNumTarget = () => {
    dispatch({type: 'MEMBER_DETAILS_2', payload: state.numTargetMember + 1});
  };
  const decreaseNumTarget = () => {
    dispatch({type: 'MEMBER_DETAILS_2', payload: state.numTargetMember - 1});
  };

  return (
    <View style={{height: '80%', padding: 30}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Fantastic!</Text>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          Now Let's Get Some Details About Your Current Group
        </Text>
      </View>
      <View style={styles.numberSelectorContainer}>
        <Text>How many people are in your current group?</Text>
        <NumCounter
          decreaseFunction={decreaseNumMembers}
          increaseFunction={increaseNumMembers}
          value={state.numMembers}
        />
      </View>
      <View style={[styles.numberSelectorContainer, {flex: 1.5}]}>
        <Text>How many spots are you looking to fill?</Text>
        <NumCounter
          decreaseFunction={decreaseNumTarget}
          increaseFunction={increaseNumTarget}
          value={state.numTargetMember}
        />
      </View>
    </View>
  );
};

const PageFour = ({state, dispatch}) => {
  return (
    <View style={{height: '80%', padding: 30}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Almost Done!</Text>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          How would you like to be matched?
        </Text>
      </View>
      <View style={styles.choiceContainer}>
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            backgroundColor:
              state.searchOption === 'open' ? 'white' : 'lightgray',
          }}>
          <Button
            onPress={() =>
              dispatch({type: 'SEARCH_DETAILS_1', payload: 'open'})
            }
            title="Open"
            color={state.searchOption === 'open' ? 'blue' : 'black'}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            backgroundColor:
              state.searchOption === 'auto' ? 'white' : 'lightgray',
          }}>
          <Button
            onPress={() =>
              dispatch({type: 'SEARCH_DETAILS_1', payload: 'auto'})
            }
            title="Match"
            color={state.searchOption === 'auto' ? 'blue' : 'black'}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            backgroundColor:
              state.searchOption === 'search' ? 'white' : 'lightgray',
          }}>
          <Button
            onPress={() =>
              dispatch({type: 'SEARCH_DETAILS_1', payload: 'search'})
            }
            title="Search"
            color={state.searchOption === 'search' ? 'blue' : 'black'}
          />
        </View>
      </View>

      <View
        style={[
          styles.boxContainer,
          {flexDirection: 'row', justifyContent: 'center'},
        ]}>
        <Switch
          onValueChange={() => {
            dispatch({type: 'AUTO_FILL', payload: !state.autoFill});
          }}
          value={state.autoFill}
        />
        <Text style={{marginLeft: '5%'}}>Auto-Fill Open Slots</Text>
      </View>
      <View style={[styles.boxContainer, {flex: 2.5}]}>
        <Text>How many minutes should the post last for?</Text>
        <NumCounter
          decreaseFunction={() => {
            dispatch({
              type: 'POST_DURATION',
              payload: state.postDuration - 1,
            });
          }}
          increaseFunction={() => {
            dispatch({
              type: 'POST_DURATION',
              payload: state.postDuration + 1,
            });
          }}
          value={state.postDuration}
        />
      </View>
      <View style={styles.boxContainer}>
        <Text>Custom Matching</Text>
      </View>
    </View>
  );
};

const PostCreation = () => {
  const {userId} = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const navigation = useNavigation();

  const pages = [
    <PageOne state={state} dispatch={dispatch} />,
    <PageTwo state={state} dispatch={dispatch} />,
    <PageThree state={state} dispatch={dispatch} />,
    <PageFour state={state} dispatch={dispatch} />,
  ];
  const pageTitles = [
    'Post Category',
    'Post Details',
    'Group Details',
    'Match Preferences',
  ];
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowSubmitModal(true);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setShowCloseModal(true);
    }
  };

  const handleSubmit = async () => {
    console.log(state);
    await axios.post('http://localhost:4200/api/todo/add', {
      category: state.category,
      title: state.postTitle,
      user_id: userId,
      description: state.postDescription,
      contact: state.contactInfo,
      groupSize: state.numTargetMember + state.numMembers,
      peopleWanted: state.numTargetMember,
    });
    navigation.navigate('PostHistory');
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
          <Text>Are You Ready To Create the Post?</Text>
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
              Create Post
            </Text>
          </View>
          <View style={[styles.buttonContainer, {paddingRight: 20}]}></View>
        </View>
        <View style={{flex: 7, backgroundColor: 'lightblue'}}>
          {pages[currentPage]}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'row',
            paddingBottom: 40,
          }}>
          <View style={[styles.buttonContainer, {paddingLeft: 20}]}>
            <Icon iconName="back" buttonFunction={prevPage} />
          </View>
          <View style={{flex: 3}}>
            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>
              {pageTitles[currentPage]}
            </Text>
          </View>
          <View style={[styles.buttonContainer, {paddingRight: 20}]}>
            <Icon iconName="next" buttonFunction={nextPage} />
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

export default PostCreation;
