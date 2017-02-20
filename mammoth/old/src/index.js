import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { isLoaded as isAuthLoaded, load as loadAuth } from './reducers/auth';

import configureStore from './store/configureStore';

import App from './containers/MapPage/MapContainer';
import Chrome from './containers/WelcomePage/Chrome.jsx';
import Home from './containers/WelcomePage/HomeScreen.jsx';
import Mammoth from './containers/Mammoth/Chrome.jsx';
//import Login from './containers/Login';
//import RestrictPage from './containers/misc/RestrictPage';
//import Home from './containers/home/Home';
//import UsersPage from './containers/user/UsersPage';
//import ReposPage from './containers/repo/ReposPage';
//import About from './containers/about/About';
import NotFound from './containers/NotFound';
import Film from './containers/Mammoth/Film/FilmPage.jsx';
//import SearchPage from './containers/Mammoth/SearchPage';
import FilmsPage from './containers/Mammoth/Film/FilmsPage.jsx';
import FilmsHome from './containers/Mammoth/Home/HomePage.jsx';
import ActorPage from './containers/Mammoth/Cast/Actor/ActorPage.jsx';
import CastsPage from './containers/Mammoth/Cast/CastsPage.jsx';

import BoxOfficePage from './containers/Mammoth/BoxOffice/BoxOfficePage.jsx';
import RowPiecePage from './containers/Mammoth/RowPiece/RowPiecePage.jsx';
import PlaysPage from './containers/Mammoth/Plays/PlaysPage.jsx'
import DirectorPage from './containers/Mammoth/Cast/Director/DirectorPage.jsx'
import ProducersPage from './containers/Mammoth/Producer/ProducersPage.jsx'
import ProducerPage from './containers/Mammoth/Producer/ProducerPage.jsx'
import ProducerPage1 from './containers/Mammoth/Producer/ProducerPage1.jsx'
import PublicOpinionPage from './containers/Mammoth/PublicOpinion/PublicOpinionPage.jsx'
// import ForecastPage from './containers/Mammoth/Forecast/ForecastPage.jsx'
// import PublicityPage from './containers/Mammoth/Forecast/Films/PublicityPage.jsx'
// import FilmReportPage from './containers/Mammoth/Forecast/Films/FilmReportPage.jsx'
// import PlayReportPage from './containers/Mammoth/Forecast/Plays/PlayReportPage.jsx'
// import ReputationPage from './containers/Mammoth/Forecast/Films/ReputationPage.jsx'
// import RowPiecePage1 from './containers/Mammoth/Forecast/Films/RowPiecePage.jsx'
import DataManagePage from './containers/Mammoth/DataManage/DataManagePage.jsx'
import User_Properties from './containers/UserManagement/User_Properties';
import User_UpdatePassword from './containers/UserManagement/User_UpdatePassword';
import DataTransforPage from './containers/Mammoth/ConfigManage/DataTransforPage.jsx'
import APIRecordPage from './containers/Mammoth/ConfigManage/APIRecordPage.jsx'
import SystemLog from './containers/Mammoth/ConfigManage/SystemLog.jsx'
import UserManagePage from './containers/Mammoth/ConfigManage/UserManagePage.jsx'

import ReportSalesOverview from './containers/Mammoth/Reports/ReportSalesOverview.jsx'
import ShopsData from './containers/Mammoth/Reports/ShopsData.jsx'
import UserView from './containers/Mammoth/Reports/UserView.jsx'
import GoodsData from './containers/Mammoth/Reports/GoodsData.jsx'

import ShopsProfile from './containers/Mammoth/Shops/ShopsProfile.jsx'
import ShopsRecord from './containers/Mammoth/Shops/ShopsRecord.jsx'
import ShopsPages from './containers/Mammoth/Shops/ShopsPage.jsx'

import UserProfile from './containers/Mammoth/UserAnalysis/UserProfile.jsx';
import UserRecord from './containers/Mammoth/UserAnalysis/UserRecord.jsx';
import UserPage from './containers/Mammoth/UserAnalysis/UserPage.jsx';

import RiskProfile from './containers/Mammoth/RiskManage/RiskProfile.jsx'
import ReportPage from './containers/Mammoth/Reports/ReportPage.jsx'

