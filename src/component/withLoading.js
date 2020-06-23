import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../utils/Colors';

const WithLoading = (WrappedComponent) =>
  class Loading extends Component {
    render() {
      console.log('withLoading:', this.props);
      return (
        <>
          <ActivityIndicator
            size="large"
            color={Colors.greenMain}
            animating={this.props.isFetching}
            style={{
              backgroundColor: 'rgba(0, 166, 81, 0)',
              position: 'absolute',
              zIndex: 1000,
              top: '40%',
              left: '48%',
            }}
          />
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
export default WithLoading;
