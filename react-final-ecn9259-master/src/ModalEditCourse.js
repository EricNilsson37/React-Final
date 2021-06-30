import React from "react";
import './index.css';
import {
    Modal, Button, ModalFooter, ModalBody, ModalHeader, Input
} from 'reactstrap';

class EditCourse extends React.Component{

    constructor(props){
        super(props);
        this.state = {Showing: false, depdata: []}
        
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


    UpdateSelected = (id) => {
        //This will allow redirect to REST api in Flask w/o CORS errors

            let Course_id_url = '/coursedata/' + id;

            console.log(this.state.Name)
            console.log(this.state.Desc)
            console.log(this.state.Details)
            console.log(this.state.Dep)
            fetch(Course_id_url, {
                method:"PUT",
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

        editButtonClicked=()=>{
            this.toggle()
            this.props.updateId(this.props.course_id)

        }

    render(){
        return(
            <div>
            <Button style ={{backgroundColor: "secondary"}} onClick={this.editButtonClicked}>Edit</Button>

            <Modal isOpen={this.state.Showing} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Edit Course</ModalHeader>
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
             <Button color="primary" onClick={this.UpdateSelected(this.props.course_id) }>Ok</Button>
             <Button color="secondary" onClick={this.toggle}>Cancel</Button>

            </ModalFooter>
            </Modal>
            </div>
        );
    }

}

export default EditCourse;