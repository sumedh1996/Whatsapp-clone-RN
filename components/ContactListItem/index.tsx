import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import styles from './styles';
import { User } from '../../types';
import { useNavigation } from '@react-navigation/native';

export type ContactListItem = {
  user: User;
}

const ContactListItem = (props: ContactListItem) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = () => {
    // navigate to chat
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text
              numberOfLines={2}
              style={styles.status}>
              {user.status}
            </Text>
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactListItem;