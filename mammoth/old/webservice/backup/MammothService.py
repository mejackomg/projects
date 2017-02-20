import MySQLdb
import pandas as pd

from spyne import Application, rpc, ServiceBase, \
    Integer, Unicode, Double, ComplexModel
from spyne.model.complex import Array

#SQLSERVER = '114.67.55.133'
SQLSERVER = '60.205.153.53'
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

v = [
    ShopCoefficient(id='1', shopid='2',estimate =0.9),
    ShopCoefficient(id='11', shopid='22',estimate =0.5),
]

class MammothService(ServiceBase):
    @rpc(Unicode, _returns=Unicode)
    def say_hello(ctx, name):
        return 'Hello, '+ name

#ShopSevice
    @rpc( _returns=int)
    def getShopCoefficientCount(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        df = pd.read_sql('SELECT COUNT(id) FROM commercial_estimate WHERE DATE=(SELECT MAX(DATE) FROM commercial_estimate);', con=conn)
        ret = df.loc[0,'COUNT(id)']
        conn.close()
        return ret

    @rpc( _returns=Array(ShopCoefficient))
    def allShopCoefficient(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        df = pd.read_sql('SELECT id, shopid,estimate FROM commercial_estimate WHERE DATE=(SELECT MAX(DATE) FROM commercial_estimate) GROUP BY shopid;', con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(ShopCoefficient(id=row['id'], shopid=row['shopid'], estimate=row['estimate']))
        conn.close()
        return array

    @rpc(Integer, Integer, _returns=Array(ShopCoefficient))
    def getShopCoefficientPage(ctx, pageNo, pageSize):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        sqlstr = 'SELECT id,shopid,estimate FROM commercial_estimate WHERE DATE=(SELECT MAX(DATE) FROM commercial_estimate) LIMIT '+str(pageNo)+','+str(pageSize)+';'
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
        sqlstr = 'SELECT id,shopid,estimate FROM commercial_estimate WHERE DATE=(SELECT MAX(DATE) FROM commercial_estimate) and shopid = \''+id+'\';'
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
        df = pd.read_sql('SELECT COUNT(id) FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate);', con=conn)
        ret = df.loc[0,'COUNT(id)']
        conn.close()
        return ret

    @rpc( _returns=Array(UserCoefficient))
    def allUserCoefficient(ctx):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        df = pd.read_sql('SELECT id,customer_id,estimate FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate);', con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(UserCoefficient(id=row['id'], customer_id=row['customer_id'], estimate=row['estimate']))
        conn.close()
        return array

    @rpc(Integer, Integer, _returns=Array(UserCoefficient))
    def getUserCoefficientPage(ctx, pageNo, pageSize):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        sqlstr = 'SELECT id,customer_id,estimate FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate) LIMIT '+str(pageNo)+','+str(pageSize)+';'
        df = pd.read_sql(sqlstr, con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(UserCoefficient(id=row['id'], customer_id=row['customer_id'], estimate=row['estimate']))
        conn.close()
        return array

    @rpc(Unicode, _returns=Array(UserCoefficient))
    def getUserCoefficientPageByID(ctx, id):
        conn = MySQLdb.connect(host=SQLSERVER,user=USER,passwd=PASSWORD,db=DATABASE,port=3306)
        sqlstr = 'SELECT id,customer_id,estimate FROM customer_estimate WHERE DATE=(SELECT MAX(DATE) FROM customer_estimate) and customer_id = \''+id+'\';'
        df = pd.read_sql(sqlstr, con=conn)
        df = df.fillna(0)
        array=[]
        for index, row in df.iterrows():
            array.append(UserCoefficient(id=row['id'], customer_id=row['customer_id'], estimate=row['estimate']))
        conn.close()
        return array