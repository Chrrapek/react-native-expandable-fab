import React, {ReactNode, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';

interface ExpandableFabProps {
    closeIcon: ReactNode;
    openIcon: ReactNode;
    menuIcons: FabMenuElement[];
    mainColor?: string;
    secondaryColor?: string;
}

interface FabMenuElement {
    name: string;
    icon: ReactNode;
    text?: ReactNode;
    callback: () => void;
}

const ExpandableFloatingAction = (props: ExpandableFabProps) => {
    const [open, setOpen] = useState(false);
    const [fadeIn] = useState(new Animated.Value(0))
    const [topOffsetY] = useState(new Animated.Value(40))
    if (props.menuIcons.length > 4) {
        console.warn('You have provided more than 4 menu icons! Only the first four will be used.')
    }

    const closeFab = () => {
        Animated.parallel([
            Animated.timing(
                fadeIn,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                topOffsetY,
                {
                    toValue: 80,
                    duration: 300,
                    useNativeDriver: true
                }
            )
        ]).start(() => setOpen(false));
    }
    const openFab = () => {
        setOpen(true)
        Animated.parallel([
            Animated.timing(
                fadeIn,
                {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                topOffsetY,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    const toggleFab = () => {
        if (open) {
            closeFab()
        } else {
            openFab()
        }
    }

    return (
        <View style={styles.container}>
            {props.menuIcons.map(menuElement => (open && !!menuElement ?
                <Animated.View
                    key={menuElement.name}
                    style={{
                        ...styles.smallContainerStyle,
                        opacity: fadeIn,
                        transform: [{translateY: topOffsetY}]
                    }}>
                    {!!menuElement.text ? menuElement.text : null}
                    <TouchableOpacity
                        onPress={() => menuElement.callback()}
                        style={{
                            ...styles.mediumButton, ...styles.shadow,
                            backgroundColor: props.secondaryColor || 'white'
                        }}>
                        {menuElement.icon}
                    </TouchableOpacity>
                </Animated.View>
                : null)
            )}
            <TouchableOpacity onPress={() => toggleFab()}
                              style={{
                                  ...styles.mainButton, ...styles.shadow,
                                  backgroundColor: props.mainColor || 'white'
                              }}>
                {open ? props.closeIcon : props.openIcon}
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        bottom: 24,
        right: 24,
    },
    mainButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 0.5,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    mediumButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 0.5,
        margin: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 16,
    }

});

export default ExpandableFloatingAction;
