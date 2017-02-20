import MySQLdb
import pandas as pd
import datetime
import uuid

from spyne import Application, rpc, ServiceBase, \
    Integer, Unicode, Double, ComplexModel
from spyne.model.complex import Array

#SQLSERVER = '114.67.55.133'
SQLSERVER = '10.47.3.98'
USER = 'root'
PASSWORD = 'wfn031641'
#PASSWORD = '031641'
DATABASE = 'mammoth'

class ShopCoefficient(ComplexModel):
    id = Unicode
    shopid = Unicode
    estimate = Double

class UserCoefficient(ComplexModel):
    id = Unicode
    customer_id = Unicode
    estimate = Double

class BlackUsrInfo(ComplexModel):
    customer_id = Unicode
    num = Integer
    event_num = Double
    add_time = Unicode

v = [
    ShopCoefficient(id='1', shopid='2',estimate =0.9),
    ShopCoefficient(id='11', shopid='22',estimate =0.5),
]

def log_api(api_func,content,ip,conn):
    id = uuid.uuid4()
    str_sql = "INSERT INTO log_api VALUES (\'" + str(id) + "\'," + "sysdate(),\'" + str(api_func) + "\',\'" + str(content) + "\',\'" + str(ip) + "\')"
    #conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
    cursor = conn.cursor()
    try:
        print str_sql
        cursor.execute(str_sql)
        conn.commit()
    except:
        # Rollback in case there is any error
        print 'INSERT log_api failed'
        conn.rollback()

class MammothService(ServiceBase):
    @rpc(Unicode, _returns=Unicode)
    def say_hello(ctx, name):
        return 'Hello, '+ name

#ShopSevice
    @rpc( _returns=int)
    def getShopCoefficientCount(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('getShopCoefficientCount','','',conn)
        df = pd.read_sql('SELECT COUNT(*) FROM commercial_estimate as a , (SELECT MAX(DATE) as max_date, shopid FROM commercial_estimate group by shopid) as b WHERE a.date = b.max_date and a.shopid = b.shopid;', con=conn)
        ret = df.loc[0,'COUNT(*)']
        conn.close()
        return ret

    @rpc( _returns=Array(ShopCoefficient))
    def allShopCoefficient(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('allShopCoefficient','','',conn)
        df = pd.read_sql('SELECT a.id, a.shopid, if (a.estimate = -1, 1.0, a.estimate * 1.2) as estimate FROM commercial_estimate as a , (SELECT MAX(DATE) as max_date, shopid FROM commercial_estimate group by shopid) as b WHERE a.date = b.max_date and a.shopid = b.shopid;', con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(ShopCoefficient(id=row['id'], shopid=row['shopid'], estimate=row['estimate']))
        conn.close()
        return array

    @rpc(Integer, Integer, _returns=Array(ShopCoefficient))
    def getShopCoefficientPage(ctx, pageNo, pageSize):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('getShopCoefficientPage',str(pageNo) + ',' + str(pageSize),'',conn)
        sqlstr = 'SELECT a.id, a.shopid, if (a.estimate = -1, 1.0, a.estimate * 1.2) as estimate FROM commercial_estimate as a , (SELECT MAX(DATE) as max_date, shopid FROM commercial_estimate group by shopid) as b WHERE a.date = b.max_date and a.shopid = b.shopid LIMIT '+str(pageNo)+','+str(pageSize)+';'
        df = pd.read_sql(sqlstr, con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(ShopCoefficient(id=row['id'], shopid=row['shopid'], estimate=row['estimate']))
        conn.close()
        return array

    @rpc(Unicode, _returns=Array(ShopCoefficient))
    def getShopCoefficientPageByID(ctx, id):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('getShopCoefficientPageByID',str(id),'',conn)
        sqlstr = 'SELECT a.id,a.shopid,if (a.estimate = -1, 1.0, a.estimate * 1.2) as estimate FROM commercial_estimate as a, (SELECT MAX(DATE) as max_date, shopid FROM commercial_estimate group by shopid) as b WHERE a.date = b.max_date and a.shopid = b.shopid and a.shopid = \''+id+'\';'
        df = pd.read_sql(sqlstr, con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(ShopCoefficient(id=row['id'], shopid=row['shopid'], estimate=row['estimate']))
        conn.close()
        return array

#UserService
    @rpc( _returns=int)
    def getUserCoefficientCount(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('getUserCoefficientCount','','',conn)
        df = pd.read_sql('SELECT COUNT(id) FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate);', con=conn)
        ret = df.loc[0,'COUNT(id)']
        conn.close()
        return ret

    @rpc( _returns=Array(UserCoefficient))
    def allUserCoefficient(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('allUserCoefficient','','',conn)
        df = pd.read_sql('SELECT id,customer_id,1.8 * estimate as the_estimate FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate);', con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(UserCoefficient(id=row['id'], customer_id=row['customer_id'], estimate=row['the_estimate']))
        conn.close()
        return array

    @rpc(Integer, Integer, _returns=Array(UserCoefficient))
    def getUserCoefficientPage(ctx, pageNo, pageSize):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('getUserCoefficientPage',str(pageNo) + ',' + str(pageSize),'',conn)
        sqlstr = 'SELECT id,customer_id,1.8 * estimate as the_estimate FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate) LIMIT '+str(pageNo)+','+str(pageSize)+';'
        df = pd.read_sql(sqlstr, con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(UserCoefficient(id=row['id'], customer_id=row['customer_id'], estimate=row['the_estimate']))
        conn.close()
        return array

    @rpc(Unicode, _returns=Array(UserCoefficient))
    def getUserCoefficientPageByID(ctx, id):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('getUserCoefficientPageByID',str(id),'',conn)
        sqlstr = 'SELECT id,customer_id,1.8 * estimate as the_estimate FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate) and customer_id = \''+id+'\';'
        df = pd.read_sql(sqlstr, con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(UserCoefficient(id=row['id'], customer_id=row['customer_id'], estimate=row['the_estimate']))
        conn.close()
        return array

    @rpc( _returns=Array(BlackUsrInfo))
    def allBlackUsrInfo(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        log_api('allBlackUsrInfo','','',conn)
        df = pd.read_sql('select * from (select customer_id, count(*) as num, avg(event_times) as event_num, max(add_time) as add_time from customer_black_list group by customer_id) as fuck order by num desc;', con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(BlackUsrInfo(customer_id=row['customer_id'], num=row['num'], event_num=row['event_num'], add_time=str(row['add_time'])))
        conn.close()
        return array
