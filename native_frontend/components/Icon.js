import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const add = require('../icons/add.png');
const profile = require('../icons/profile.png');
const search = require('../icons/search.png');
const close = require('../icons/close.png');
const next = require('../icons/next.png');
const back = require('../icons/back.png');
const increment = require('../icons/increment.png');
const subtract = require('../icons/subtract.png');
const filter = require('../icons/filter.png');

const Icon = ({iconName, buttonFunction, height, width}) => {
  const navigation = useNavigation();

  var icon;

  const navigateTo = () => {
    navigation.navigate(icon.link);
  };

  var iconWidth = 40;
  var iconHeight = 40;
  if (width) {
    iconWidth = width;
  }
  if (height) {
    iconHeight = height;
  }
  if (iconName === '+') {
    icon = {image: add, function: navigateTo, link: 'PostCreation'};
  }
  if (iconName === 'profile') {
    icon = {image: profile, function: navigateTo, link: 'PostHistory'};
  }
  if (iconName === 'next') {
    icon = {image: next, function: buttonFunction};
  }
  if (iconName === 'back') {
    icon = {image: back, function: buttonFunction};
  }
  if (iconName === 'close') {
    icon = {image: close, function: buttonFunction};
  }
  if (iconName === 'closeHome') {
    icon = {image: close, function: navigateTo, link: 'HomeScreen'};
  }
  if (iconName === 'search') {
    icon = {image: search, function: buttonFunction};
  }
  if (iconName === 'increment') {
    icon = {image: increment, function: buttonFunction};
  }
  if (iconName === 'subtract') {
    icon = {image: subtract, function: buttonFunction};
  }
  if (iconName === 'filter') {
    icon = {image: filter, function: buttonFunction};
  }

  return (
    <TouchableOpacity onPress={icon.function}>
      <View
        style={{
          flex: 1,
          width: 40,
          // borderWidth: 1,
        }}>
        <Image
          source={icon.image}
          style={{width: iconWidth, height: iconHeight}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Icon;
