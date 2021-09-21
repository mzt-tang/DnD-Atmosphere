import React from "react";
import {View, StyleSheet, Image, TextInput, FlatList, Text} from "react-native";

import {InstantSearch, connectSearchBox, connectInfiniteHits} from 'react-instantsearch-native';
import algoliasearch from "algoliasearch";


export default function Search() {
    // API key from from the Algolia API
    const client = algoliasearch('X3LKR35NR9', 'ae4c0b75ed4213da4cc7487e78c42256');

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

const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
    return (
        <TextInput
            style={styles.textInput}
            onChangeText={text => refine(text)}
            value={currentRefinement}
            placeholder="Search Something"
            clearButtonMode="always"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
        />
    );
});

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

const Repository = ({ repo }:any) => (
    <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
            <Text
                ellipsizeMode="tail"
                numberOfLines={2}
            >
                {repo.playlist}
            </Text>
        </View>
        <View>
            <Text>{repo.title}</Text>
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
        height: 30,
        fontSize: 24,
        width: 200 - 20
    }
});