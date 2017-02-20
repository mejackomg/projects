
import React from 'react';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';


var films=[
    {"name":"曝终极海报-寻龙启程特辑","img":"/profile_photos/films/haibao.png","time":"2015.10.10","source":"Mtime时光网","上映日期":" 2015-12-18","档期":"贺岁档","上映天":"五","国别":"中国","影片制式":"2D+3D＋IMX3D+中国巨幕+全景声","时长（min）":"125","type":"奇幻 / 冒险／动作","导演":"乌尔善","编剧":"张家鲁 / 张牧野","摄影":"包轩鸣 Jack Pollack","剪辑":"杜媛 Yuan Du","美术":"郝艺 Yi Hao","演员名单":"陈坤 / 黄渤 / 舒淇 / 杨颖 / 夏雨 / 刘晓庆 / 颜卓灵 / 曹操 / 张东 / 黄西 / 僧格仁钦","A":"／","A－":"陈坤舒淇","B":"黄渤夏雨","C":"／","出品公司":"万达影视传媒有限公司 [中国]  ","联合出品":"华谊兄弟传媒股份有限公司 [中国]  ","发行公司":"五洲电影发行有限公司","联合发行":"华夏电影发行有限责任公司","boxOffice":"","年度场次":"835959","年度人次(万)":"3778.24","平均票价":"36","场均人次":"45","豆瓣":"7.7","时光":"7.5","猫眼":"9.2"},
    {"name":"曝万圣节剧照","img":"http://www.cbooo.cn/moviepic/203264.jpg","time":"2015.10.13","source":"豆瓣网","上映日期":"2014-09-30","档期":"国庆档","上映天":"二","国别":"中国","影片制式":"2D+IMAX2D","时长（min）":"110","type":"喜剧／爱情","导演":"宁浩","编剧":"岳小军 / 邢爱娜 / 孙小杭 / 董润年 / 章笛沙 / 张艺凡","摄影":"宋晓飞","剪辑":"杜媛","美术":"郝艺","演员名单":"黄渤 / 徐峥 / 袁泉 / 周冬雨 / 陶慧 / 岳小军 / 沈腾 / 张俪 / 马苏 / 刘美含 / 王砚辉 / 焦俊艳 / 郭涛 / 李晨 / 熊乃瑾 / 夏雨 / 刘仪伟 / 雷佳音 / 雍梦婷 / 梁浩","A":"／","A－":"徐峥黄渤","B":"／","C":"袁泉","出品公司":"北京映月东方文化传播","联合出品":"／","发行公司":"中国电影股份有限公司北京聚合影联文化传媒","联合发行":"／","boxOffice":"","年度场次":"952982","年度人次(万)":"3399.57","平均票价":"34","场均人次":"36","豆瓣":"7","时光":"7.3","猫眼":"8.6"},
    {"name":"曝人物海报","img":"http://www.cbooo.cn/moviepic/233826.jpg","time":"2015.10.16","source":"Mtime时光网","上映日期":"2014-06-27","档期":"暑期档","上映天":"五","国别":"中国","影片制式":"2D","时长（min）":"116","type":"喜剧／爱情","导演":"邓超／俞白眉","编剧":"俞白眉","摄影":"杜杰","演员名单":"邓超 / 杨幂 / 古力娜扎 / 栾元晖 / 秦越 / 许可嘉 / 梁超 / 赵曼竹 / 孙俪 / 柳岩 / 谢楠","A":"／","A－":"邓超杨幂","B":"／","C":"梁超","出品公司":"光线影业","联合出品":"／","发行公司":"光线影业","联合发行":"／","boxOffice":"","年度场次":"584887","年度人次(万)":"2001.22","平均票价":"33","场均人次":"34","豆瓣":"5.2","时光":"6","猫眼":"8.3"},
    ]

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

    render( ) {

        return (
            <div style={{marginTop:20}}>
                <Table
                    fixedHeader={true}
                    onRowSelection={(key)=>{
                        return ;
                    }}
                    >
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        //stripedRows={true}
                        >
                        {films.map( (row, index) => (
                            <TableRow key={index} selected={row.selected} >
                                <TableRowColumn>{
                                    <IconButton
                                        style={{background:`url(${row.img}) center / cover`,height:100,width:210}}
                                        containerElement={<Link to="/mammoth/film"/>}
                                        linkButton={true}
                                        />
                                }
                                </TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.time}</TableRowColumn>
                                <TableRowColumn>来源：{row.source}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
