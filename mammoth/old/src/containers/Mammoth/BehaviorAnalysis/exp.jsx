import React,{Component} from 'react';
import {render} from 'react-dom';

export default class FilterButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickProps: {
                display: 'none', //控制display的值来隐藏与显示
                name:'筛选'
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.needConfirm) {
            this.setState(
                {
                    clickProps:{
                        display: 'none',
                        name:'筛选'
                    }
                 }
            );
        }
    }
    /*
     *  'inline-block' == this.state.clickProps.display   条件：当前的state中display的值是否为 inline-block
     *   this.setState({clickProps:{display: 'none',name:'筛选'}})  值：  如果是，则隐藏div并在button上显示'筛选'
     *   this.setState({clickProps:{display: 'inline-block',name:'取消'}});  值：  如果不是，则显示div并在button上显示'取消'
     */
    changeDisplay() {

    'inline-block' == this.state.clickProps.display ? this.setState({clickProps:{display: 'none',name:'筛选'}})
        : this.setState({clickProps:{display: 'inline-block',name:'取消'}});
        // this.props.click(this.state.clickProps.display);
    }

//this.props.children为这个按钮的子组件
    render(){
        return(
            <div className="box" style={{'margin': '20px'}}>
                <button ref="tip" className="btn btn-default"
                        style={{'display':'block','marginTop': '118px'}}
                        onClick={this.changeDisplay.bind(this)}>
                    <span className="glyphicon glyphicon-th-list">
                    </span>
                    {this.state.clickProps.name}
                </button>
                <div className="filter-box"
                     style={{'display':this.state.clickProps.display,
                     'height':'auto','padding':'10','border':'1px solid #ddd',
                     'borderRadius':'4','boxShadow':'0px 2px 4px #ccc',
                     'marginTop':'10','backgroundColor':'#fff',
                      'position':'fixed','left':'310px','zIndex':'9999',
                      'transition':'all 3s ease-in-out'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }


}

// import React,{Component} from 'react';
// import {render} from 'react-dom';
// import Input from 'react-bootstrap/lib/Input.js';
//
// import FilterButton from '../../../../public_component/button/FilterButton';
//
// export default class InspectionResults extends Component {
//     constructor(props){
//         super(props);
//     }
//
//     render(){
//
//         //使用一个常量，调用FilterButton，并把它的子组件回传
//
//         const selectBtn = (
//             <FilterButton
//                 //click={this.selectClick.bind(this)}
//                 //needConfirm={this.state.needConfirm}
//                 >
//                 <input
//                     //className="box-select"
//                     type='select' placeholder="选择部门"
//                        //onChange={this.changeDepartment.bind(this)}
//                        //value={this.state.department}
//                 >
//                         department
//                 </input>
//                 <input
//                     //className="box-select"
//                     type='select' placeholder="选择产品线"
//                        //onChange={this.changeProductLine.bind(this)}
//                        //value={this.state.productLine}
//                 >
//                     productLine1
//                 </input>
//                 <button type="button" name="新增"
//                         //className="btn btn-jj-add mt24"
//                         //onClick={this.selectConfirm.bind(this)}
//                 >
//                     确定
//                 </button>
//             </FilterButton>
//         );
//
//         return(
//             <div>{selectBtn}</div>
//         );
//     }
// }

// const children = (
//     <Input className="box-select" type='select'
// placeholder="测试加载" onChange={this.changeDepartment.bind(this)} value={this.state.department}>
// {department}
// </Input>
// <Input className="box-select" type='select'
// placeholder="测试加载" onChange={this.changeProductLine.bind(this)} value={this.state.productLine}>
// {productLine1}
// </Input>
// <button type="button" name="新增" className="btn btn-jj-add mt24" onClick={this.selectConfirm.bind(this)}>
//     确定
// </button>
// );
//
// <FilterButton chlidren={this.props.children} />