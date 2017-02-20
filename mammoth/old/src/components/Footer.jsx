/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react'

import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import {LARGE}  from 'material-ui/utils/withWidth';
import FullWidthSection from './FullWidthSection.jsx'


const styles = {
  footer: {
    backgroundColor: grey900,
    textAlign: 'center',
    paddingRight: 24
  },
  a: {
    color: darkWhite,
  },
  p: {
    margin: '0 auto',
    padding: 0,
    color: lightWhite,
    maxWidth: 356,
  },
}


export default class Footer extends React.Component
{
  render( )
  {
    if (!this.props.fullWidth)
      styles.footer.paddingLeft = 240 + 24
    else
      styles.footer.paddingLeft = 24

    return (
      <FullWidthSection width={ this.props.width } style={ styles.footer } >
        <p style={ styles.p }>
          服务热线：8610-59519607 股票代码:430152<br/>
          北京市海淀区海淀上地三街9号金隅嘉华大厦D座909室<br/>
          京ICP备11029596号-5<br/>
          版权所有 北京思创银联科技股份有限公司
        </p>
      </FullWidthSection>
    )
  }
}

