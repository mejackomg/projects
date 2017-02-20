'use strict';
const QUERY1 = 'QUERY1';
const QUERY1_SUCCESS = 'QUERY1_SUCCESS';
const QUERY1_FAIL = 'QUERY1_FAIL';
const QUERY2 = 'QUERY2';
const QUERY2_SUCCESS = 'QUERY2_SUCCESS';
const QUERY2_FAIL = 'QUERY2_FAIL';
const QUERY3 = 'QUERY3';
const QUERY3_SUCCESS = 'QUERY3_SUCCESS';
const QUERY3_FAIL = 'QUERY3_FAIL';
const QUERYDetail = 'QUERYDetail';
const QUERYDetail_SUCCESS = 'QUERYDetail_SUCCESS';
const QUERYDetail_FAIL = 'QUERYDetail_FAIL';

const QUERYOrderRevoke = 'QUERYOrderRevoke';
const QUERYOrderRevoke_SUCCESS = 'QUERYOrderRevoke_SUCCESS';
const QUERYOrderRevoke_FAIL = 'QUERYOrderRevoke_FAIL';

const QUERYOrderRevokeDetail = 'QUERYOrderRevokeDetail';
const QUERYOrderRevokeDetail_SUCCESS = 'QUERYOrderRevokeDetail_SUCCESS';
const QUERYOrderRevokeDetail_FAIL = 'QUERYOrderRevokeDetail_FAIL';

const QUERY4 = 'QUERY4';
const QUERY4_SUCCESS = 'QUERY4_SUCCESS';
const QUERY4_FAIL = 'QUERY4_FAIL';

const QUERYSEARCH = 'QUERYSEARCH';
const QUERYSEARCH_SUCCESS = 'QUERYSEARCH_SUCCESS';
const QUERYSEARCH_FAIL = 'QUERYSEARCH_FAIL';

const QUERY5 = 'QUERY5';
const QUERY5_SUCCESS = 'QUERY5_SUCCESS';
const QUERY5_FAIL = 'QUERY5_FAIL';
const QUERY6 = 'QUERY6';
const QUERY6_SUCCESS = 'QUERY6_SUCCESS';
const QUERY6_FAIL = 'QUERY6_FAIL';
const usersCredit_Histroy = 'usersCredit_Histroy';
const usersCredit_Histroy_SUCCESS = 'usersCredit_Histroy_SUCCESS';
const usersCredit_Histroy_FAIL = 'usersCredit_Histroy_FAIL';
const SingleUserCredit_history = 'SingleUserCredit_history';
const SingleUserCredit_history_SUCCESS = 'SingleUserCredit_history_SUCCESS';
const SingleUserCredit_history_FAIL = 'SingleUserCredit_history_FAIL';
const UserConsumption_Curve='UserConsumption_Curve';
const UserConsumption_Curve_SUCCESS = 'UserConsumption_Curve_SUCCESS';
const UserConsumption_Curve_FAIL = 'UserConsumption_Curve_FAIL';

const SingleUser='SingleUser';
const SingleUser_SUCCESS = 'SingleUser_SUCCESS';
const SingleUser_FAIL = 'SingleUser_FAIL';

const QUERY7 = 'QUERY7';
const QUERY7_SUCCESS = 'QUERY7_SUCCESS';
const QUERY7_FAIL = 'QUERY7_FAIL';
const QUERY8 = 'QUERY8';
const QUERY8_SUCCESS = 'QUERY8_SUCCESS';
const QUERY8_FAIL = 'QUERY8_FAIL';
const QUERY9 = 'QUERY9';
const QUERY9_SUCCESS = 'QUERY9_SUCCESS';
const QUERY9_FAIL = 'QUERY9_FAIL';
const QUERY10 = 'QUERY10';
const QUERY10_SUCCESS = 'QUERY10_SUCCESS';
const QUERY10_FAIL = 'QUERY10_FAIL';
//电话归属
const QUERY11 = 'QUERY11';
const QUERY11_SUCCESS = 'QUERY11_SUCCESS';
const QUERY11_FAIL = 'QUERY11_FAIL';
//
const QUERSaleAnalysis = 'QUERSaleAnalysis';
const QUERSaleAnalysis_SUCCESS = 'QUERSaleAnalysis_SUCCESS';
const QUERSaleAnalysis_FAIL = 'QUERSaleAnalysis_FAIL';
//用户
const QUERUsers = 'QUERUsers';
const QUERUsers_SUCCESS = 'QUERUsers_SUCCESS';
const QUERUsers_FAIL = 'QUERUsers_FAIL';

const QUERUser = 'QUERUser';
const QUERUser_SUCCESS = 'QUERUser_SUCCESS';
const QUERUser_FAIL = 'QUERUser_FAIL';

const UPDATE = 'DATABASE/UPDATE';
const UPDATE_SUCCESS = 'DATABASE/UPDATE_SUCCESS';
const UPDATE_FAIL = 'DATABASE/UPDATE_FAIL';

const DELETE = 'DATABASE/DELETE';
const DELETE_SUCCESS = 'DATABASE/DELETE_SUCCESS';
const DELETE_FAIL = 'DATABASE/DELETE_FAIL';

const operateUser = 'DATABASE/operateUser';
const operateUser_SUCCESS = 'DATABASE/operateUser_SUCCESS';
const operateUser_FAIL = 'DATABASE/operateUser_FAIL';



const addNewUserData = 'DATABASE/addNewUserData';
const addNewUserData_SUCCESS = 'DATABASE/addNewUserData_SUCCESS';
const addNewUserData_FAIL = 'DATABASE/addNewUserData_FAIL';

const UPDATEUser = 'DATABASE/UPDATEUser';
const UPDATEUser_SUCCESS = 'DATABASE/UPDATEUser_SUCCESS';
const UPDATEUser_FAIL = 'DATABASE/UPDATEUser_FAIL';

const DELETEUserManageTable = 'DATABASE/DELETEUserManageTable';
const DELETEUserManageTable_SUCCESS = 'DATABASE/DELETEUserManageTable_SUCCESS';
const DELETEUserManageTable_FAIL = 'DATABASE/DELETEUserManageTable_FAIL';


const QUERY12 = 'QUERY12';
const QUERY12_SUCCESS = 'QUERY12_SUCCESS';
const QUERY12_FAIL = 'QUERY12_FAIL';

const QUERY13 = 'QUERY13';
const QUERY13_SUCCESS = 'QUERY13_SUCCESS';
const QUERY13_FAIL = 'QUERY13_FAIL';

const QUERY14 = 'QUERY14';
const QUERY14_SUCCESS = 'QUERY14_SUCCESS';
const QUERY14_FAIL = 'QUERY14_FAIL';
const QUERYAPIRecord = 'QUERYAPIRecord';
const QUERYAPIRecord_SUCCESS = 'QUERYAPIRecord_SUCCESS';
const QUERYAPIRecord_FAIL = 'QUERYAPIRecord_FAIL';

