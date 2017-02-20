
import React from 'react';
import ReactList from 'react-list';
import MobileTearSheet from '../../../components/MobileTearSheet';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Link} from 'react-router';
//import keys from 'object-keys';
//import foreach from 'foreach';
import {
    pinkA200,
    transparent
} from 'material-ui/styles/colors';

var castsData = require('../../../../Data/cast.json');
var casts;

var rankList= [
    {listName:"票房号召力榜",actors: ["徐峥","黄渤","刘德华","成龙","冯绍峰","鹿晗","郭富城","吴彦祖","张涵予","葛优"]},
    {listName:"热搜榜",actors: ["邓超","王凯","范冰冰","孙红雷","杨颖","舒淇","章子怡","杨子珊","李晨","郑恺"]},
    {listName:"新人榜",actors: ["吴亦凡","鹿晗","杨洋","李易峰","井柏然","陈伟霆","郑恺","林更新","陈学冬","黄轩"]}
]

const styles = {
    root: {
        //marginTop:300,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
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
    renderQuizItem = (index, key) => {
        //const { activations } = this.props;
        const rank = rankList[index];
        return (
            <MobileTearSheet key={key} height={610}>
                <List>
                    <Subheader>{rank.listName}</Subheader>
                    {
                        rank.actors.map((name,key) => (
                        <ListItem
                            key={key}
                            primaryText={name}
                            leftAvatar={<Avatar color={pinkA200} backgroundColor={transparent} >{key+1}</Avatar>}
                            rightAvatar={<Avatar src={casts[name].img} />}
                            //rightAvatar={<Avatar src={casts.hasOwnProperty(name)? casts[name].img:''} />}
                            containerElement={<Link to="/mammoth/casts/actor" />}
                            />
                        ))
                    }
                </List>
            </MobileTearSheet>
        );
    };

    render( )
    {
        casts = castsData[this.props.catalogue];

        return(
            <div style={styles.root}>
                <ReactList
                    itemRenderer={this.renderQuizItem}
                    //itemsRenderer={this.renderQuizItemsGrid}
                    length={rankList.length}//activations.length}
                    //pageSize={24}
                    type='simple'
                    />
            </div>
        );
    }
}
