/**
 * Created by spattana on 4/6/16.
 */

import React from 'react';
import Chart from '../../Charts/Highcharts/Highcharts.react.js';
import HighchartsModule from 'highcharts/modules/treemap.js';
import Highcharts from 'highcharts';
//import randomColor from 'randomColor'
//const colors = randomColor({luminosity: 'dark', count: 27});
var data = {
        '卡司': {
            '演员指数': 6,
            '导演指数': 6,
            '编剧指数':5,
            '摄影指数':7,
            '音效指数':6
        },
        '营销': {
            '海报剧照': {
                '预告海报': 6,
                '正式海报': 7,
                '官方剧照': 8,
                '角色海报': 6,
                '新闻图片': 3,
                '工作照': 4,
                '截图': 5,
            },
            '片花预告片': 8,
            '网络新闻': {
                '网易': 5,
                '搜狐': 5,
                '腾讯娱乐': 6
            },
            '平面新闻': {
                '人民日报': 4,
                '先锋报': 6,
                '娱乐头条': 7
            },
            '社交平台': {
                '微信公众号': 7,
                '微博': 7,
                '豆瓣': 8,
                'Mtime': 6,
            }
        },
        '大盘': 8,
        '类型':7,
        '剧本':{
            '受众指数':6,
            '口碑':7,
            '热度':7
        },
        '档期':{
            '档期指数':6,
            '同档竞争力':8
        }
    },
    points = [],
    regionP,
    regionVal,
    regionI = 0,
    countryP,
    countryI,
    causeP,
    causeI,
    region,
    country,
    cause,
    causeName = {
        'Communicable & other Group I': 'Communicable diseases',
        'Noncommunicable diseases': 'Non-communicable diseases',
        'Injuries': 'Injuries'
    };


const process= ()=> {
    for (region in data) {
        if (data.hasOwnProperty(region)) {
            regionVal = 0;
            regionP = {
                id: 'id_' + regionI,
                name: region,
                color: Highcharts.getOptions().colors[regionI]
            };

            countryI = 0;
            for (country in data[region]) {
                if (data[region].hasOwnProperty(country)) {
                    countryP = {
                        id: regionP.id + '_' + countryI,
                        name: country,
                        parent: regionP.id
                    };

                    causeI = 0;
                    for (cause in data[region][country]) {
                        if (data[region][country].hasOwnProperty(cause)) {
                            causeP = {
                                id: countryP.id + '_' + causeI,
                                name: cause,
                                parent: countryP.id,
                                value: data[region][country][cause]//Math.round(+data[region][country][cause])
                            };
                            regionVal += causeP.value;
                            points.push(causeP);
                            causeI = causeI + 1;
                        }

                    }
                    if(causeI==0)
                        countryP.value = data[region][country];
                    points.push(countryP);
                    countryI = countryI + 1;
                }
            }

            if(countryI==0)
                regionP.value = data[region];
            //regionP.value = Math.round(regionVal / countryI);
            points.push(regionP);
            regionI = regionI + 1;
        }
    }
}

var myConfig = {
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        alternateStartingDirection: true,
        allowDrillToNode: true,
        animationLimit: 1000,
        //dataLabels: {
        //    enabled: false
        //},
        levelIsConstant: false,
        levels: [{
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
                enabled: true,
                //align: 'left',
                //verticalAlign: 'top',
                style: {
                    color: '#FFEB3B',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }
            },
            borderWidth: 3
        }],
        data: points
    }],
    subtitle: {
        text: '综合考虑票房影响因子，建立票房评估指标体系'
    },
    title: {
        text: '票房评估体系'
    }
};

export default class Chart1 extends React.Component
{

    render()
    {
        var modules=[];
        modules.push(HighchartsModule);

        if(points.length==0)
            process();
        return (
            <Chart container="treemap" modules={modules} options={myConfig} />
        );
    }
}


