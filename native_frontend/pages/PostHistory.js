import React, {useCallback, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from '../components/Icon';
import Post from '../components/Post';
import Request from '../components/Request';
import axios from 'axios';
import {useGlobalContext} from '../context';

const sampleRequests = [];

const PostHistory = ({route}) => {
  const navigation = useNavigation();
  const {userId} = useGlobalContext();

  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [showPosts, setShowPosts] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState({});
  const [showSelectedRequest, setShowSelectedRequest] = useState(false);

  const [selectedPost, setSelectedPost] = useState({});
  const [showSelectedPost, setShowSelectedPost] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async () => {
    const response = await axios.get('http://localhost:4200/api/todo/get', {
      params: {user_id: userId},
    });
    const data = response.data.result.reverse();
    const posts = data.map(post => {
      return {
        title: post.title,
        category: post.category,
        description: post.description,
        time: new Date().getTime(),
        numMembers: post.groupSize - post.peopleWanted,
        targetMembers: post.groupSize,
        id: post.id,
        poster: post.user_id,
      };
    });
    setMyPosts(posts);
  }, []);

  const fetchRequests = useCallback(async () => {
    setMyRequests(sampleRequests);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    await fetchRequests();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchRequests();
    if (route && route.params && route.params.request) {
      setShowPosts(false);
    }
  }, [fetchPosts, fetchRequests]);

  const handleDeletePost = async () => {
    //delete currently selected post
    setShowSelectedPost(false);
    setSelectedPost({});
  };

  const handleEditPost = async () => {
    //edit currently selected post
    setShowSelectedPost(false);
    setSelectedPost({});
  };

  const handleDeleteRequest = async () => {
    //delete currently selected post

    setShowSelectedRequest(false);
    setSelectedRequest({});
  };

  const handleEditRequest = async () => {
    //edit currently selected post

    setShowSelectedRequest(false);
    setSelectedRequest({});
  };

  const handleSeeRequests = () => {
    //edit currently selected post
    setShowSelectedPost(false);
    navigation.navigate('RequestList', {
      postId: selectedPost.id,
    });
  };
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={showSelectedRequest}
        animationType="slide">
        <TouchableOpacity
          onPress={() => {
            setShowSelectedRequest(false);
            setSelectedRequest({});
          }}>
          <View
            style={{
              height: '60%',
            }}></View>
        </TouchableOpacity>
        <View style={styles.modalConatiner}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {selectedRequest.name}
            </Text>
            <Text style={{fontSize: 18}}>{selectedRequest.description}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 1,
              paddingTop: 10,
              marginTop: 10,
              width: '100%',
            }}>
            <View style={{paddingTop: '3%', paddingLeft: '10%'}}>
              <Icon
                iconName="close"
                buttonFunction={() => {
                  setShowSelectedRequest(false);
                  setSelectedRequest({});
                }}
                height={30}
                width={30}
              />
            </View>
            <View
              style={{
                backgroundColor: 'red',
                height: '25%',
                width: '35%',
                marginLeft: 10,
                borderRadius: 30,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleDeleteRequest();
                }}
                title="Delete"
                color="white"
              />
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: '25%',
                width: '35%',
                marginLeft: 10,
                borderRadius: 30,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleEditRequest();
                }}
                title="Edit"
                color="white"
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showSelectedPost}
        animationType="slide">
        <TouchableOpacity
          onPress={() => {
            setShowSelectedPost(false);
            setSelectedPost({});
          }}>
          <View
            style={{
              height: '60%',
            }}></View>
        </TouchableOpacity>
        <View style={styles.modalConatiner}>
          <View
            style={{
              flex: 1,
              width: '90%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {selectedPost.title}
            </Text>
            <Text style={{fontSize: 18}}>{selectedPost.description}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 15}}>Open To All | Expires at 8:30</Text>
            <Text style={{fontSize: 15}}>
              5 min ago | {selectedPost.numMembers}/{selectedPost.targetMembers}{' '}
              spots filled
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 1,
              paddingTop: 10,
              marginTop: 10,
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: 'red',
                height: '25%',
                width: '25%',
                marginLeft: 10,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleDeletePost();
                }}
                title="Delete"
                color="white"
              />
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: '25%',
                width: '25%',
                marginLeft: 10,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleEditPost();
                }}
                title="Edit"
                color="white"
              />
            </View>
            <View
              style={{
                backgroundColor: 'blue',
                height: '25%',
                width: '40%',
                marginLeft: 10,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleSeeRequests();
                }}
                title="See Requests"
                color="white"
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <View style={[styles.buttonContainer, {marginLeft: 20}]}>
          <Icon iconName="closeHome" height={25} width={25} />
        </View>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 30, textAlign: 'center', marginTop: 40}}>
            My History
          </Text>
        </View>
        <View style={[styles.buttonContainer, {marginRight: 10}]}>
          {/* <Icon iconName="search" /> */}
        </View>
      </View>
      <View style={styles.choiceContainer}>
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            backgroundColor: showPosts ? 'white' : 'lightgray',
          }}>
          <Button
            onPress={() => setShowPosts(true)}
            title="Posts"
            color={showPosts ? 'blue' : 'black'}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            backgroundColor: showPosts ? 'lightgray' : 'white',
          }}>
          <Button
            onPress={() => setShowPosts(false)}
            title="Requests"
            color={showPosts ? 'black' : 'blue'}
          />
        </View>
      </View>
      <View style={{flex: 6.5, backgroundColor: 'lightblue'}}>
        <FlatList
          data={showPosts ? myPosts : myRequests}
          renderItem={({item}) => {
            if (showPosts) {
              return (
                <Post
                  post={item}
                  pressable={true}
                  setSelectedPost={setSelectedPost}
                  setShowSelectedPost={setShowSelectedPost}
                />
              );
            } else {
              return (
                <Request
                  request={item}
                  setSelectedReqest={setSelectedRequest}
                  setShowSelectedReqest={setShowSelectedRequest}
                />
              );
            }
          }}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'lightblue',
          alignItems: 'flex-end',
          padding: 30,
        }}>
        <Icon iconName="+" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightblue',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  choiceContainer: {
    flex: 0.5,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '5%',
    padding: 10,
    borderRadius: 50,
    marginBottom: 0,
  },
  modalConatiner: {
    height: '50%',
    marginTop: '5%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default PostHistory;
