import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';



import type {
    BottomTabBarProps
  } from '@react-navigation/bottom-tabs';
import { JSX } from 'react';

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    const primaryColor = '#0891b2';
    const secondaryColor = '#737373'
    type RouteName = 'index' | 'search' | 'bookmark' | 'profile';

    const icons: Record<RouteName, (props: { color: string; size: number }) => JSX.Element> = {
        index: (props) => <AntDesign name="home" {...props} />,
        search: (props) => <Ionicons name="search" {...props} />,
        bookmark: (props) => <Octicons name="bookmark" {...props} />,
        profile: (props) => <MaterialCommunityIcons name="account-circle-outline" {...props} />,
    };

    return (
        
        <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
            };

            const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
            };

            return (
            <PlatformPressable
                key={route.name}
                style={styles.tabbarItem}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                {
                    
                    icons[route.name as RouteName]({
                        color: isFocused ? primaryColor : secondaryColor,
                        size: 24,
                    })
                    
                }
                <Text style={{ color: isFocused ? primaryColor : secondaryColor }}>
                {typeof label === 'function' ? label({
                    focused: isFocused,
                    color: isFocused ? colors.primary : colors.text,
                    position: 'below-icon',
                    children: route.name,
                }) : label}
                </Text>
            </PlatformPressable>
            );
        })}
    </View>
    )
}

export default TabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 25,
    borderCurve: 'continuous',
    paddingVertical: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  }
});