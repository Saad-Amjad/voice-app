import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Platform,
  Linking
} from 'react-native';
export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    return fetch('http://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        <View style={{ backgroundColor: 'steelblue' }}>
          <Text>Voice App</Text>
        </View>
        <View style={{ backgroundColor: 'skyblue' }}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <Text>
                {item.title}, {item.releaseYear}
              </Text>
            )}
            keyExtractor={({ id }, index) => id}
          />
        </View>
      </View>
    );
  }
}