const QUERYSystemLog = 'QUERYSystemLog';
const QUERYSystemLog_SUCCESS = 'QUERYSystemLog_SUCCESS';
const QUERYSystemLog_FAIL = 'QUERYSystemLog_FAIL';

const QUERYUserManageTable = 'QUERYUserManageTable';
const QUERYUserManageTable_SUCCESS = 'QUERYUserManageTable_SUCCESS';
const QUERYUserManageTable_FAIL = 'QUERYUserManageTable_FAIL';

const QUERYColumnList = 'QUERYColumnList';
const QUERYColumnList_SUCCESS = 'QUERYColumnList_SUCCESS';
const QUERYColumnList_FAIL = 'QUERYColumnList_FAIL';
const USERPATH = 'USERPATH';
const USERPATH_SUCCESS = 'USERPATH_SUCCESS';
const USERPATH_FAIL = 'USERPATH_FAIL';
const QUERY15 = 'QUERY15';
const QUERY15_SUCCESS = 'QUERY15_SUCCESS';
const QUERY15_FAIL = 'QUERY15_FAIL';
const QUERY16 = 'QUERY16';
const QUERY16_SUCCESS = 'QUERY16_SUCCESS';
const QUERY16_FAIL = 'QUERY16_FAIL';
const QUERY17 = 'QUERY17';
const QUERY17_SUCCESS = 'QUERY17_SUCCESS';
const QUERY17_FAIL = 'QUERY17_FAIL';
const QUERY18 = 'QUERY18';
const QUERY18_SUCCESS = 'QUERY18_SUCCESS';
const QUERY18_FAIL = 'QUERY18_FAIL';
const QUERY19 = 'QUERY19';
const QUERY19_SUCCESS = 'QUERY19_SUCCESS';
const QUERY19_FAIL = 'QUERY19_FAIL';
const QUERY20 = 'QUERY20';
const QUERY20_SUCCESS = 'QUERY20_SUCCESS';
const QUERY20_FAIL = 'QUERY20_FAIL';
const QUERY21 = 'QUERY21';
const QUERY21_SUCCESS = 'QUERY21_SUCCESS';
const QUERY21_FAIL = 'QUERY21_FAIL';
const QUERY22 = 'QUERY22';
const QUERY22_SUCCESS = 'QUERY22_SUCCESS';
const QUERY22_FAIL = 'QUERY22_FAIL';

const QUERY23 = 'QUERY23';
const QUERY23_SUCCESS = 'QUERY23_SUCCESS';
const QUERY23_FAIL = 'QUERY23_FAIL';
const QUERY24 = 'QUERY24';
const QUERY24_SUCCESS = 'QUERY24_SUCCESS';
const QUERY24_FAIL = 'QUERY24_FAIL';
const QUERY25 = 'QUERY25';
const QUERY25_SUCCESS = 'QUERY25_SUCCESS';
const QUERY25_FAIL = 'QUERY25_FAIL';
const QUERY26 = 'QUERY26';
const QUERY26_SUCCESS = 'QUERY26_SUCCESS';
const QUERY26_FAIL = 'QUERY26_FAIL';
const QUERY27 = 'QUERY27';
const QUERY27_SUCCESS = 'QUERY27_SUCCESS';
const QUERY27_FAIL = 'QUERY27_FAIL';
const QUERY28 = 'QUERY28';
const QUERY28_SUCCESS = 'QUERY28_SUCCESS';
const QUERY28_FAIL = 'QUERY28_FAIL';
const QUERY29 = 'QUERY29';
const QUERY29_SUCCESS = 'QUERY29_SUCCESS';
const QUERY29_FAIL = 'QUERY29_FAIL';
const SINGLESHOPUSER = 'SINGLESHOPUSER';
const SINGLESHOPUSER_SUCCESS = 'SINGLESHOPUSER_SUCCESS';
const SINGLESHOPUSER_FAIL = 'SINGLESHOPUSER_FAIL';

const QUERY30 = 'QUERY30';
const QUERY30_SUCCESS = 'QUERY30_SUCCESS';
const QUERY30_FAIL = 'QUERY30_FAIL';
const QUERY31 = 'QUERY31';
const QUERY31_SUCCESS = 'QUERY31_SUCCESS';
const QUERY31_FAIL = 'QUERY31_FAIL';

const QUERYShopLoan = 'QUERYShopLoan';
const QUERYShopLoan_SUCCESS = 'QUERYShopLoan_SUCCESS';
const QUERYShopLoan_FAIL = 'QUERYShopLoan_FAIL';

const QUERYShopLoanRisk = 'QUERYShopLoanRisk';
const QUERYShopLoanRisk_SUCCESS = 'QUERYShopLoanRisk_SUCCESS';
const QUERYShopLoanRisk_FAIL = 'QUERYShopLoanRisk_FAIL';

const QUERYFUNNEL = 'QUERYFUNNEL';
const QUERYFUNNEL_SUCCESS = 'QUERYFUNNEL_SUCCESS';
const QUERYFUNNEL_FAIL = 'QUERYFUNNEL_FAIL';

const QUERYCREATE ='QUERYCREATE';
const QUERYCREATE_SUCCESS = 'QUERYCREATE_SUCCESS';
const QUERYCREATE_FAIL = 'QUERYCREATE_FAIL';
const QUERYDELETE = 'QUERYDELETE';
const QUERYDELETE_SUCCESS = 'QUERYDELETE_SUCCESS';
const QUERYDELETE_FAIL = 'QUERYDELETE_FAIL';
const QUERYGETFUNNEL = 'QUERYGETFUNNEL';
const QUERYGETFUNNEL_SUCCESS = 'QUERYGETFUNNEL_SUCCESS';
const QUERYGETFUNNEL_FAIL = 'QUERYGETFUNNEL_FAIL';
const LOADFUNNELSTEP = 'LOADFUNNELSTEP';
const LOADFUNNELSTEP_SUCCESS = 'LOADFUNNELSTEP_SUCCESS';
const LOADFUNNELSTEP_FAIL = 'LOADFUNNELSTEP_FAIL';

const LOADFUNNELSTEPDe = 'LOADFUNNELSTEPDe';
const LOADFUNNELSTEPDe_SUCCESS = 'LOADFUNNELSTEPDe_SUCCESS';
const LOADFUNNELSTEPDe_FAIL = 'LOADFUNNELSTEPDe_FAIL';

const DICTTITLE = 'DICTTITLE';
const DICTTITLE_SUCCESS = 'DICTTITLE_SUCCESS';
const DICTTITLE_FAIL = 'DICTTITLE_FAIL';

