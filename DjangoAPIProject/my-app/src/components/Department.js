import React, {Component} from "react";
import { variables } from "../Variables";

// const departments=[];

export class Department extends Component{

    constructor(props){
        super(props);

        this.state={
            departments:[]
        }
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
    render(){
        const{
            departments
        }=this.state;

        return(
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                DepartmentId
                            </th>
                            <th>
                                DepartmentName
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
                                   className="btn btn-light mr-1">
                                    <i class="bi bi-pencil-square"></i>
                                   </button>

                                   <button type="button"
                                   className="btn btn-light mr-1">
                                    <i class="bi bi-trash3"></i>
                                   </button>
                                </td>

                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}