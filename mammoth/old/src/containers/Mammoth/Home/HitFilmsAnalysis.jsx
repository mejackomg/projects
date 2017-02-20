
import React from 'react';
import ReactList from 'react-list';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from '../../../../node_modules/material-ui/svg-icons/toggle/star-border';

var tilesData = require('../../../../Data/films.json');


const styles = {
    root: {
        marginBottom:60,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        //height: 500,
        overflowY: 'auto',
        margin: '(24px,0)'
    },
};

export default class HitFilmsAnalysis extends React.Component
{


  render( )
  {
    return(
        <div style={styles.root}>
          <GridList
            cellHeight={320}
            cols={4}
            style={styles.gridList}
            //padding={1}
          >
            {tilesData.map((tile) => (
                <GridTile
                    key={tile.name}
                    title={tile.name}
                    subtitle={<span><b>票房</b>：{tile.boxOffice}万</span>}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                  <img src={tile.img} />
                </GridTile>
            ))}
          </GridList>
        </div>
    );
  }

}
