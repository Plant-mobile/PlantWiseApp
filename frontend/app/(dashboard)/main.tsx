import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import React from 'react'

const main = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>main</Text>
    </SafeAreaView>
  )
}

export default main

const styles = StyleSheet.create({})