/* @flow weak */
/* eslint react/prop-types: 0 */

import Helmet from "react-helmet";
import React from 'react'


export default class ChromeHelmet extends React.Component
{
  render( )
  {
    return (
      <Helmet
        title="Mammoth—电商金融大数据分析平台"
        meta={ [
          { name : "description", content: "Smart Analytics System for E-commerce and Financial Service" },
        ] }
      />
    )
  }
}
