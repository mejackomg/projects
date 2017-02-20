
import React from 'react';
import ReactList from 'react-list';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router';

var tilesData = require('../../../../Data/films.json');
var films=[];

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

export default class FilmsList extends React.Component
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

        const film = films[index];

        return (
            <GridTile
                style={{margin:10,width:200,height:310,display: 'inline-block',textAlign:'left'}}
                key={film.name}
                title={film.name}
                subtitle={film.boxOffice?
                    (<span><b>票房</b>：{film.boxOffice}万</span>):(<span><b>预测票房</b>：{film.boxOffice1}万</span>)}
                actionIcon={<IconButton  containerElement={<Link to="/mammoth/film" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                >
              <img src={film.img} />
            </GridTile>
        );
    };

    render( )
    {
        films = tilesData[this.props.catalogue];
        return(
            <div>
                <ReactList
                    itemRenderer={this.renderQuizItem}
                    //itemsRenderer={this.renderQuizItemsGrid}
                    length={films.length}//activations.length}
                    //pageSize={24}
                    type='simple'
                    />
            </div>
        );
    }
}
