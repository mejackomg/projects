
import React from 'react';
import ReactList from 'react-list';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router';
import keys from 'object-keys';
//import foreach from 'foreach';

var castsData = require('../../../../Data/cast.json');
var casts;

const styles = {
    root: {
        marginTop:300,
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

export default class CastList extends React.Component
{


  //render( )
  //{
  //  return(
  //      <div style={styles.root}>
  //        <GridList
  //          cellHeight={320}
  //          cols={4}
  //          style={styles.gridList}
  //          //padding={1}
  //        >
  //          {tilesData.map((tile) => (
  //              <GridTile
  //                  key={tile.name}
  //                  title={tile.name}
  //                  subtitle={<span><b>票房</b>：{tile.boxOffice}万</span>}
  //                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
  //                  >
  //                <img src={tile.img} />
  //              </GridTile>
  //          ))}
  //        </GridList>
  //      </div>
  //  );
  //}

    renderQuizItem = (index, key) => {
        //const { activations } = this.props;
        const name=keys(casts)[index];
        const cast = casts[name];
        return (
            <GridTile
                style={{margin:10,width:200,height:310,display: 'inline-block',textAlign:'left'}}
                key={key}
                title={name}
                subtitle={<span><b>人气</b>：{cast.renqi}</span>}
                actionIcon={
                    <IconButton
                        containerElement={
                        this.props.catalogue == 'actor'?
                            <Link to="/mammoth/casts/actor" />:<Link to="/mammoth/casts/director" />
                            }
                        linkButton={true} >
                        <StarBorder color="white" />
                    </IconButton>}
                >
                <img src={cast.img}/>
            </GridTile>
        );
    };

    render( )
    {
        casts = castsData[this.props.catalogue];

        return(
            <div>
                <ReactList
                    itemRenderer={this.renderQuizItem}
                    //itemsRenderer={this.renderQuizItemsGrid}
                    length={keys(casts).length}//activations.length}
                    //pageSize={24}
                    type='simple'
                    />
            </div>
        );
    }
}
