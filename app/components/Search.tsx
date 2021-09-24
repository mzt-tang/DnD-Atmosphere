import React from "react";
import {View, StyleSheet, TextInput, FlatList, Text} from "react-native";

import {InstantSearch, connectSearchBox, connectInfiniteHits} from 'react-instantsearch-native';
import {client} from "../constants/ConfigKeys";

/**
 * The search component that sets up the search API using aloglia connectors.
 * @constructor
 */
export default function Search() {

    return (
        <View style={styles.mainContainer}>
            {/*Initialise and create the search client from index "Audio"*/}
            <InstantSearch searchClient={client} indexName={"Audio"}>
                <View style={styles.searchContainer}>
                    <SearchBox />
                </View>
                <Results />
            </InstantSearch>
        </View>
    );
}

/**
 * The searchbox which connects to the algolia api via its connect function
 */
const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
    return (
        <TextInput
            style={styles.textInput}
            onChangeText={text => refine(text)}
            value={currentRefinement}
            placeholder="'Tavern' or 'Titan'"
            placeholderTextColor='white'
            clearButtonMode="always"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
        />
    );
});

/**
 * THe results from the search box which connects to the algolia api via its connect function
 */
const Results = connectInfiniteHits(({ hits, hasMore, refineNext }) => {
    const onEndReached = () => {
        if (hasMore) {
            refineNext();
        }
    };
    return (
        <FlatList
            data={hits}
            onEndReached={onEndReached}
            keyExtractor={repo => repo.objectID}
            renderItem={({ item }) => <Repository repo={item} />}
        />
    );
});

/**
 * Displaying the results in a flatlist
 * @param repo
 * @constructor
 */
const Repository = ({ repo }:any) => (
    <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
            <Text style={{color: 'white'}} ellipsizeMode="tail" numberOfLines={2}>{repo.playlist}</Text>
        </View>
        <View>
            <Text style={{color: 'white'}}>{repo.title}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 30
    },
    searchContainer: {
        width: 200,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "rgb(200, 199, 204)",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    textInput: {
        color: 'white',
        height: 30,
        fontSize: 24,
        width: 200 - 20
    }
});