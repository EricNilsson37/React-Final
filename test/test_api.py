import unittest
import json
from rest_utils import *


class TestaddCourse(unittest.TestCase):
    def test_add(self):

        post_rest_call(self, 'http://localhost:5000/coursedata/', {'c_name': "hello", 'c_desc': "d", 'details': "d", 'd_name': "Software Engineering"})
