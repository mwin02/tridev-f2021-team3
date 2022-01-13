import React, {useCallback, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import Post from '../components/Post';
import Icon from '../components/Icon';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const samplePosts = [
  {
    title: 'Example-Title 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vero natus libero maxime voluptatum atque sunt a quisquam, ipsam corrupti veritatis magnam eligendi quia, blanditiis harum expedita impedit adipisci hic?',
    time: new Date().getTime(),
    numMembers: 3,
    targetMembers: 5,
    id: 123124124123,
  },
];

const sampleFilter = {
  category: '',
  numSlots: '',
};

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [searchEnable, setSearchEnable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPost, setSelectedPost] = useState({});
  const [showSelectedPost, setShowSelectedPost] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('default');

  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async (searching, filter) => {
    var response;
    try {
      if (filter === 'default') {
        response = await axios.get('http://localhost:4200/api/todo/get/all');
      } else {
        response = await axios.get(
          'http://localhost:4200/api/todo/get/category',
          {
            params: {category: filter},
          },
        );
      }
      if (response.data.result) {
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
        setPosts(posts);
        console.log(`new search: ${searching}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchPosts('', filterCategory);
  }, [fetchPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts(searchTerm, filterCategory);
    setRefreshing(false);
    console.log('refreshed');
  }, []);

  return (
    <View style={styles.container}>
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
            <View style={{paddingTop: '3%', paddingLeft: '10%'}}>
              <Icon
                iconName="close"
                buttonFunction={() => {
                  setShowSelectedPost(false);
                  setSelectedPost({});
                }}
                height={30}
                width={30}
              />
            </View>
            <View
              style={{
                backgroundColor: 'blue',
                height: '25%',
                width: '70%',
                marginLeft: 10,
                borderRadius: 30,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  setShowSelectedPost(false);
                  navigation.navigate('JoinRequest', {
                    postId: selectedPost.id,
                  });
                }}
                title="Request To Join"
                color="white"
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showFilterModal} animationType="slide">
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(false);
          }}>
          <View
            style={{
              height: '15%',
            }}></View>
        </TouchableOpacity>
        <View style={[styles.modalConatiner, {marginHorizontal: '3%'}]}>
          <Text style={{fontSize: 30}}> Filters </Text>
          <Text style={{fontSize: 20}}> Category: </Text>
          <Picker
            selectedValue={filterCategory}
            onValueChange={(itemValue, itemIndex) =>
              setFilterCategory(itemValue)
            }
            style={{
              width: '90%',
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 20,
            }}>
            <Picker.Item label="Game" value="gaming" />
            <Picker.Item label="Studying" value="studying" />
            <Picker.Item label="Social" value="social" />
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Collab" value="collab" />
            <Picker.Item label="School Club" value="school_club" />
            <Picker.Item label="Community" value="community" />
          </Picker>
          <Button
            title="Apply Filters"
            onPress={() => {
              setShowFilterModal(false);
              fetchPosts(searchTerm, filterCategory);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(false);
          }}>
          <View
            style={{
              height: '30%',
            }}></View>
        </TouchableOpacity>
      </Modal>
      {searchEnable ? (
        <View style={styles.searchBar}>
          <View style={[styles.smallIconContainer]}>
            <Icon
              iconName="back"
              buttonFunction={() => {
                setFilterCategory('default');
                setSearchTerm('');
                onRefresh();
                setSearchEnable(false);
              }}
              width={20}
              height={20}
            />
          </View>
          <View style={{flex: 6}}>
            <TextInput
              style={{fontSize: 17, height: '80%'}}
              maxLength={40}
              value={searchTerm}
              onChangeText={string => setSearchTerm(string)}
              onEndEditing={() => {
                fetchPosts(searchTerm);
              }}
              placeholder="Search"
              keyboardType="default"
              autoCorrect={false}
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>
          <View style={[styles.smallIconContainer, {paddingRight: '5%'}]}>
            <Icon
              iconName="filter"
              buttonFunction={() => setShowFilterModal(true)}
              width={20}
              height={20}
            />
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <View style={[styles.buttonContainer, {marginLeft: 20}]}>
            <Icon iconName="profile" />
          </View>
          <View style={{flex: 3}}>
            <Text style={{fontSize: 30, textAlign: 'center', marginTop: 40}}>
              Connect Me
            </Text>
          </View>
          <View style={[styles.buttonContainer, {marginRight: 10}]}>
            <Icon
              iconName="search"
              buttonFunction={() => setSearchEnable(true)}
            />
          </View>
        </View>
      )}
      <View style={{flex: 7, alignItems: 'center', width: '100%'}}>
        {searchEnable && (
          <Text style={{fontSize: 25, marginTop: '5%'}}>
            Current Filter: {filterCategory}
          </Text>
        )}

        <FlatList
          style={{width: '95%'}}
          data={posts}
          renderItem={({item}) => {
            return (
              <Post
                post={item}
                setSelectedPost={setSelectedPost}
                setShowSelectedPost={setShowSelectedPost}
                pressable={true}
              />
            );
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
  searchBar: {
    backgroundColor: 'white',
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: '10%',
    marginHorizontal: '5%',
    marginBottom: 0,
    alignItems: 'center',
  },
  smallIconContainer: {
    flex: 0.5,
    height: '80%',
    paddingLeft: '5%',
    paddingTop: '2.5%',
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

export default HomeScreen;