const CUSTOMEREVENT = 'CUSTOMEREVENT';
const CUSTOMEREVENT_SUCCESS = 'CUSTOMEREVENT_SUCCESS';
const CUSTOMEREVENT_FAIL = 'CUSTOMEREVENT_FAIL';

const QUERYEventCoulumn = 'QUERYEventCoulumn';
const QUERYEventCoulumn_SUCCESS = 'QUERYEventCoulumn_SUCCESS';
const QUERYEventCoulumn_FAIL = 'QUERYEventCoulumn_FAIL';

const QUERYEventTriggerTimes = 'QUERYEventTriggerTimes';
const QUERYEventTriggerTimes_SUCCESS = 'QUERYEventTriggerTimes_SUCCESS';
const QUERYEventTriggerTimes_FAIL = 'QUERYEventTriggerTimes_FAIL';

const QUERYLoanShops = 'QUERYLoanShops';
const QUERYLoanShops_SUCCESS = 'QUERYLoanShops_SUCCESS';
const QUERYLoanShops_FAIL = 'QUERYLoanShops_FAIL';

const QUERYPageAccess = 'QUERYPageAccess';
const QUERYPageAccess_SUCCESS = 'QUERYPageAccess_SUCCESS';
const QUERYPageAccess_FAIL = 'QUERYPageAccess_FAIL';

const QUERYUVAccess = 'QUERYUVAccess';
const QUERYUVAccess_SUCCESS = 'QUERYUVAccess_SUCCESS';
const QUERYUVAccess_FAIL = 'QUERYUVAccess_FAIL';

const QUERYAvgPVAccess = 'QUERYAvgPVAccess';
const QUERYAvgPVAccess_SUCCESS = 'QUERYAvgPVAccess_SUCCESS';
const QUERYAvgPVAccess_FAIL = 'QUERYAvgPVAccess_FAIL';

const QUERYOrderChange = 'QUERYOrderChange';
const QUERYOrderChange_SUCCESS = 'QUERYOrderChange_SUCCESS';
const QUERYOrderChange_FAIL = 'QUERYOrderChange_FAIL';

const QUERYAvgPrice = 'QUERYAvgPrice';
const QUERYAvgPrice_SUCCESS = 'QUERYAvgPrice_SUCCESS';
const QUERYAvgPrice_FAIL = 'QUERYAvgPrice_FAIL';

const QUERYTrafficData = 'QUERYTrafficData';
const QUERYTrafficData_SUCCESS = 'QUERYTrafficData_SUCCESS';
const QUERYTrafficData_FAIL = 'QUERYTrafficData_FAIL';

const initialState = {
  updateUserResult: 'loading',

  tableData: {srcPlatforms: {}, dstTables: {},updateRules:{},mappingData: []},

  userManageTableData:{mappingUserData:[]},
  userManageTableLoading:false,
  userManageTableLoaded:false,

  ColumnListData:{userTypeData:[],platformTypeData:[]},
  ColumnListLoading:false,
  ColumnListLoaded:false,


  mappingData: [],
  shopData:{shopLabelData:[],creditData:[]},//,saleLonLatData:[]
  ShopOverviewData:{shopHistoryData:[],shopGrade:[],shopAvgCredit:0,shopAvgCreditW:[],shopAvgCreditM:[]},
  usersCreditHistroyData:{UserHistoryData:{},AvgCredit:0,UserGrade:[]},
  SingleUserCredit_historyData:{SingleUserHistoryData:{},SingleUserAvgCredit:[],SinglePortrait:[]},
  saleData:[],
  saleDataDetail:[],
  OrderRevokeData:[],
  OrderRevokeDetail:[],
  shopMapData:[],
  shopTopData:[],
  shopWordData:[],
  SingleShopMapData1:[],
  shopsRows:{shops:[],dataTotal:0,repayrecord:[],loandata:[],summoney:[]},
  SingleShopsData:[],
  ShopTelephoneDate:{},
  SaleAnalysisDate:[],
    loadSingleShopUserData:[],

  UserData:{Userlist:[],count:0},
  UserConsumptionCurveData:[],
  SingleUserData:{},

  SingleData:[],

  APIRecordDataResult:{apiRecordData:[],apiCount:0},
  systemLogDataResult:{systemLogData:[],systemLogCount:0},
  loading: false,
  loaded: false,
  apiLoaded:false,
  apiLoading:false,
  logLoaded:false,
  logLoading:false,
  buyUserCountResult:{},
  DailyOrderResult:{},

  salesOverviewResult:[],
  TotalSalesVolumeResult:{},
  DaypriceResult:{},
  totalIncomeResult:{},

  ShopsOverviewResult:{},
  ShopsConsumptionResult:{},
  ShopsCreditValueResult:{},
  NumbeOfUsersResult:{},
  OrderNumberResult:{},

  UserOverviewResult:{},
  UserConsumptionResult:{},
  UserCreditValueResult:{},
  averageConsumerSpendingResult:{},

  CommodityOverviewResult:{},
  TotalSalesTop10Result:{},
  SalesYesterdayTop10Result:{},
  SingleShopSalesResult:{},
  SingleShopOrderResult:{},
  ShopLoanData:{repayRecord:[],loanData:[],sumMoney:[]},
  ShopLoanRiskData:[],

  PathFunnelData:[],
  PathFunnelDataDe:[],
  GetData:{Funnel_name:[],choose_name:[],DictTitle:[]},
  EventCoulumnData:{eventCoulumn:[],eventType:[]},
  EventTriggerTimes:[],
  createFunnelFlag: '',
  DeleteFunnelFlag:'',
  DictTitleData:[],
  customereventData:{},
  event:{eventData:{},eventTriggerData:{}},

  LoanshopsRows:{shops:[],dataTotal:0,repayrecord:[],loandata:[],summoney:[]},

  UserPathData:[],

  PVAccessResult:{},
  UVAccessResult:{},
  AvgPVAccessResult:{},
  OrderChangeResult:{},
  AvgPriceResult:{},
  TrafficDataResult:{}
};

export function changeDateFormat (date) {
  var newdate = '';
  if(date){
    newdate=date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate()
  }
  return newdate;
}

