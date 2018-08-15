import React, { Component } from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class TicketForm extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    state = {
        projects: [],
        users: [],
        statuses: [],
        'title': '',
        'description': '',
        'project': '',
        'assignee': '',
        'reporter': '',
        'status': '',
        'tags': '',
        'success': false
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { title, description, 
            project, assignee,
            reporter, status, tags
        } = this.state;
        axios.post('api/tickets', { title, description, project,
        assignee, reporter, status, tags })
         .then((result) => {
            //access the results here....
            if (response.status !== 200) {
                return this.setState({'success': true})
            }
        });
    }      
    componentDidMount() {
        fetch("api/projects")
          .then(response => {
            if (response.status !== 200) {
              return ''
            }
            return response.json();
          })
          .then(data => {
              const project = data[0]['id'] || '';
              this.setState({ projects: data, project})
            });
        fetch("api/users")
          .then(response => {
            if (response.status !== 200) {
              return ''
            }
            return response.json();
          })
          .then(data =>{
                const assignee = data[0]['id'] || '';
                this.setState({ users: data, assignee })
            });
        fetch("api/reporter")
          .then(response => {
            if (response.status !== 200) {
              return ''
            }
            return response.json();
          })
          .then(data =>{
                const reporter = data[0]['id'] || '';
                this.setState({ reporter })
            });            
        fetch("api/status")
          .then(response => {
            if (response.status !== 200) {
              return ''
            }
            return response.json();
          })
          .then(data => {
                const status = data[0]['id'] || '';
                this.setState({ statuses: data, status })
            });                    
    }

    render () {
        return(
            <div style={{marginTop: '25px'}}>
            <form onSubmit={this.onSubmit}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Title</label>
                </div>
                <div className="field-body">
                    <div className="field">
                    <p className="control is-expanded">
                    <input className="input" name="title" type="text" placeholder="Title" onChange={this.onChange}>
                    </input>
                    </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Description</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <div className="control">
                    <input className="textarea" name="description" onChange={this.onChange}></input>
                    </div>
                </div>
                </div>
            </div>                
            
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Project</label>
                </div>
                <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                    <div className="select is-fullwidth">
                        <select name="project" onChange={this.onChange}>
                        {this.state.projects.map(el => (
                              <option value={el["id"]}>{el["title"]}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Assignee</label>
                </div>
                <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                    <div className="select is-fullwidth">
                        <select name="assignee" onChange={this.onChange}>
                        {this.state.users.map(el => (
                            <option value={el["id"]}>{el["username"]}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Reporter</label>
                </div>
                <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                    <div className="select is-fullwidth">
                        <select name="reporter" onChange={this.onChange}>
                        {this.state.users.map(el => (
                            <option value={el["id"]}>{el["username"]}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Status</label>
                </div>
                <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                    <div className="select is-fullwidth">
                        <select name="status" onChange={this.onChange}>
                        {this.state.statuses.map(el => (
                            <option value={el["id"]}>{el["title"]}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">Tags</label>
                </div>
                <div className="field-body">
                    <div className="field">
                    <p className="control is-expanded">
                    <input className="input" name="tags" type="text" placeHolder="comma seperated" onChange={this.onChange}>
                    </input>
                    </p>
                    </div>
                </div>
            </div>                           
            <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                <div className="field">
                    <div className="control">
                    <button className="button is-primary">
                        Create
                    </button>
                    {this.state.success ? <p className="help is-success">Ticket created successfully</p>: null}
                    </div>
                </div>
                </div>
            </div>
        </form>
        </div>
        )
    }
}

export default TicketForm;