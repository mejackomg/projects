/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
//import Relay from 'react-relay';

import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';

import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';

import {darkWhite, lightWhite, grey900} from '../../../node_modules/material-ui/styles/colors';

class SearchBox extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      dataSource:[]
    };
  }


  getContent()
  {
    return [
      '苹果', 'Apricot', 'Avocado',
      'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
      'Boysenberry', 'Blood Orange',
      'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
      'Coconut', 'Cranberry', 'Clementine',
      'Damson', 'Date', 'Dragonfruit', 'Durian',
      'Elderberry',
      'Feijoa', 'Fig',
      'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
      'Honeydew', 'Huckleberry',
      'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
      'Kiwi fruit', 'Kumquat',
      'Lemon', 'Lime', 'Loquat', 'Lychee',
      'Nectarine',
      'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
      'Olive', 'Orange',
      'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
      'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
      'Quince',
      'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
      'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
      'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
      'Ugli fruit',
      'Watermelon',
    ];
  }



  getStyles()
  {
    const styles = {
      content: {
        textColor: this.context.muiTheme.palette.alternateTextColor,
      },
      contentWhenMedium:{
        //left:256+150,
      },
      underlineStyle: {
        borderColor: this.context.muiTheme.palette.alternateTextColor,
      },
      hintStyle: {
        color: this.context.muiTheme.palette.alternateTextColor,
      },
      underlineFocusStyle:{
        borderColor: this.context.muiTheme.palette.primary1Color
      },
    };

    //if ( this.props.width === MEDIUM || this.props.width === LARGE )
    if (this.props.width == LARGE)
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);

    return styles;
  }

  render( )
  {
    const styles = this.getStyles( )

    this.state.dataSource=this.getContent();
    let {
        dataSource,
    } = this.state
    let isFullWidth = true;
    if( this.props.width === LARGE )
    {
      isFullWidth = false;
      //styles.navDrawer = {
      //  zIndex: styles.appBar.zIndex - 1,
      //}
      //styles.appBar.paddingLeft = 276
      //styles.root.paddingLeft = 256
    }

    return (
      <div>
        <AutoComplete
            style={styles.content}
            fullWidth={isFullWidth}
            hintText="Search"
            filter={AutoComplete.fuzzyFilter}
            dataSource={dataSource}
            maxSearchResults={5}
            hintStyle={styles.hintStyle}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            />
      </div>
    )
  }
}


SearchBox.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default withWidth( )(SearchBox)
