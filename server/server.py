from flask import Flask
from flask_restful import Resource, Api


from api.swen_344_db_utils import *
from api.sql_calls import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(GetData,'/coursedata')
api.add_resource(GetDepartments,'/getdepartment')
api.add_resource(GetOneData,'/coursedata/<int:id>')
api.add_resource(AddData,'/coursedata/')
api.add_resource(EditData,'/coursedata/<int:id>')

if __name__ == '__main__':
    print("Loading db");
    exec_sql_file('react4_schema.sql');
    print("Starting flask");
    app.run(debug=True), #starts Flask



    