import FunnelAnalysis from './containers/Mammoth/BehaviorAnalysis/FunnelAnalysis.jsx'
import CriticalPath from './containers/Mammoth/BehaviorAnalysis/CriticalPath.jsx'
import EventAnalysis from './containers/Mammoth/BehaviorAnalysis/EventAnalysis.jsx'
import RetentionAnalysis from './containers/Mammoth/BehaviorAnalysis/RetentionAnalysis.jsx'
import IndexPage from './components/IndexPage'
// import Mixpanel from './components/mixpanel-node.js';


import './index.css';
import './styles.css';
import ShopLoanPage from './containers/Mammoth/Shops/ShopLoanPage.jsx'
import LoanAnalysis from './containers/Mammoth/Shops/LoanAnalysis.jsx'
require('./containers/Charts/china.js');
require('./containers/Charts/beijing.js');

// global.mixpanel = Mixpanel.init('6fd9434dba686db2d1ab66b4462a3000');

const store = configureStore();

const requireLogin = (nextState, replace, cb) => {
  function checkAuth() {
    const { authReducer: { user }} = store.getState();
    if (!user) {
      // oops, not logged in, so can't be here!
      replace('/');
    }
    cb();
  }

  if (!isAuthLoaded(store.getState())) {
    store.dispatch(loadAuth()).then(checkAuth);
  } else {
    checkAuth();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {/*<Route path="demo" component={App}/>*/}
      <Route onEnter={requireLogin} path="mammoth" component={Mammoth}>

        <Route path="reports/:level1/:level2" component={IndexPage} />
        <Route path="user">
          <IndexRoute component={User_Properties} />
          <Route path="updatePassword" component={User_UpdatePassword} />
        </Route>
        {/*<Route path="reports" >*/}
          {/*<IndexRoute component={IndexPage} />*/}
          {/*<Route path="sales" component={ReportSalesOverview} />*/}
          {/*<Route path="shopview" component={ShopsData} />*/}
          {/*<Route path="userview" component={UserView} />*/}
          {/*<Route path="goods" component={GoodsData} />*/}
        {/*</Route>*/}
        {/*<Route path="forecast">
          <IndexRoute component={ForecastPage} />
          <Route path="publicity" component={PublicityPage} />
          <Route path="reputation" component={ReputationPage} />
          <Route path="rowPiece" component={RowPiecePage1} />
          <Route path="filmReport" component={FilmReportPage} />
          <Route path="playReport" component={PlayReportPage} />
        </Route>*/}
        <Route path="casts">
          <IndexRoute component={CastsPage} />
          <Route path="actor" component={ActorPage}/>
          <Route path="director" component={DirectorPage}/>
          <Route path="producer" component={ProducerPage}/>
          <Route path="producer1" component={ProducerPage1}/>
        </Route>
        <Route path="producers">
          <IndexRoute component={ProducersPage} />
          <Route path="producer" component={ProducerPage}/>
          <Route path="producer1" component={ProducerPage1}/>
        </Route>
        <Route path="behavior">
          <IndexRoute component={FunnelAnalysis}/>
          <Route path="critical" component={CriticalPath} />
          <Route path="event" component={EventAnalysis}/>
          <Route path="retent" component={RetentionAnalysis} />
        </Route>
        <Route path="films" component={FilmsPage}/>
        <Route path="film" component={Film}/>
        <Route path="boxOffice" component={BoxOfficePage}/>
        <Route path="rowPiece" component={RowPiecePage}/>
        <Route path="publicOpinion" component={PublicOpinionPage}/>
        <Route path="plays" component={PlaysPage}/>
        <Route path="dataManage" component={DataManagePage}/>
        <Route path="configManage">
          <Route path="dataTransfor" component={DataTransforPage}/>
          <Route path="apiRecord" component={APIRecordPage}/>
          <Route path="systemLog" component={SystemLog}/>
          <Route path="userManage" component={UserManagePage}/>
        </Route>
        <Route path="shopsPages">
          <IndexRoute component={ShopsPages} />
          <Route path=":shopsId" component={ShopsProfile}/>
          <Route path="shopsRecord" component={ShopsRecord}/>
        </Route>
        <Route path="userpages">
          <IndexRoute component={UserPage} />
          <Route path=":usersId" component={UserProfile}/>
          <Route path="userRecord" component={UserRecord}/>
        </Route>
        <Route path="shopLoanPages">
          <IndexRoute component={ShopLoanPage} />
          <Route path=":shopsId" component={LoanAnalysis}/>
        </Route>
        /*<Route path="risk" component={RiskProfile} />*/
      </Route>
      <Route path="/" component={Chrome}>
        <IndexRoute component={Home} />
        <Route path="*" component={NotFound}/>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('root')
);
