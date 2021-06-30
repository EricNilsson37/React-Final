import React from "react";
import './index.css';
import EditCourse from './ModalEditCourse';
import AddCourse from './ModalAddCourse';
import {
     Table
} from 'reactstrap';

class TableHolder extends React.Component{

    constructor(props){
        super(props);
        this.state={data: [], id : 1}
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
    }

    fetchData = () => {
        //This will allow redirect to REST api in Flask w/o CORS errors
         fetch('/coursedata')
         .then(
             response => response.json() 
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {
                      this.updateData(jsonOutput)
                    }
              )
      }

    componentDidMount(){
        this.fetchData();
    }

    updateId=(id)=>{
        this.setState({id:id})
    }




    render(){
        return(
            <div>
            <Table striped bordered hover>
            <thead>
            <tr>
            <th>  </th>
            <th>name</th>
            <th>description</th>
            <th>details</th>
            <th>department</th>
            <th>college</th>
             </tr>
            </thead>
            <tbody>
            {this.state.data.map(course =>{
                return(
            <tr>
            <td><EditCourse updateId = {this.updateId} course_id = {this.state.id} /></td>
            <td>{course.name}</td>
            <td>{course.c_desc}</td>
            <td>{course.details}</td>
            <td>{course.dept_name}</td>
            <td>{course.college_name}</td>
            </tr>
                );
            })}
            </tbody>
            </Table>

            <AddCourse data = {this.state.data}/>
            
            </div>
        );
    }

}

export default TableHolder;