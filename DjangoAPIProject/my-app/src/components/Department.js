import React, {Component} from "react";
import { variables } from "../Variables";

// const departments=[];

class Department extends Component{

    constructor(props){
        super(props);

        this.state={
            departments:[],
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0,

            DepartmentIdFilter:"",
            DepartmentNameFilter:"",
            departmentsWithoutFilter:[]

        }
    }

    FilterFn(){
        var DepartmentIdFilter=this.state.DepartmentIdFilter;
        var DepartmentNameFilter=this.state.DepartmentNameFilter;

        var filteredData=this.state.departmentsWithoutFilter.filter(
            function(el){
                return el.DepartmentId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                )&& 
                el.DepartmentId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                )
            }
        );
    }

    changeDepartmentNameIdFilter = (e)=>{
        this.state.DepartmentIdFilter=e.target.value;
        this.FilterFn();
    }

    changeDepartmentNameFilter = (e)=>{
        this.state.DepartmentNameFilter=e.target.value;
        this.FilterFn();
    }



    refreshList(){
        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    changeDepartmentName =(e)=>{
        this.setState({DepartmentName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Department",
            DepartmentId:0,
            DepartmentName:""
        });
    }

    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            DepartmentId:dep.DepartmentId,
            DepartmentName:dep.DepartmentName
        });
    }

    createClick(){
        fetch(variables.API_URL+'department/',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        })
    }

    updateClick(){
        fetch(variables.API_URL+'department/',{
            method:'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                DepartmentId:this.state.DepartmentId,
                DepartmentName:this.state.DepartmentName
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
        fetch(variables.API_URL+'department/'+id,{
            method:'Delete',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                DepartmentId:this.state.DepartmentId,
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        })
    }

    render(){
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName
        }=this.state;

        return(
            <div>
                <h3 className="display-3 d-flex justify-content-center m-3">Departments</h3> 
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.addClick()}>Add Department</button>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                               
                                Department Id
                                <input className="form-control m-2"
                                onChange={this.changeDepartmentIdFilter}
                                placeholder="Filter"
                                />
                            </th>
                            <th>
                            
                                DepartmentName
                                <input className="form-control m-2"
                                onChange={this.changeDepartmentNameFilter}
                                placeholder="Filter"
                                />
                            </th>
                            <th> 
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                   <button type="button"
                                   className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(dep)}>
                                    <i className="bi bi-pencil-square"></i>
                                   </button>

                                   <button type="button"
                                   className="btn btn-light mr-1" onClick={()=>this.deleteClick(dep.DepartmentId)}>
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Department Name</span>
                                    <input type="text" className="form-control"
                                    value={DepartmentName}
                                    onChange={this.changeDepartmentName}/>
                                </div>

                                    {DepartmentId===0?
                                    <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>
                                    :null }

                                    {DepartmentId!==0?
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