import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import ChatListItem from '../components/ChatListItem';

//import users from '../data/users'
import ContactListItem from '../components/ContactListItem';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../graphql/queries';

export default function ContactScreen() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await API.graphql(graphqlOperation(listUsers));

                setUsers(userData.data.listUsers.items)
            } catch (err) {

            }
        }
        fetchUsers()
    }, [])
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
