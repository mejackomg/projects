
import React from 'react';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

var filmsData = require('../../../../Data/films.json');

const styles = {
    root: {
        marginTop:0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
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


    render( ) {
        var films=filmsData[this.props.catalogue];

        return (
            <div>
                <Table
                    fixedHeader={true}
                    onRowSelection={(key)=>{
                        return ;
                    }}
                    >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn>影片</TableHeaderColumn>
                            <TableHeaderColumn>年份</TableHeaderColumn>
                            <TableHeaderColumn>类型</TableHeaderColumn>
                            <TableHeaderColumn>{this.props.catalogue=='history'?'票房':'预测票房'}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        //stripedRows={true}
                        >
                        {films.map( (row, index) => (
                            <TableRow key={index} selected={row.selected} >
                                <TableRowColumn>{
                                    <IconButton
                                        style={{background:`url(${row.img}) center / cover`,height:60}}
                                        containerElement={<Link to="/mammoth/film"/>}
                                        linkButton={true}
                                        />
                                }
                                </TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.time}年</TableRowColumn>
                                <TableRowColumn>{row.type}</TableRowColumn>
                                <TableRowColumn>{row.boxOffice}万</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
