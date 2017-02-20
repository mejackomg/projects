import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import Chart from '../../../components/Chart';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
/**
 * `SelectField` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */
const data = [
    {
        title:'商品总体类型',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '商品总体类型':[120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'商品销售类型',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '商品销售类型': [120, 132, 101, 134, 90, 230, 210]
        }
    }
]
export default class SelectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };


    }
    handleChangeTotal=(value)=>{
        this.setState({value})
    }

    render() {
        const {value}=this.state;
        return (
            <div>
                <header style={{display:'flex',padding:'16px 14px 8px 14px'}}>
                    <span style={{marginRight:'10px',width:'20%',fontSize:'24px',color:'#4c535a'}}>商品数据概况</span>
                    <div style={{width:'7%',margin:'-8px 0 0 33px',border:'1px solid #a8b7c8',borderRudius:'3px'}}>
                        <DropDownMenu value={value} onChange={this.handleChangeTotal}>
                            <MenuItem value={0} primaryText="天" />
                            <MenuItem value={1} primaryText="周" />
                            <MenuItem value={2} primaryText="月" />
                        </DropDownMenu>
                    </div>
                </header>
                <section style={{display:'flex',flexWrap:'wrap',padding:'10px'}}>
                    {data.map((value,index)=>
                        <Chart key={index} onChange={this.handleChange} title={value.title} yData={value.yDate} xData={value.xDate}/>
                    )}
                    <Paper style={{width:'48%',margin:'10px'}}>
                        <article style={{height:'318px'}}>
                            <header
                                style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>
                                <div style={{width:'76%'}}>
                                    <div
                                        style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>
                                        <p style={{margin:'0 0 3px 0'}}>今日的用户数据概览</p>
                                    </div>
                                    <div style={{fontSize:'12px',color:'#aaa'}}>
                                        <span>2016-11-14至2016-11-16 | 本周</span>
                                    </div>
                                </div>
                                <div style={{width:'24%',margin:'-8px 0 0 33px'}}>
                                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                                        <MenuItem value={0} primaryText="按天"/>
                                        <MenuItem value={1} primaryText="按周"/>
                                        <MenuItem value={2} primaryText="按月"/>
                                    </DropDownMenu>
                                </div>

                            </header>
                            <div style={{height:'252px'}}>
                                <div
                                    style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>
                                    11-16（三）
                                </div>
                                <div style={{display:'flex',flexDirection:'row',margin:'0 auto',width:'90%'}}>
                                    <div style={{width:'49.5%'}}>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>230</span>
                                            <span>次</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            商户总类型sku数</p>
                                    </div>
                                    <div style={{width:'49.5%'}}>
                                        <div style={{textAlign:'center',color:'#4a90e2',fontWeight:'700',marginTop:'15px'}}>
                                            <span style={{fontSize:'24px'}}>7255</span>
                                            <span>次</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            商户商品平均拥有数</p>

                                    </div>
                                </div>
                            </div>
                        </article>
                    </Paper>

                </section>


            </div>

        );
    }
}