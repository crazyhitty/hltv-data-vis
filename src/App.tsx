import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    root: { paddingTop: 60, paddingBottom: 16, paddingHorizontal: 16, alignItems: 'center'},
    box: { backgroundColor: 'red', minWidth: 768  },
    title: { fontSize: 40, fontWeight: 'bold' },
    subtitle: { fontSize: 16, fontWeight: 'normal' }
});

class App extends React.Component {
  render() {
    return (
        <View style={styles.root}>
            <View style={styles.box}>
              <Text style={styles.title}>{'HLTV Weapon Stats'}</Text>
              <Text style={styles.subtitle}>{'2015-2021'}</Text>
                <View>

                </View>
            </View>
        </View>
    );
  }
}

export default App
