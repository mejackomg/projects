
import React from 'react';

import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import BeforeAfterWrapper from 'material-ui/internal/BeforeAfterWrapper';
//import ExampleCards from './../../components/CastsList.jsx';
import {Link} from 'react-router';

import {grey200, darkWhite} from 'material-ui/styles/colors';
import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';

import {
    typography,
    spacing
} from 'material-ui/styles';

import FullWidthSection from '../../components/FullWidthSection.jsx'
import LoginButton from '../UserManagement/LoginButton.jsx'

let pictureURL="/profile_photos/hero.jpg";//appbar_background.png";
let pictureHeight = 580;


class HomeScreen extends React.Component
{
  homePageHero() {
    const styles = {
      root: {
        //backgroundColor: ,
        //overflow: 'hidden',
        position: 'absolute',
        left: 0,
        top: 50,
        width: '100%',
        textAlign:'center',
      },
      imgLogo: {
        marginLeft: 'calc(50% - 156)',
        width: 312,
        //height: 157,
      },
      tagline: {
        //margin: '84px auto 0 auto',
        marginTop: 68,
        width:'100%',
        textAlign: 'center',
        //maxWidth: 575,
        color: darkWhite,
      },
      buttonLabel: {
        //color: this.context.muiTheme.palette.primary1Color,
        color:darkWhite,
        fontWeight:typography.fontWeightNormal,
        fontSize:16,
        lineHeight: '40px',
      },
      buttonStyle: {
        margin: '16px 32px 0px 32px',
        width:100,
        height:40,
        border:'1px solid #fff',
        borderRadius:4
      },
      h1: {
        fontWeight: typography.fontWeightMedium,
        fontSize:30,
        textShadow:'1px 1px 1px rgba(0, 0, 0, 0.5)'
      },
      h2: {
        fontSize: 20,
        lineHeight: '32px',
        //paddingTop: 19,
        //marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      rootWhenSmall:{
        top: 100,
      },
      imgLogoWhenSmall: {
        width: 230,
      },
      taglineWhenSmall: {
        marginTop: 38,
      },
      h1WhenSmall: {
        fontSize: 22,
      },
      h2WhenSmall: {
        fontSize: 15,
        lineHeight: '28px',
        //paddingTop: 16,
        //marginBottom: 12,
      },
      buttonWhenSmall: {
        margin: '16px 20px 0px 20px',
        width:80,
        height:36,
      },
      buttonLabelWhenSmall: {
        fontSize:15,
        lineHeight: '36px',
      },
    };

    styles.h2 = Object.assign({}, styles.h1, styles.h2);

    if (this.props.width === SMALL) {
      styles.root = Object.assign({}, styles.root, styles.rootWhenSmall);
      styles.imgLogo = Object.assign({}, styles.imgLogo, styles.imgLogoWhenSmall);
      styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenSmall);
      styles.h1 = Object.assign({}, styles.h1, styles.h1WhenSmall);
      styles.h2 = Object.assign({}, styles.h2, styles.h2WhenSmall);
      styles.buttonLabel = Object.assign({}, styles.buttonLabel, styles.buttonLabelWhenSmall);
      styles.buttonStyle = Object.assign({}, styles.buttonStyle, styles.buttonWhenSmall);
    }

