import React from 'react'
import { View, Text, FlatList } from 'react-native'
import ChatListItem from '../components/ChatListItem';

import users from '../data/users'
import ContactListItem from '../components/ContactListItem';

export default function ContactScreen() {
    return (
        <View style={{ backgroundColor: 'white' }}>
            <FlatList
                data={users}
                renderItem={({ item }) => <ContactListItem user={item} />}
                keyExtractor={item => item.id}

            />
        </View>
    )
}
