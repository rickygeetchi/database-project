import React, {Component} from "react";
import { variables } from "../Variables";

// const departments=[];

class Department extends Component{

    constructor(props){
        super(props);

        this.state={
            departments:[],
            employees:[],
            modalTitle:"",
            EmployeeId:0,
            EmployeeName:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.jpg",
            PhotoPath:variables.PHOTO_URL
        }
    }
    refreshList(){
        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });

        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    changeEmployeeName =(e)=>{
        this.setState({EmployeeName:e.target.value});
    }

    changeDepartment=(e)=>{
      this.setState({Department:e.target.value});
    }

    changeDateOfJoining =(e)=>{
      this.setState({DateOfJoining:e.target.value});
  }


    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            EmployeeId:0,
            EmployeeName:"",
            Department:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.jpg"
        });
    }

    editClick(emp){
        this.setState({
            modalTitle:"Edit Employee",
            EmployeeId:emp.EmployeeId,
            EmployeeName: emp.EmployeeName,
            Department:emp.Department,
            DateOfJoining:emp.DateOfJoining,
            PhotoFileName:emp.PhotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'employee/',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                
                EmployeeName:this.state.EmployeeName,
                Department:this.state.Department,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName,

            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        })
    }

    updateClick(){
        fetch(variables.API_URL+'employee/',{
            method:'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
              EmployeeId:this.state.EmployeeId,
              EmployeeName:this.state.EmployeeName,
              Department:this.state.Department,
              DateOfJoining: this.state.DateOfJoining,
              PhotoFileName:this.state.PhotoFileName,
            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?'))
        fetch(variables.API_URL+'employee/'+id,{
            method:'Delete',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        })
    }

    imageUpload=(e)=>{
      e.preventDefault();

      const formData=new FormData();
      formData.append("file",e.target.files[0],e.target.files[0].name);

      fetch(variables.API_URL+'employee/savefile',{
          method:'POST',
          body:formData
      })
      .then(res=>res.json())
      .then(data=>{
          this.setState({PhotoFileName:data});
      })
  }

    render(){
        const {
            departments,
            modalTitle,
            Department,
            employees,
            EmployeeId,
            EmployeeName,
            PhotoFileName,
            PhotoPath,
            DateOfJoining

        }=this.state;

        return(
            <div>
                <h3 className="display-3 d-flex justify-content-center m-3">Employees</h3> 
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.addClick()}>Add Employee</button>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Employee Id
                            </th>
                            <th>
                                Employee Name
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                                DOJ
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
                                   <button type="button"
                                   className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(emp)}>
                                    <i className="bi bi-pencil-square"></i>
                                   </button>

                                   <button type="button"
                                   className="btn btn-light mr-1" onClick={()=>this.deleteClick(emp.EmployeeId)}>
                                    <i className="bi bi-trash3"></i>
                                   </button>
                                </td>

                            </tr>)}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 w-50 bd-highlight">

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Name</span>
                                    <input type="text" className="form-control"
                                    value={EmployeeName}
                                    onChange={this.changeEmployeeName}/>
                                       </div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text">Department</span>
                                    <select className="form-select"
                                    onChange={this.changeDepartment}
                                    value={Department}>
                                      {departments.map(dep=><option key={dep.DepartmentId}>
                                        {dep.DepartmentName}
                                      </option>)}
                                    </select>
                                    </div>

                                    <div className="input-group mb-3">
                                    <span className="input-group-text">DOJ</span>
                                    <input type="date" className="form-control"
                                    value={DateOfJoining}
                                    onChange={this.changeDateOfJoining}/>
                                       </div>
                               
                                </div>
                                <div className="p-2 w-50 bd-highlight">
                                  <img width="250px" height="250px" alt="profile"
                                  src={PhotoPath+PhotoFileName}/>
                                  <input className="m-2" type="file" onChange={this.imageUpload}/>
                                </div>
                                  

                                </div>

                                {EmployeeId===0?
                                    <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>
                                    :null }

                                    {EmployeeId!==0?
                                    <button type="button" className="btn btn-primary float-start" onClick={()=>this.updateClick()}>Update</button>
                                    :null }
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Department