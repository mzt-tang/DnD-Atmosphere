import React, {Component} from "react";
import {InstantSearch, connectSearchBox, connectInfiniteHits, connectHighlight} from 'react-instantsearch-native';
import PropTypes from "prop-types";
import algoliasearch from "algoliasearch";
import {View, StyleSheet, Image, TextInput, FlatList, Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default function Search() {

    const client = algoliasearch('X3LKR35NR9', 'ae4c0b75ed4213da4cc7487e78c42256')

    return (
        <View style={styles.mainContainer}>
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
        <FontAwesome name="github"/>
        <View style={{ flex: 1 }}>
            <Text
                ellipsizeMode="tail"
                numberOfLines={2}
            >
                {repo.playlist}
            </Text>
        </View>
        <View>
            <FontAwesome name="star"/>
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
    logo: {
        height: 20,
        width: 20
    },
    textInput: {
        height: 30,
        fontSize: 24,
        width: 200 - 20
    }
});