# react-native-expandable-fab [![npm version](https://badge.fury.io/js/react-native-expandable-fab.svg)](https://badge.fury.io/js/react-native-expandable-fab)

This is a very small package for React Native containing an expandable and configurable floating action button.

<img src="./expandable-fab.gif" width="80">

## Installation

Using npm: ```npm i react-native-expandable-fab```
or with yarn: ```yarn add react-native-expandable-fab```

## Usage
This package provides a single component which can be configured to your liking.

### Props
| Prop name     | Prop type     | Description  |
| ------------- | ------------- | ----- |
| mainColor     | string        | Color of the main FAB button |
| secondaryColor| string        | Color of the smaller buttons |
| closeIcon     | ReactNode     | Component to be displayed as an icon on the main FAB button in its closed state |
| openIcon  | ReactNode        | Component to be displayed as an icon on the main FAB button in its opened state |
| menuIcons | MenuIcon[]        | Array of objects containing descriptions of the secondary FAB buttons |

#### MenuIcon
| Prop name     | Prop type     | Description  |
| ------------- | ------------- | ----- |
| name          | string        | Name of the button |
| icon          | ReactNode     | Component to be displayed as an icon on the button |
| text          | string?       | (_Optional_) Text to be displayed next to the button |
| callback      | () => void    | Callback function called upon clicking the button |


### Example
```jsx
import ExpandableFloatingAction from 'react-native-expandable-fab';

<ExpandableFloatingAction
    mainColor="#F58B33"
    secondaryColor="#F9B065"
    closeIcon={<Icon name='close-outline' fill='#000'/>}
    openIcon={<Icon name='radio-button-on-outline' fill='#000'/>}
    menuIcons={[
        {
            name: 'inviteToGroup',
            icon: <Icon name='person-add-outline' fill='#000'/>,
            text: <Text>Invite to this group</Text>,
            callback: () => {}
        },
        {
            name: 'createNewTask',
            icon: <Icon name='plus-outline' fill='#000'/>,
            text: <Text>Create new task</Text>,
            callback: () => {}
        }
    ]}
/>
```