export function databaseReducer(state = initialState, action = {}) {
  // console.log(action.type);
  switch (action.type) {
    case QUERY1:
      return Object.assign({}, state, {
        initLoading: true
      });
    case QUERY1_SUCCESS:
      return Object.assign({}, state, {
        initLoading: false,
        initLoaded: true,
        tableData: action.result,
        error: null
      });
    case QUERY1_FAIL:
      return Object.assign({}, state, {
        initLoading: false,
        initLoaded: false,
        tableData: null,
        error: action.error
      });
    case QUERYUserManageTable_SUCCESS:
      return Object.assign({}, state, {
        userManageTableLoading: false,
        userManageTableLoaded: true,
        userManageTableData: action.result,
        error: null
      });

    case QUERYColumnList_SUCCESS:
      return Object.assign({}, state, {
        ColumnListLoading: false,
        ColumnListLoaded: true,
        ColumnListData: action.result,
        error: null
      });
    case USERPATH_SUCCESS:
      return Object.assign({},state,{
        UserPathData:action.result
      })
    case QUERY2:
      return Object.assign({}, state, {
        loading: true
      });
    case QUERY2_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        mappingData: action.result,
        error: null
      });
    case QUERY2_FAIL:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        mappingData: null,
        error: action.error
      });
    case QUERY3_SUCCESS:
      return Object.assign({}, state, {
        saleData: action.result,
        error: null
      });
    case QUERYDetail_SUCCESS:
    return Object.assign({}, state, {
      saleDataDetail: action.result,
      error: null
    });

    case QUERYOrderRevokeDetail_SUCCESS:
      return Object.assign({}, state, {
        OrderRevokeDetail: action.result,
        error: null
      });


    case QUERYOrderRevoke_SUCCESS:
      return Object.assign({}, state, {
        OrderRevokeData: action.result,
        error: null
      });
    case QUERY4_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        shopsRows: action.result,
        error: null
      });
    case QUERYSEARCH_SUCCESS:
      return Object.assign({},state,{
        loaded:true,
        SingleShopsData:action.result,
        error:null
      })
    case QUERY5_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        shopData: action.result,
        error: null
      });
    case QUERY6_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        ShopOverviewData: action.result,
        error: null
      });
    case usersCredit_Histroy_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        usersCreditHistroyData: action.result,
        error: null
      });
    case SingleUserCredit_history_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        SingleUserCredit_historyData: action.result,
        error: null
      });
    case UserConsumption_Curve_SUCCESS:
      return Object.assign({},state,{
        loaded: true,
        UserConsumptionCurveData:action.result,
        error:null
      });
    case SingleUser_SUCCESS:
      return Object.assign({},state,{
        loaded: true,
        SingleUserData:action.result,
        error:null
      });

    case QUERY7_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        shopMapData: action.result,
        error: null
      });
    case QUERY8_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        shopTopData: action.result,
        error: null
      });
    case QUERY9_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        shopWordData: action.result,
        error: null
      });
    case QUERY10_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        SingleShopMapData1: action.result,
        error: null
      });
    case QUERY11_SUCCESS:
      return Object.assign({}, state, {
          loaded: true,
          ShopTelephoneDate: action.result,
          error: null
      });
    case QUERSaleAnalysis_SUCCESS:
      return Object.assign({}, state, {
          loaded: true,
          SaleAnalysisDate: action.result,
          error: null
      });
    case QUERUsers_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        UserData: action.result,
        error: null
      });

    case QUERUser_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        SingleData: action.result,
        error: null
      });

    case SINGLESHOPUSER_SUCCESS:
      return Object.assign({},state,{
        loadSingleShopUserData:action.result,
    });
    case QUERY30_SUCCESS:
      return Object.assign({},state,{
        SingleShopSalesResult:action.result
      });
    case QUERY31_SUCCESS:
      return Object.assign({},state,{
        SingleShopOrderResult:action.result
      })
    case UPDATE:
      return Object.assign({}, state, {
        updating: true
      });
    case UPDATE_SUCCESS:
      return Object.assign({}, state, {
        updating: false,
        updated: true,
        updateResult: action.result,
        updateError: null
      });
    case UPDATE_FAIL:
      return Object.assign({}, state, {
        updating: false,
        updated: false,
        updateResult: null,
        updateError: action.error
      });
    case DELETE_SUCCESS:
      return Object.assign({}, state, {
        deleted: true,
        deleteResult: action.result,
        deleteError: null
      });
    case DELETE_FAIL:
      return Object.assign({}, state, {
        deleted: false,
        deleteResult: null,
        deleteError: action.error
      });
    case DELETEUserManageTable_SUCCESS:
      return Object.assign({}, state, {
        //deletedUserManageTable: true,
        //deleteUserManageTableResult: action.result,
        //deleteUserManageTableError: null
        operateUserResult:action.result,
        operateUserError:null
      });
    case DELETEUserManageTable_FAIL:
      return Object.assign({}, state, {
        //deletedUserManageTable: false,
        //deleteUserManageTableResult: null,
       // deleteUserManageTableError: action.error
        operateUserResult:null,
        operateUserError:action.error
      });

    case addNewUserData_SUCCESS:
      return Object.assign({}, state, {
        //addNewUserDataResult: action.result,
        //uaddNewUserDataError: null
        operateUserResult:action.result,
        operateUserError:null

      });

    case addNewUserData_FAIL:
      return Object.assign({}, state, {
        //addNewUserDataResult: null,
        //addNewUserDataError: action.error
        operateUserResult:null,
        operateUserError:action.error
      });
    case UPDATEUser:
      return Object.assign({}, state, {
        updateUserResult:'loading'
      });
    case UPDATEUser_SUCCESS:
      return Object.assign({}, state, {
        updateUserResult:'success'
      });

    case UPDATEUser_FAIL:
      return Object.assign({}, state, {
        updateUserResult:'fail'
      });


    case QUERY12_SUCCESS:
      return Object.assign({}, state, {
        buyUserCountResult: action.result,
      });

    case QUERYAPIRecord_SUCCESS:
      return Object.assign({}, state, {
        apiLoading: false,
        apiLoaded:true,
        APIRecordDataResult: action.result,
      });
    case QUERYSystemLog_SUCCESS:
      return Object.assign({}, state, {
        logLoading: false,
        logLoaded:true,
        systemLogDataResult: action.result,
      });
    case QUERY13_SUCCESS:
      return Object.assign({}, state, {
        salesOverviewResult: action.result,
      });
    case QUERY14_SUCCESS:
      return Object.assign({}, state, {
        DailyOrderResult: action.result,
      });
    case QUERY15_SUCCESS:
      return Object.assign({}, state, {
        totalIncomeResult: action.result,
      });
    case QUERY16_SUCCESS:
      return Object.assign({}, state, {
        TotalSalesVolumeResult: action.result,
      });
    case QUERY17_SUCCESS:
      return Object.assign({}, state, {
        DaypriceResult: action.result,
      });
    case QUERY18_SUCCESS:
      return Object.assign({}, state, {
        ShopsConsumptionResult: action.result,
      });
    case QUERY19_SUCCESS:
      return Object.assign({}, state, {
        ShopsCreditValueResult: action.result,
      });
    case QUERY20_SUCCESS:
      return Object.assign({}, state, {
        averageConsumerSpendingResult: action.result,
      });
    case QUERY21_SUCCESS:
      return Object.assign({}, state, {
        ShopsOverviewResult: action.result,
      });
    case QUERY22_SUCCESS:
      return Object.assign({}, state, {
        NumbeOfUsersResult: action.result,
      });
    case QUERY23_SUCCESS:
      return Object.assign({}, state, {
        OrderNumberResult: action.result,
      });
    case QUERY24_SUCCESS:
      return Object.assign({}, state, {
        UserOverviewResult: action.result,
      });
    case QUERY25_SUCCESS:
      return Object.assign({}, state, {
        UserCreditValueResult: action.result,
      });
    case QUERY26_SUCCESS:
      return Object.assign({}, state, {
        UserConsumptionResult: action.result,
      });
    case QUERY27_SUCCESS:
      return Object.assign({}, state, {
        TotalSalesTop10Result: action.result,
      });
    case QUERY28_SUCCESS:
      return Object.assign({}, state, {
        SalesYesterdayTop10Result: action.result,
      });
    case QUERY29_SUCCESS:
      return Object.assign({}, state, {
        CommodityOverviewResult: action.result,
      });
    case QUERYShopLoan_SUCCESS:
      return Object.assign({}, state, {
        ShopLoanData: action.result,
      });

    case QUERYShopLoanRisk_SUCCESS:
      return Object.assign({}, state, {
        ShopLoanRiskData: action.result,
      });

    case QUERYFUNNEL_SUCCESS:
      return Object.assign({},state,{
        // GetData: action.result,
      });
    case QUERYCREATE_SUCCESS:
      return Object.assign({},state,{
        createFunnelFlag: action.result.result
      });
    case QUERYDELETE_SUCCESS:
      return Object.assign({},state,{
        DeleteFunnelFlag:action.result.result
      })
    case QUERYGETFUNNEL_SUCCESS:
      return Object.assign({},state,{
          GetData: action.result,
          createFunnelFlag: '',
          DeleteFunnelFlag:''
      });
    case LOADFUNNELSTEP_SUCCESS:
      return Object.assign({},state,{
          PathFunnelData:action.result,
      })
    case LOADFUNNELSTEPDe_SUCCESS:
      return Object.assign({},state,{
          PathFunnelDataDe:action.result,
      })
    case DICTTITLE_SUCCESS:
      return Object.assign({},state,{
        DictTitleData:action.result,
      })
    case CUSTOMEREVENT_SUCCESS:
      return Object.assign({},state,{
        customereventData:action.result,
      })
    case QUERYEventCoulumn_SUCCESS:
      return Object.assign({}, state, {
        EventCoulumnData: action.result,
      });

    case QUERYEventTriggerTimes_SUCCESS:
      return Object.assign({}, state, {
        event: action.result,
      });
    case QUERYLoanShops_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        LoanshopsRows: action.result,
        error: null
      });//贷款商户

    case QUERYPageAccess_SUCCESS:
      return Object.assign({}, state, {
        PVAccessResult: action.result,
      });

    case QUERYUVAccess_SUCCESS:
      return Object.assign({}, state, {
        UVAccessResult: action.result,
      });

    case QUERYAvgPVAccess_SUCCESS:
      return Object.assign({}, state, {
        AvgPVAccessResult: action.result,
      });

    case QUERYOrderChange_SUCCESS:
      return Object.assign({}, state, {
        OrderChangeResult: action.result,
      });

    case QUERYAvgPrice_SUCCESS:
      return Object.assign({}, state, {
        AvgPriceResult: action.result,
      });

    case QUERYTrafficData_SUCCESS:
      return Object.assign({}, state, {
        TrafficDataResult: action.result,
      });

    default:
      return state;
  }
}

