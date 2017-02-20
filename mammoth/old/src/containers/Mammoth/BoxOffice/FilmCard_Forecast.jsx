import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router';

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
                    cols={1}
                    rows={1}
                    >
                    <img src="http://www.cbooo.cn/moviepic/89952.jpg" />
                </GridTile>
            <GridTile
                cols={1.9}
                rows={1}
                >
                <Card zDepth={0} style={{margin:'auto 20px'}}>
                    <CardHeader
                        title="魔兽"
                        subtitle={ "Warcraft"  }
                        titleStyle={{fontSize:22}}
                        />
                    <CardText style={{fontSize:13}}>
                        <Paper zDepth={0}
                               style={{height: 41,width: 120,backgroundColor:'rgba(105,155,200,0.2)',color:'#2196F3',
                               textAlign: 'center',margin:'-40px 0 5px 5px',lineHeight:0.3}} >
                            <p style={{padding:'10px 0 0 0',fontSize:12}}>预测票房</p>
                            <h3>168210万</h3>
                        </Paper>

                        类型：动作/冒险/奇幻/战争<br/>
                        片长：123min<br/>
                        上映时间：2016-6-8（中国）<br/>
                        制式：2D/3D/IMAX<br/>
                        国家及地区：美国<br/>
                        制作公司：<Link to="/mammoth/casts/producer">环球影业公司</Link><br/>
                        发行公司：<Link to="/mammoth/casts/producer1">中国电影集团公司</Link>
                    </CardText>
                </Card>
            </GridTile>
            <GridTile
                cols={0.5}
                rows={1}
                style={{marginTop:20}}
                >
                主演：
                <GridTile
                    containerElement={<Link to="/mammoth/casts/actor" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title={'特拉维斯·费梅尔'}
                    //subtitle={'人气：9.0'}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src='http://pic.entgroup.cn/Person/d/201654144340162.jpg' />
                </GridTile>
                <GridTile
                    containerElement={<Link to="/mammoth/casts/actor" />}
                    style={{margin:5,width:80,height:105,display: 'inline-block',textAlign:'left'}}
                    //key={film.name}
                    title={'葆拉·帕顿'}
                    //subtitle={'人气：9.0'}
                    //actionIcon={<IconButton  containerElement={<Link to="/mammoth/actor" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                    >
                    <img src='http://pic.entgroup.cn/Person/d/20165595740401.jpg' />
                </GridTile>
            </GridTile>
            <GridTile
                cols={0.5}
                rows={1}
                style={{marginTop:20}}
                >
                导演：
            </GridTile>
        </GridList>
    </Paper>
);

export default FilmCard;