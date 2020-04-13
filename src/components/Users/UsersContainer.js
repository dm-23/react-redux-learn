import React from "react";
import {connect} from "react-redux";
import Users from "./Users"
import {
    setCurrentPage,
    setUsers,
    setTotalCount,
    toggleFetching, setUserFetch, followSuccess, unfollowSuccess
} from "../../BLL/reducers/usersReducer";
import Loader from "../../common/loader/loader";
import baseApiController from "../../API/api";
import {compose} from "redux";
import withAuthRedirect from "../../Hoc/withAuthRedirect";

class UsersContainer extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount() {
        this.props.toggleFetching(true);
        baseApiController.users.getUsers(this.props.currentPage,this.props.usersOnPage).then(data=>{
            this.props.setUsers(data.items);
            this.props.setTotalCount(data.totalCount);
            this.props.toggleFetching(false)
        });
    }

    onPageChange=(pageNumber)=>{
        this.props.toggleFetching(true)
        this.props.setCurrentPage(pageNumber);
        baseApiController.users.getUsers(pageNumber,this.props.usersOnPage).then(data=>{
            this.props.setUsers(data.items);
            this.props.toggleFetching(false)
        });

    }

    render(){

        return <>
            {
                this.props.isFetching ? <Loader/>:
                    <Users
                    totalCount={this.props.totalCount}
                    usersOnPage={this.props.usersOnPage}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChange={this.onPageChange}
                    setCurrentPage={this.setCurrentPage}
                    fetchUsers={this.props.fetchUsers}
                    unfollowSuccess={this.props.unfollowSuccess}
                    followSuccess={this.props.followSuccess}
                    />
            }

            </>


    }

}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage:state.usersPage.currentPage,
        totalCount: state.usersPage.totalCount,
        usersOnPage:state.usersPage.usersOnPage,
        isFetching:state.usersPage.isFetching,
        fetchUsers:state.usersPage.fetchUsers,
    }
}



export default compose(
    connect(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setUsers,
        setCurrentPage,
        setTotalCount,
        toggleFetching,
        setUserFetch
    }),
    withAuthRedirect
    )(UsersContainer)