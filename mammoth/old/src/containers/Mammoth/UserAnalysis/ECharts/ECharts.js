import React from 'react';
// import echarts from 'echarts/lib/echarts';
import echarts from 'echarts';
import EventListener from 'react-event-listener';


class ECharts extends React.Component {

    static propTypes = {
        onInit: React.PropTypes.func,
        option: React.PropTypes.object,
        notMerge: React.PropTypes.bool,
        notRefreshImmediately: React.PropTypes.bool,
        style: React.PropTypes.object,
        refresh: React.PropTypes.bool,
    };

    static defaultProps = {
        notMerge: false,
        notRefreshImmediately: false,
        style: {},
        refresh:true
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.setOption();
    }

    componentWillUnmount() {
        this.dispose();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.refresh != nextProps.refresh) {
            this.chart.resize();
        }
    }

    getInstance() {
        return this.chart;
    }

    setOption() {
        let {
            option,
            notMerge,
            notRefreshImmediately,
        } = this.props;
        if (option) {
            this.chart.showLoading();
            this.chart.setOption(option, notMerge, notRefreshImmediately);
            this.chart.hideLoading();
        }
    }

    init() {
        this.chart = echarts.init(this.refs.container);
        this.setOption();
    }

    dispose() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }

    handleResize = () => {
        this.chart.resize();
    };

    render() {
        let {
            option,
            notMerge,
            notRefreshImmediately,
            refresh,
            style,
            ...other,
        } = this.props;

        let newStyle = Object.assign({
            width: '100%',
            height: '100%',
        }, style);

        return (
            <div ref="container" {...other} style={newStyle}>
                <EventListener
                    target="window"
                    onResize={this.handleResize}
                />
            </div>
        );
    }
}

export default ECharts;