export function loadTransTable() {
  return {
    types: [QUERY1, QUERY1_SUCCESS, QUERY1_FAIL],
    promise: (client) => client.get('/mysql/loadTransTable/param1')
  };
}

export function loadMappingTable() {
  return {
    types: [QUERY2, QUERY2_SUCCESS, QUERY2_FAIL],
    promise: (client) => client.get('/mysql/loadMappingTable/param1')
  };
}

export function loadColumnList(){
  return {
    types: [QUERYColumnList, QUERYColumnList_SUCCESS, QUERYColumnList_FAIL],
    promise: (client) => client.get('/mysql/loadColumnList')
  };

}
export function loadUserPath(EventChoice,StartEnd,EventC,fromDate,toDate) {
  return {
    types:[USERPATH,USERPATH_SUCCESS,USERPATH_FAIL],
    promise:(client) => client.post('/mysql/loadUserPath',{
      data:{
        EventChoice:EventChoice,
        StartEnd:StartEnd,
        EventC:EventC,
        fromDate:fromDate,
        toDate:toDate
      }
    })
  }
}
export function updateMappingData(data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/mysql/updateMappingTable', {
      data: data
    })
  };
}

export function addNewUser(userPlatformName,userType,platformName,userRealName,userPhone,userActivated,userPassword) {
  return {
    types: [addNewUserData, addNewUserData_SUCCESS, addNewUserData_FAIL],
    promise: (client) => client.post('/mysql/addNewUser', {
      data:{
        userPlatformName,
        userType,
        platformName,
        userRealName,
        userPhone,
        userActivated,
        userPassword
      }
    })
  };
}

export function updateUser(userId,userPlatformName,userType,
                               userRealName,userPhone,userActivated,userName) {
  return {
    types: [UPDATEUser, UPDATEUser_SUCCESS, UPDATEUser_FAIL],
    promise: (client) => client.post('/mysql/updateUser', {
      data:{
        userId,
        userPlatformName,
        userType,
        userRealName,
        userPhone,
        userActivated,
        userName
      }
    })
  };
}

export function deleteMappingData(configId,configTableId) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.post('/mysql/deleteMappingTable', {
      data: {
        configId:configId,
        configTableId:configTableId
      }
    })
  };
}
//用户信用历史曲线
export function usersCreditHistroy() {
  return {
    types: [usersCredit_Histroy, usersCredit_Histroy_SUCCESS, usersCredit_Histroy_FAIL],
    promise: (client) => client.get('/mysql/usersCreditHistroy')
  };
}
//单个用户的消费曲线图
export function UserConsumptionCurve(userId) {
  return {
    types:[UserConsumption_Curve,UserConsumption_Curve_SUCCESS,UserConsumption_Curve_FAIL],
    promise:(client) => client.get('/mysql/UserConsumptionCurve/'+userId)
  }
}

export function SingleUserConsumptionCurve(fromDate,toDate,period,userId) {
  return {
    types:[SingleUser,SingleUser_SUCCESS,SingleUser_FAIL],
    promise:(client) => client.post('/mysql/SingleUser/',{
      data: {
        userId:userId,
        fromDate:fromDate, 
        toDate:toDate, 
        period:period,

      }

    })
  }
}

