import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            stories: [],
            search: '',
            lastVisibleStory: null
        }
    }

    componentDidMount = async () => {
        const query = await db
            .collection("stories")
            .get();
        query.docs.map((doc) => {
            this.setState({
                stories: [...this.state.stories, doc.data()],
                lastVisibleStory: doc
            });
        });
    }

    retrieveStories = async (text) => {
        this.setState({
            search: text,
        });
        var stories = [];
        var storyRef = [];
        if(text){
            storyRef = await db
                .collection("stories")
                .where("storyTitle", ">=", text)
                .get();
        } else {
            storyRef = await db
                .collection("stories")
                .get();
        }
        storyRef.docs.map((doc) => {
            stories.push(doc.data());
            this.setState({
                stories: stories,
                lastVisibleStory: doc
            });
        });
    }

    fetchMoreStories = async () => {
        var text = this.state.search;
        const query = await db
            .collection("stories")
            .where("storyTitle", ">=", text)
            .startAfter(this.state.lastVisibleStory)
            .limit(10)
            .get();
        query.docs.map((doc) => {
            this.setState({
                stories: [...this.state.stories, doc.data()],
                lastVisibleStory: doc
            });
        });
    }

    render(){
        return (
            <SafeAreaProvider>
                <Header
                backgroundColor={'red'}
                centerComponent={{text: "Bedtime Stories", style: {color: "white", fontWeight: "bold", fontSize: 20}}} />
                <SearchBar
                placeholder="Search a Book"
                onChangeText={(text) => {
                    this.retrieveStories(text);
                }}
                value={this.state.search}
                style={{color: "white"}} />
                <FlatList
                data={this.state.stories}
                renderItem={({item}) => (
                    <View style={{borderBottomWidth: 2}}>
                        <Text>{"Title: " + item.storyTitle}</Text>
                        <Text>{"Author: " + item.author}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.fetchMoreStories}
                onEndThreshold={0.7} /> 
            </SafeAreaProvider>
        );
    }
}