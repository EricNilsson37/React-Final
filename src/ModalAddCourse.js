import React from "react";
import './index.css';
import {
    Modal, Button, ModalFooter, ModalBody, ModalHeader, Input,  
} from 'reactstrap';

class AddCourse extends React.Component{

    constructor(props){
        super(props);
        this.state = {Showing: false, Name:"", Desc:"", Details:"", Dep:"Software Engineering", depdata: []}
        
    }

    toggle= ()=>{
        this.setState({Showing: !this.state.Showing});
    }

    updateName = (e) =>
    { this.setState({Name: e.target.value}) }//Update the text data in state

    updateDesc = (e) =>
    { this.setState({Desc: e.target.value}) }//Update the text data in state

    updateDetails = (e) =>
    { this.setState({Details: e.target.value}) }//Update the text data in state

    updateDep = (e) =>
    { this.setState({Dep: e.target.value}) }//Update the text data in state


    handleSubmit = ()=> {

        this.UpdateSelected();
        //Use the updated state variables to capture the user input
        this.setState({Showing: !this.state.Showing});
        } 

    UpdateSelected = () => {
        //This will allow redirect to REST api in Flask w/o CORS errors
           
            fetch('/coursedata/', {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({c_name: this.state.Name, c_desc: this.state.Desc, details: this.state.Details, d_name: this.state.Dep})
                
            })
        .then(
            response => response.json()
            )//The promise response is returned, then we extract the json data
        .then ( ()=> //jsonOutput now has result of the data extraction
                    {
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
                )
        }

        updateData = (apiResponse) => {
            this.setState({data: apiResponse})
        }

        updateDataDepartment = (apiResponse) => {
            this.setState({depdata: apiResponse})
        }
    
        fetchData = () => {
            //This will allow redirect to REST api in Flask w/o CORS errors
             fetch('/getdepartment')
             .then(
                 response => response.json() 
                 )//The promise response is returned, then we extract the json data
             .then (jsonOutput => //jsonOutput now has result of the data extraction
                      {
                          this.updateDataDepartment(jsonOutput)
                        }
                  )
          }
    
        componentDidMount(){
            this.fetchData();
        }

    render(){
        return(
            <div>
            <Button style ={{backgroundColor: "blue", margin : 10}} onClick={this.toggle}>Add</Button>

            <Modal isOpen={this.state.Showing} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Add Course</ModalHeader>
            <ModalBody>

            <p>Course Name</p>
            <Input id="Name" type='text' onChange={this.updateName}></Input>

            <p>Course Description</p>
            <Input id="Desc" type='text' onChange={this.updateDesc}></Input>

            <p>Course Details</p>
            <Input id="Details" type='text' onChange={this.updateDetails}></Input>

            <p>Department</p>

            <Input id="Dep" type='select' onChange={this.updateDep}>
            {this.state.depdata.map(department =>{
                return(
            <option>
                {department.name}
            </option>
            );
            })}

            </Input>
            

            </ModalBody>
             <ModalFooter>
             <Button color="primary" onClick={this.handleSubmit}>Ok</Button>{' '}
             <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}

            </ModalFooter>
            </Modal>
            </div>
        );
    }

}

export default AddCourse;