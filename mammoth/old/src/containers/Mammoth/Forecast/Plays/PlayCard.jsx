import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from '../../../../../node_modules/material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router';
import keys from 'object-keys';

import {
    purple900,
    purple800,
    white,
    fullBlack,
    grey200
} from 'material-ui/styles/colors';

var castsData = require('../../../../../Data/cast.json');

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin:'10 60px 30px 60px',
        //border:'1px solid grey'
    },
    gridList: {
        width: '100%',
        height: 300,
        overflowY: 'none',
        //marginBottom: 24,
    }
};

const tilesData = [
    {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    }
    ];

const FilmCard = () => (
    <Paper style={styles.root} zDepth={2}>
         <GridList
            cols={4}
            cellHeight={300}
            padding={0}
            style={styles.gridList}
            >
            <GridTile
                cols={1.6}
                rows={1}
                >
                <Card zDepth={0} style={{backgroundColor:grey200,margin:'0 30 0 0px',height:'100%'}}>
                    <CardHeader
                        title="口袋公寓"
                        subtitle={ "票房预测：3～5 亿"  }
                        titleStyle={{fontSize:22,color:white,marginTop:10,marginLeft:20}}
                        subtitleStyle={{fontSize:18,color:'F9A825',marginTop:10,marginLeft:20,marginRight:-50}}
                        style={{backgroundColor:purple800}}
                        />
                        <div style={{fontSize:15,marginTop:30,fontSize:15,marginLeft:35}}>
                            上映时间：2016年<br/>
                            类型：爱情/喜剧/奇幻<br/>
                            档期推荐：七夕档（暑期档）<br/>
                            预算预测：5000万<br/>
                            后劲预测：2.7倍
                        </div>
                </Card>
            </GridTile>
            <GridTile
                cols={0.5}
                rows={1}
                style={{marginTop:20}}
                >
                演员推荐：
                <GridTile
                    containerElement={<Link to="/mammoth/casts/actor" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title='杨子珊'
                    //subtitle={'人气：9.0'}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src={castsData['actor']['杨子珊'].img} />
                </GridTile>
                <GridTile
                    containerElement={<Link to="/mammoth/casts/actor" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title='胡歌'
                    //subtitle={'人气：9.0'}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src={castsData['actor']['胡歌'].img} />
                </GridTile>
            </GridTile>
             <GridTile
                 cols={1}
                 rows={1}
                 style={{marginTop:20}}
                 >
                 备选演员：<br/>
                 <GridTile
                     containerElement={<Link to="/mammoth/casts/actor" />}
                     style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                     //key={film.name}
                     title='郭采洁'
                     //subtitle={'人气：9.0'}
                     //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                     >
                     <img src={castsData['actor']['郭采洁'].img} />
                 </GridTile>
                 <GridTile
                     containerElement={<Link to="/mammoth/casts/actor" />}
                     style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                     //key={film.name}
                     title='赵又廷'
                     //subtitle={'人气：9.0'}
                     //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                     >
                     <img src={castsData['actor']['赵又廷'].img} />
                 </GridTile>
                 <GridTile
                     containerElement={<Link to="/mammoth/casts/actor" />}
                     style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                     //key={film.name}
                     title='郑恺'
                     //subtitle={'人气：9.0'}
                     //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                     >
                     <img src={castsData['actor']['郑恺'].img} />
                 </GridTile>
             </GridTile>
            <GridTile
                cols={0.5}
                rows={1}
                style={{marginTop:20}}
                >
                导演推荐：
                <GridTile
                    containerElement={<Link to="/mammoth/casts/director" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title={'乌尔善'}
                    subtitle={''}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/director" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src={castsData['director']['乌尔善'].img} />
                </GridTile>
            </GridTile>
        </GridList>
    </Paper>
);

export default FilmCard;