/**
 * Motion framework for Android
 * 
 */

import React, { Component } from 'react';
import {  AppRegistry } from 'react-native';

import Root           from './app/native/containers/Root';
import configureStore from './app/store/ConfigureStore.prod.js';


const store = configureStore();

class MotionFramework extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
}

AppRegistry.registerComponent('MotionFramework', () => MotionFramework);