//单个用户的信用历史曲线
export function SingleusersCreditHistroy(userId) {
  return {
    types: [SingleUserCredit_history, SingleUserCredit_history_SUCCESS, SingleUserCredit_history_FAIL],
    promise: (client) => client.get('/mysql/SingleusersCreditHistroy/'+userId)
  };
}
//用戶管理表
export function deleteUserManageTable(userId, platformtypeId) {
  return {
    types: [DELETEUserManageTable, DELETEUserManageTable_SUCCESS, DELETEUserManageTable_FAIL],
    promise: (client) => client.post('/mysql/deleteUserManageTable', {
      data: {
        userId:userId,
        platformtypeId:platformtypeId
      }
    })
  };
}
//商户
export function loadShops(page,pageLineCount,searchText,creditFrom,creditTo){
  return {
    types: [QUERY4, QUERY4_SUCCESS, QUERY4_FAIL],
    promise: (client) => client.post('/mysql/loadShops',{
      data: {
        page:page,
        pageLineCount:pageLineCount,
        searchText:searchText,
        creditFrom:creditFrom,
        creditTo:creditTo
      }
    })
  }
}

//商户
export function loadShopsSearch(shopsId){
  return {
    types: [QUERYSEARCH, QUERYSEARCH_SUCCESS, QUERYSEARCH_FAIL],
    promise: (client) => client.post('/mysql/loadShopsSearch',{
      data: {
        shopsId:shopsId
      }
    })
  }
}

//单个用户
export function loadUsersSearch(searchText){
  return {
    types: [QUERUsers, QUERUsers_SUCCESS, QUERUsers_FAIL],
    promise: (client) => client.post('/mysql/loadUsers',{
      data: {
        page:1,
        pageLineCount:10,
        searchText:searchText,
      }
    })
  }
}

export function loadSingleUsersSearch(searchText){
  return {
    types: [QUERUser, QUERUser_SUCCESS, QUERUser_FAIL],
    promise: (client) => client.post('/mysql/loadSingleUsersSearch',{
      data: {
        page:1,
        pageLineCount:10,
        searchText:searchText,
      }
    })
  }
}


//用户
export function loadUsers(page,pageLineCount,searchText) {
  return {
    types: [QUERUsers, QUERUsers_SUCCESS, QUERUsers_FAIL],
    promise: (client) => client.post('/mysql/loadUsers',{
      data: {
        page:page,
        pageLineCount:pageLineCount,
        searchText:searchText,
      }
    })
  };
}

/*export function loadSingleUsers(page,pageLineCount,searchText) {
  return {
    types: [QUERUsers, QUERUsers_SUCCESS, QUERUsers_FAIL],
    promise: (client) => client.post('/mysql/loadUsers',{
      data: {
        page:page,
        pageLineCount:pageLineCount,
        searchText:searchText,
      }
    })
  };
}*/

export function loadOrderRevoke1(shopsId,date_start,date_end) {
  return {
    types: [QUERYOrderRevoke, QUERYOrderRevoke_SUCCESS, QUERYOrderRevoke_FAIL],
    promise: (client) => client.get('/mysql/loadOrderRevoke/'+shopsId+'/'+changeDateFormat(date_start)+'/'+changeDateFormat(date_end))
  };
}
//商户销售信息
export function loadSaleTable(shopsId,period) {
  return {
    types: [QUERY3, QUERY3_SUCCESS, QUERY3_FAIL],
    promise: (client) => client.get('/mysql/loadSaleTable/'+shopsId+'/'+period)
  };
}

export function loadSaleTableDetail(shopsId,date) {
  return {
    types: [QUERYDetail, QUERYDetail_SUCCESS, QUERYDetail_FAIL],
    promise: (client) => client.get('/mysql/loadSaleTableDetail/'+shopsId+'/'+date)
  };
}

//退单详情
export function loadOrderRevoke(shopsId,period) {
  return {
    types: [QUERYOrderRevoke, QUERYOrderRevoke_SUCCESS, QUERYOrderRevoke_FAIL],
    promise: (client) => client.get('/mysql/loadOrderRevoke/'+shopsId+'/'+period)
  };
}


export function loadOrderRevokeDetail(shopsId,date) {
  return {
    types: [QUERYOrderRevokeDetail, QUERYOrderRevokeDetail_SUCCESS, QUERYOrderRevokeDetail_FAIL],
    promise: (client) => client.get('/mysql/loadOrderRevokeDetail/'+shopsId+'/'+date)
  };
}



//商户销售信息日期查询
export function loadSaleTable1(shopsId,date_start,date_end) {
  return {
    types: [QUERY3, QUERY3_SUCCESS, QUERY3_FAIL],
    promise: (client) => client.get('/mysql/loadSaleTable/'+shopsId+'/'+changeDateFormat(date_start)+'/'+changeDateFormat(date_end))
  };
}
//商户详情页数据
export function loadShopData(shopsId) {
  return {
    types: [QUERY5, QUERY5_SUCCESS, QUERY5_FAIL],
    promise: (client) => client.get('/mysql/loadShopData/'+shopsId)
  };
}
//商户信息概览
export function loadShopOverview() {
  return {
    types: [QUERY6, QUERY6_SUCCESS, QUERY6_FAIL],
    promise: (client) => client.get('/mysql/loadShopOverview')
  };
}
//商户销量地图数据
export function loadShopMap() {
  return {
    types: [QUERY7, QUERY7_SUCCESS, QUERY7_FAIL],
    promise: (client) => client.get('/mysql/loadShopMap')
  };
}
//显示排名前6个店铺类型及销售额
export function loadShopTop() {
  return {
    types: [QUERY8, QUERY8_SUCCESS, QUERY8_FAIL],
    promise: (client) => client.get('/mysql/loadShopTop')
  };
}
//商铺文字
export function loadShopWords(){
  return {
    types: [QUERY9, QUERY9_SUCCESS, QUERY9_FAIL],
    promise: (client) => client.get('/mysql/loadShopWords')
  };
}
//单个商铺消费者分布图
export function loadSingleShopMap(shopsId){
  return {
    types: [QUERY10, QUERY10_SUCCESS, QUERY10_FAIL],
    promise: (client) => client.get('/mysql/loadSingleShopMap/'+shopsId)
  };
}
export function loadSingleShopUser(shopsId) {
    return {
        types: [SINGLESHOPUSER, SINGLESHOPUSER_SUCCESS, SINGLESHOPUSER_FAIL],
        promise: (client) => client.get('/mysql/loadSingleShopUser/' + shopsId)
    }
}
export function loadShopTelephone(shopsId){
    return {
        types: [QUERY11, QUERY11_SUCCESS, QUERY11_FAIL],
        promise: (client) => client.get('/mysql/loadShopTelephone/'+shopsId)
    };
}
export function loadSaleAnalysis(shopsId){
    return {
        types: [QUERSaleAnalysis, QUERSaleAnalysis_SUCCESS, QUERSaleAnalysis_FAIL],
        promise: (client) => client.get('/mysql/loadSaleAnalysis/'+shopsId)
    };
}

