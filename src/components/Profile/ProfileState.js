import React from "react";

class ProfileState extends React.Component{
    state={
        editMode:false,
    }
    setEditMode(){
        this.setState({
            editMode:true
        })
    }
    unsetEditMode(e){
        let newStatus=e.target.value;
        this.props.updateProfileStatus(newStatus);
        this.setState({
            editMode:false
        })
    }
    render(){
        return <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.setEditMode.bind(this)}>{this.props.status || 'Нет статуса'}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.unsetEditMode.bind(this)} value={this.props.status} />
                </div>
            }

        </div>
    }
}

export default ProfileState