    return (
        <FullWidthSection style={styles.root}>
          <img style={styles.imgLogo} src="/logo6.png" />
          <div style={styles.tagline}>
            <h1 style={styles.h1}>猛犸电商金融大数据分析平台</h1>
            <h2 style={styles.h2}>
              <span style={styles.nowrap}>我们更了解数据</span>
              <span style={styles.nowrap}> 用数据创造价值</span>
            </h2>
            <LoginButton />
          </div>
        </FullWidthSection>
    );
  }
  // <FlatButton containerElement={<Link to="/demo" />} label="Demo" style={styles.buttonStyle} labelStyle={styles.buttonLabel}/>
  // containerElement={<Link to="/mammoth" />} label="Sign in" style={styles.buttonStyle} labelStyle={styles.buttonLabel}/>

  homeFeatures(){
    const desktopGutterMore = spacing.desktopGutterMore;
    const desktopGutter = spacing.desktopGutter;

    const styles = {
      root: {
        //padding:`${desktopGutterMore}px 0`,
      },
      row:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
        padding:`${desktopGutter}px 0`,
      },
      title:
      {
        fontWeight: typography.fontWeightMedium,
        fontSize: 24,
        lineHeight: '32px',
        color:'rgba(211, 168, 9, .9)'
      },
      img:{
        height:250,
      },
      imgWhenSmall:{
        height:180,
      },
      content:{
        color:'#6C7279',
        fontSize:16,
        fontWeight:300,
        lineHeight: '26px',
        width: 350,
      },
      contentWhenSmall:{
        width: 300,
      }
    }

    if (this.props.width === SMALL) {
      styles.img = Object.assign({}, styles.img, styles.imgWhenSmall);
      styles.content = Object.assign({}, styles.content, styles.contentWhenSmall);

    }

    return(
        <FullWidthSection style={styles.root}>
          <div style={styles.row}>
            <img style={styles.img} src='/profile_photos/analytics.png' />
            <div>
              {/*<h2 style={styles.title}>Advanced analytic tools</h2>*/}
              <p style={styles.content}>
                猛犸数据分析平台（以下简称“平台”）是一个互联网大数据爬取、存储、分析、应用的一体化数据增值平台，为金融，电商领域的客户提供数据决策支持，通过大数据能力驱动金融和电商等服务对象的运营精细化，更好地提升其业绩和成效。
              </p>
            </div>
          </div>

          <div style={{backgroundColor:'rgba(115, 145, 145, 0.05)'}}>
            <div style={styles.row}>
              <div>
                {/*<h2 style={styles.title}>On the go</h2>*/}
                <p style={styles.content}>
                  系统采集目标站点的前后端数据进行整合，向企业提供基于流量、访客、内容、商品和销售五大对象的数据分析，通过图形报表形式向企业管理者展示电子商务的核心数据，如访客地区来源、流量来源与转化率、复购率和销售集中度等，同时满足企业对于WA和BA分析需求。
                </p>
              </div>
              <img style={styles.img} src='/profile_photos/devices.png' />
            </div>
          </div>

          <div style={styles.row}>
            <img style={styles.img} src='/profile_photos/embed.png' />
            <div>
              {/*<h2 style={styles.title}>Integration</h2>*/}
              <p style={styles.content}>
                本平台构建适合于金融，电商系统特点的大数据平台，采用先进的深度机器学习算法，在商户，用户评级；实施反欺诈等方面取得了良好的效果。为平台用户运营工作和风险控制提供了有力的数据工具。
              </p>
            </div>
          </div>
        </FullWidthSection>
    );
  }

  render( )
  {
    return (
      <div>
        <Paper
            zDepth={2}
            style={{
            background: `url(${pictureURL}) center / cover`,
            height: '100%',//pictureHeight,
            width: '100%',
            minHeight: pictureHeight,
            //background-color: @primary-1-color;
            position: "absolute",
            top: 0,
          }}>
          <BeforeAfterWrapper
              beforeStyle={styles.before}
              afterStyle={styles.after}
              />
        </Paper>

        {this.homePageHero()}
        {this.homeFeatures()}
      </div>
    );
  }
}

HomeScreen.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  //router: React.PropTypes.object.isRequired
};

const styles = {

  before: {
    content: "' '",
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    background: '-webkit-linear-gradient(right, rgba(255, 255, 255, 0) 0%, transparent 1%, rgba(0, 0, 0, 0.1) 26%, rgba(0, 0, 0, 0.35) 71%, rgba(0, 0, 0, 0.5) 100%)',
    //background: '-moz-linear-gradient(right, rgba(255, 255, 255, 0) 0%, transparent 1%, rgba(0, 0, 0, 0.1) 26%, rgba(0, 0, 0, 0.35) 71%, rgba(0, 0, 0, 0.5) 100%)',
    //background: '-o-linear-gradient(right, rgba(255, 255, 255, 0) 0%, transparent 1%, rgba(0, 0, 0, 0.1) 26%, rgba(0, 0, 0, 0.35) 71%, rgba(0, 0, 0, 0.5) 100%)',
    //background: 'linear-gradient(right, rgba(255, 255, 255, 0) 0%, transparent 1%, rgba(0, 0, 0, 0.1) 26%, rgba(0, 0, 0, 0.35) 71%, rgba(0, 0, 0, 0.5) 100%)',
  },
  after: {
    content: "' '",
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    /*background: rgba(6, 13, 32, 0.15);*/
    /*background: rgba(13, 37, 102, 0.24);*/
    background: 'rgba(32, 54, 114, 0.29)',
  }
};

export default withWidth( )(HomeScreen)