export function buyUserCount(fromDate,toDate,period) {
  return {
    types: [QUERY12, QUERY12_SUCCESS, QUERY12_FAIL],
    promise: (client) => client.post('/mysql/buyUserCount',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

//接口调用记录
export function loadAPIRecord(page,pageLineCount,searchText,dateFrom,dateTo) {
  return {
    types: [QUERYAPIRecord, QUERYAPIRecord_SUCCESS, QUERYAPIRecord_FAIL],
    promise: (client) => client.post('/mysql/loadAPIRecord', {
      data: {
        page: page,
        pageLineCount: pageLineCount,
        searchText: searchText,
        dateFrom: changeDateFormat(dateFrom),
        dateTo: changeDateFormat(dateTo)
      }
    })
  }
}

//系统日志
export function loadSystemLog(page,pageLineCount,searchText,dateFrom,dateTo){
  return {
    types: [QUERYSystemLog, QUERYSystemLog_SUCCESS, QUERYSystemLog_FAIL],
    promise: (client) => client.post('/mysql/loadSystemLog', {
      data: {
        page: page,
        pageLineCount: pageLineCount,
        searchText: searchText,
        dateFrom:  changeDateFormat(dateFrom),
        dateTo:  changeDateFormat(dateTo)
      }
    })
  }
}

//用户管理表
export function QueryUserManageTable(searchText_Platform,searchText_Src,searchText_Dst) {
  return {
    types: [QUERYUserManageTable, QUERYUserManageTable_SUCCESS, QUERYUserManageTable_FAIL],
    promise: (client) => client.post('/mysql/QueryUserManageTable', {
      data: {
        searchText_Platform: searchText_Platform,
        searchText_Src: searchText_Src,
        searchText_Dst: searchText_Dst
      }
    })
  }
}
export function salesOverview(fromDate,toDate,period) {
  return {
    types: [QUERY13, QUERY13_SUCCESS, QUERY13_FAIL],
    promise: (client) => client.post('/mysql/salesOverview',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function DailyOrder(fromDate,toDate,period) {
  return {
    types: [QUERY14, QUERY14_SUCCESS, QUERY14_FAIL],
    promise: (client) => client.post('/mysql/DailyOrder',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function totalIncome(fromDate,toDate,period) {
  return {
    types: [QUERY15, QUERY15_SUCCESS, QUERY15_FAIL],
    promise: (client) => client.post('/mysql/totalIncome',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period
      }
    })
  };
}
export function TotalSalesVolume(fromDate,toDate,period) {
  return {
    types: [QUERY16, QUERY16_SUCCESS, QUERY16_FAIL],
    promise: (client) => client.post('/mysql/TotalSalesVolume',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function Dayprice(fromDate,toDate,period) {
  return {
    types: [QUERY17, QUERY17_SUCCESS, QUERY17_FAIL],
    promise: (client) => client.post('/mysql/Dayprice',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

export function ShopsConsumption(fromDate,toDate,period) {
  return {
    types: [QUERY18, QUERY18_SUCCESS, QUERY18_FAIL],
    promise: (client) => client.post('/mysql/ShopsConsumption',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function ShopsCreditValue(fromDate,toDate,period) {
  return {
    types: [QUERY19, QUERY19_SUCCESS, QUERY19_FAIL],
    promise: (client) => client.post('/mysql/ShopsCreditValue',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function averageConsumerSpending(fromDate,toDate,period) {
  return {
    types: [QUERY20, QUERY20_SUCCESS, QUERY20_FAIL],
    promise: (client) => client.post('/mysql/averageConsumerSpending',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function ShopsOverview(fromDate,toDate,period) {
  return {
    types: [QUERY21, QUERY21_SUCCESS, QUERY21_FAIL],
    promise: (client) => client.post('/mysql/ShopsOverview',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function NumbeOfUsers(fromDate,toDate,period) {
  return {
    types: [QUERY22, QUERY22_SUCCESS, QUERY22_FAIL],
    promise: (client) => client.post('/mysql/NumbeOfUsers',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function OrderNumber(fromDate,toDate,period) {
  return {
    types: [QUERY23, QUERY23_SUCCESS, QUERY23_FAIL],
    promise: (client) => client.post('/mysql/OrderNumber',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

export function UserOverview(fromDate,toDate,period) {
  return {
    types: [QUERY24, QUERY24_SUCCESS, QUERY24_FAIL],
    promise: (client) => client.post('/mysql/UserOverview',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function UserCreditValue(fromDate,toDate,period) {
  return {
    types: [QUERY25, QUERY25_SUCCESS, QUERY25_FAIL],
    promise: (client) => client.post('/mysql/UserCreditValue',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
export function UserConsumption(fromDate,toDate,period) {
  return {
    types: [QUERY26, QUERY26_SUCCESS, QUERY26_FAIL],
    promise: (client) => client.post('/mysql/UserConsumption',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

export function TotalSalesTop10(fromDate,toDate,period) {
  return {
    types: [QUERY27, QUERY27_SUCCESS, QUERY27_FAIL],
    promise: (client) => client.post('/mysql/TotalSalesTop10',{
      data: {
        // fromDate:fromDate,
        // toDate:toDate,
        // period:period,
      }
    })
  };
}
export function SalesYesterdayTop10(fromDate,toDate,period) {
  return {
    types: [QUERY28, QUERY28_SUCCESS, QUERY28_FAIL],
    promise: (client) => client.post('/mysql/SalesYesterdayTop10',{
      data: {
        // fromDate:fromDate,
        // toDate:toDate,
        // period:period
      }
    })
  };
}

export function CommodityOverview(fromDate,toDate,period) {
  return {
    types: [QUERY29, QUERY29_SUCCESS, QUERY29_FAIL],
    promise: (client) => client.post('/mysql/CommodityOverview',{

      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

export function SingleShopSales(fromDate,toDate,period,shopsId) {
  return {
    types: [QUERY30, QUERY30_SUCCESS, QUERY30_FAIL],
    promise: (client) => client.post('/mysql/SingleShopSales',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
        shopsId:shopsId
      }
    })
  };
}
export function SingleShopOrder(fromDate,toDate,period,shopsId) {
  return {
    types: [QUERY31, QUERY31_SUCCESS, QUERY31_FAIL],
    promise: (client) => client.post('/mysql/SingleShopOrder',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
        shopsId:shopsId
      }
    })
  };
}

//商户贷款数据
export function loadShopLoan(shopsId) {
    return {
      types: [QUERYShopLoan, QUERYShopLoan_SUCCESS, QUERYShopLoan_FAIL],
      promise: (client) => client.get('/mysql/loadShopLoan/'+shopsId)
    };
}
//商户贷款风险数据
export function loadShopLoanRisk(shopsId) {
  return {
    types: [QUERYShopLoanRisk, QUERYShopLoanRisk_SUCCESS, QUERYShopLoanRisk_FAIL],
    promise: (client) => client.get('/mysql/loadShopLoanRisk/'+shopsId)
  };
}


//用户路径分析
//漏斗分析
export function loadFunnel( ) {
    return {
      types:[QUERYFUNNEL,QUERYFUNNEL_SUCCESS,QUERYFUNNEL_FAIL],
      promise:(client) =>client.get('mysql/loadFunnel')
    };
}
export function loadGetFunnel(FunnelUserId ) {
  return{
    types:[QUERYGETFUNNEL,QUERYGETFUNNEL_SUCCESS,QUERYGETFUNNEL_FAIL],
    promise:(client) =>client.post('mysql/loadGetFunnel',{
      data:{
        FunnelUserId:FunnelUserId
      }
    })
  }
}
export function loadCreateFunnel(FunnelName,FunnelUserId,FunnelStep ) {
  return{
    types:[QUERYCREATE,QUERYCREATE_SUCCESS,QUERYCREATE_FAIL],
    promise:(client) =>client.post('mysql/loadCreateFunnel',{
      data:{
        // FunnelId:FunnelId,
        FunnelName:FunnelName,
        FunnelUserId:FunnelUserId,
        FunnelStep:FunnelStep
      }
    })
  }
}
export function loadFunnelDelete(FunnelName,FunnelUserId ) {
  return{
    types:[QUERYDELETE,QUERYDELETE_SUCCESS,QUERYDELETE_FAIL],
    promise:(client) =>client.post('mysql/loadFunnelDelete',{
      data:{
        FunnelName:FunnelName,
        FunnelUserId:FunnelUserId
      }
    })
  }
}
export function loadFunnelStep(FunnelName,choose,fromDate,toDate) {
    return{
        types:[LOADFUNNELSTEP,LOADFUNNELSTEP_SUCCESS,LOADFUNNELSTEP_FAIL],
        promise:(client) =>client.post('mysql/loadFunnelStep',{
            data:{
                FunnelName:FunnelName,
                choose:choose,
                fromDate:fromDate,
                toDate:toDate
            }
        })
    }
}
export function loadFunnelStepDe(FunnelName) {
  return{
    types:[LOADFUNNELSTEPDe,LOADFUNNELSTEPDe_SUCCESS,LOADFUNNELSTEPDe_FAIL],
    promise:(client) =>client.post('mysql/loadFunnelStep',{
      data:{
        FunnelName:FunnelName,
        choose:'',
        fromDate:'',
        toDate:''
      }
    })
  }
}
export function loadDictTitle() {
  return {
    types: [DICTTITLE, DICTTITLE_SUCCESS, DICTTITLE_FAIL],
    promise: (client) => client.get('/mysql/loadDictTitle/')
  };
}
export function loadCustomerEvent(startEvent,endEvent,fromDate,toDate) {
  return{
    types:[CUSTOMEREVENT,CUSTOMEREVENT_SUCCESS,CUSTOMEREVENT_FAIL],
    promise:(client) =>client.post('mysql/loadCustomerEvent',{
      data:{
        startEvent:startEvent,
        endEvent:endEvent,
        fromDate:fromDate,
        toDate:toDate
      }
    })
  }
}

//事件选择列表
export function loadEventColumn() {
  return {
    types: [QUERYEventCoulumn, QUERYEventCoulumn_SUCCESS, QUERYEventCoulumn_FAIL],
    promise: (client) => client.get('/mysql/loadEventColumn/')
  };
}

export function loadEventTriggerTimes(events,times,sort,fromDate,toDate,period) {
  return {
    types: [QUERYEventTriggerTimes, QUERYEventTriggerTimes_SUCCESS, QUERYEventTriggerTimes_FAIL],
    promise: (client) => client.post('/mysql/loadEventTriggerTimes/',{
      data:{
        events:events,
        times:times,
        sort:sort,
        fromDate:fromDate,
        toDate:toDate,
        period:period
      }
  })
  };
}

export function loadLoanShops(page,pageLineCount,searchText,creditFrom,creditTo){
  return {
    types: [QUERYLoanShops, QUERYLoanShops_SUCCESS, QUERYLoanShops_FAIL],
    promise: (client) => client.post('/mysql/loadLoanShops',{
      data: {
        page:page,
        pageLineCount:pageLineCount,
        searchText:searchText,
        creditFrom:creditFrom,
        creditTo:creditTo
      }
    })
  }
}

//PV页面访问
export function PVAccess(fromDate,toDate,period) {
  return {
    types: [QUERYPageAccess, QUERYPageAccess_SUCCESS, QUERYPageAccess_FAIL],
    promise: (client) => client.post('/mysql/PVAccess',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

//UV页面访问
export function UVAccess(fromDate,toDate,period) {
  return {
    types: [QUERYUVAccess, QUERYUVAccess_SUCCESS, QUERYUVAccess_FAIL],
    promise: (client) => client.post('/mysql/UVAccess',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

//人均页面访问数
export function AvgPVAccess(fromDate,toDate,period) {
  return {
    types: [QUERYAvgPVAccess, QUERYAvgPVAccess_SUCCESS, QUERYAvgPVAccess_FAIL],
    promise: (client) => client.post('/mysql/AvgPVAccess',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

//下单转化率
export function OrderChange(fromDate,toDate,period) {
  return {
    types: [QUERYOrderChange, QUERYOrderChange_SUCCESS, QUERYOrderChange_FAIL],
    promise: (client) => client.post('/mysql/OrderChange',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}

//客单价
export function AvgPrice(fromDate,toDate,period) {
  return {
    types: [QUERYAvgPrice, QUERYAvgPrice_SUCCESS, QUERYAvgPrice_FAIL],
    promise: (client) => client.post('/mysql/AvgPrice',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}
//流量数据总览
export function TrafficData(fromDate,toDate,period) {
  return {
    types: [QUERYTrafficData, QUERYTrafficData_SUCCESS, QUERYTrafficData_FAIL],
    promise: (client) => client.post('/mysql/TrafficData',{
      data: {
        fromDate:fromDate,
        toDate:toDate,
        period:period,
      }
    })
  };
}