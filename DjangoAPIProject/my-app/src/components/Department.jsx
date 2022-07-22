import React, {Component} from "react";
import { variables } from "../Variables";

export default class Department extends React.Component{

    constructor(props){
        super(props);

        this.state={
            departments:[]
        }
    }

    render(){
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
                                </td>

                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}