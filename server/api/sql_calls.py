from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import exec_get_all, exec_get_one, connect, exec_commit

class GetData(Resource):

    def get(self):

        courses = exec_get_all("""SELECT * FROM courses""")

        new_base = []

        for ids in courses:
            dept_name = exec_get_one("""SELECT department.name, department.college_id FROM department
            INNER JOIN courses ON department.id = %s""", [ids[1]])

            college_name = exec_get_one("""SELECT college.name FROM college
            INNER JOIN department ON college.id = %s""", [dept_name[1]])
            
            new_base.append({"id" : ids[0], "name" : ids[2], "c_desc" : ids[3], "details" : ids[4], 
            "dept_name" : dept_name[0], "college_name" : college_name[0] })


        return new_base

class GetDepartments(Resource):
    def get(self):

        department = exec_get_all("""SELECT name FROM department""")
        new_base = []

        for ids in department:
            new_base.append({"name" : ids[0]})

        return new_base


class GetOneData(Resource):

    def get(self, id):

        courses = exec_get_all("""SELECT * FROM courses""")

        new_base = []

        for ids in courses:
            dept_name = exec_get_one("""SELECT department.name, department.college_id FROM department
            INNER JOIN courses ON department.id = %s""", [ids[1]])

            college_name = exec_get_one("""SELECT college.name FROM college
            INNER JOIN department ON college.id = %s""", [dept_name[1]])
            
            new_base.append({"id" : ids[0], "name" : ids[2], "c_desc" : ids[3], "details" : ids[4], 
            "dept_name" : dept_name[0], "college_name" : college_name[0] })


        return new_base[id - 1]
        

parser = reqparse.RequestParser()
parser.add_argument('c_name', type = str )
parser.add_argument('c_desc', type = str )
parser.add_argument('details', type = str )
parser.add_argument('d_name', type = str )


class AddData(Resource):

    def post(self):

        args = parser.parse_args()

        c_name = args['c_name']
        c_desc = args['c_desc']
        details = args['details']
        d_name = args['d_name']

        dept_id = exec_get_one("""SELECT id FROM department WHERE name = %s""", [d_name])

        course = exec_commit("""INSERT INTO courses (dept_id, name, c_desc, details, selected)
                    Values (%s,%s,%s,%s,%s) """, [dept_id, c_name, c_desc, details, False])

        return course


class EditData(Resource):

    def put(self, id):

        args = parser.parse_args()

        c_name = args['c_name']
        c_desc = args['c_desc']
        details = args['details']
        d_name = args['d_name']

        dept_id = exec_get_one("""SELECT id FROM department WHERE name = %s""", [d_name])


        course = exec_commit("""UPDATE courses SET dept_id = %s, name = %s, c_desc = %s, details = %s, selected = %s
                    WHERE id = %s""", [dept_id, c_name, c_desc, details, False, str(id)])
       
        return course

        

