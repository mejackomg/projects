/* @flow weak */

// This is simply a copy of the light theme as per:
// http://www.material-ui.com/v0.15.0-alpha.1/#/customization/themes

import {
  darkBlack,
  grey100,
  grey300,
  grey500,
  lightBlack,
  purple900,
  purple800,
  yellow900,
  white,
  fullBlack
} from 'material-ui/styles/colors';
import {fade,emphasize} from 'material-ui/utils/colorManipulator';
import {
    typography
} from 'material-ui/styles';

export default {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopLeftNavMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: purple900,
    primary2Color: purple800,
    primary3Color: lightBlack,
    accent1Color: yellow900,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade( darkBlack, 0.3 ),
  },
  avatar: {
    borderColor: white,
  },
  tabs: {
    selectedTextColor: darkBlack,
    textColor:fade( darkBlack, 0.3 ),
  },
  gridTile:{
  title: {
    fontSize: '12px',
  }}
};
