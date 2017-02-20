import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router';

import CompositeValue from './CompositeValue.jsx'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin:'0 60px 30px 60px',
        //border:'1px solid grey'
    },
    gridList: {
        width: '100%',
        height: 300,
        overflowY: 'none',
        //marginBottom: 24,
    },
};


const FilmCard = () => (
    <Paper style={styles.root} zDepth={2}>
        <GridList
            cols={4}
            cellHeight={300}
            padding={0}
            style={styles.gridList}
            >
            <GridTile
                cols={1}
                rows={1}
                title={'黄渤'}
                subtitle='Bo Huang'
                >
                <img src="http://pic.entgroup.cn/Person/d/2016323151958241.jpg" />
            </GridTile>
            <GridTile
                cols={1.9}
                rows={1}
                >
                <CompositeValue />
            </GridTile>
            <GridTile
                cols={0.5}
                rows={1}
                style={{marginTop:20}}
                >
                最新作品：
                <GridTile
                    containerElement={<Link to="/mammoth/film" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title={'寻龙诀'}
                    //subtitle={'人气：9.0'}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src='/profile_photos/films/寻龙诀.jpg' />
                </GridTile>
                <GridTile
                    containerElement={<Link to="/mammoth/casts/actor" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title='痞子英雄'
                    //subtitle={'人气：9.0'}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src='http://www.cbooo.cn/moviepic/203729.jpg' />
                </GridTile>
            </GridTile>
            <GridTile
                cols={0.5}
                rows={1}
                style={{marginTop:20}}
                >
                即将上映：
                <GridTile
                    containerElement={<Link to="" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title={'记忆大师'}
                    subtitle={''}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/director" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src='http://www.cbooo.cn/moviepic/233371.jpg' />
                </GridTile>
            </GridTile>
        </GridList>
    </Paper>
);

export default FilmCard;