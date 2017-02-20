
import React from 'react';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import {
   darkBlack
} from 'material-ui/styles/colors';

var filmsData = require('../../../../Data/films.json');
var castsData = require('../../../../Data/cast.json');
var casts=castsData['actor'];

const styles = {

};

export default class CastList extends React.Component
{

    render( ) {
        var films = filmsData['upcoming'];

        return (
            <div>
                {
                    this.props.width !== SMALL ?
                        <Table
                            fixedHeader={true}
                            >
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>影片</TableHeaderColumn>
                                    <TableHeaderColumn>年份</TableHeaderColumn>
                                    <TableHeaderColumn>类型</TableHeaderColumn>
                                    <TableHeaderColumn style={{width:60}}>预测票房</TableHeaderColumn>
                                    <TableHeaderColumn style={{width:40}}></TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                showRowHover={true}
                                //stripedRows={true}
                                >
                                {films.map((row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        {this.props.width !== SMALL && <TableRowColumn>{row.time}年</TableRowColumn>}
                                        {this.props.width !== SMALL && <TableRowColumn>{row.type}</TableRowColumn>}
                                        <TableRowColumn style={{width:60}}>{row.boxOffice}万</TableRowColumn>
                                        <TableRowColumn style={{width:40}}>
                                            <IconButton containerElement={<Link to="/mammoth/film"/>}>
                                                <ChevronRight/>
                                            </IconButton>
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> :
                        <List>
                            {films.map((row, index) => (
                                <div key={index}>
                                    <ListItem
                                        leftAvatar={<Avatar src={casts[row.演员名单.split('/')[0]]?casts[row.演员名单.split('/')[0]].img:''} />}
                                        primaryText={row.name}
                                        secondaryTextLines={2}
                                        secondaryText={
                                            <p>
                                                上映:{row.time} 类型:{row.type}<br/>
                                                <span style={{color:'FF8F00'}}>预测票房:{row.boxOffice}</span>
                                            </p>
                                        }
                                        containerElement={<Link to="/mammoth/film"/>}
                                        />
                                    <Divider inset={true}/>
                                </div>
                            ))}
                        </List>
                }
            </div>
        );
    }
}
