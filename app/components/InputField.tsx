import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * THe input field for sig
 * @param leftIcon
 * @param iconColor
 * @param rightIcon
 * @param inputStyle
 * @param containerStyle
 * @param placeholderTextColor
 * @param handlePasswordVisibility
 * @param rest
 * @constructor
 */
const InputField = ({ leftIcon, iconColor = '#000',
                        rightIcon,
                        inputStyle,
                        containerStyle,
                        placeholderTextColor = '#444',
                        handlePasswordVisibility,
                        ...rest
                    }:any) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {leftIcon ? (
                <MaterialCommunityIcons
                    name={leftIcon}
                    size={20}
                    color={iconColor}
                    style={styles.leftIcon}
                />
            ) : null}
            <TextInput
                {...rest}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, inputStyle]}
            />
            {rightIcon ? (
                <TouchableOpacity onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons
                        name={rightIcon}
                        size={20}
                        color={iconColor}
                        style={styles.rightIcon}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        flexDirection: 'row',
        padding: 12
    },
    leftIcon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        width: '100%',
        fontSize: 18
    },
    rightIcon: {
        alignSelf: 'center',
        marginLeft: 10
    }
});

export default InputField;