import React, {useEffect, useState} from "react";
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
import {
    getCurrentPage,
    getFetchUsers, getIsFetching,
    getTotalCount,
    getUsers,
    getUsersOnPage
} from "../../BLL/Selectors/userSelectors";

const UsersContainer=props=>{
    const [isFetching,setIsFetching]=useState(true);
    const [pageNumber,setPageNumber]=useState(1);
    const pagesCount=Math.ceil(props.totalCount/props.usersOnPage);
    const startPage=pageNumber-2>1?pageNumber-2:1;
    const forCount=pagesCount>10?pagesCount-pageNumber<10?pagesCount-pageNumber:10:pagesCount;
    let pages=[];
    for(let i=startPage;i<=startPage+forCount;i++){
        pages.push(i);
    }
    if(forCount<pagesCount){
        pages=[...pages,"...",pagesCount]
    }
    if(pages[0]>1){
        pages=[1,"...",...pages]
    }

    const onPageChange=(pageNumber)=>{
        setPageNumber(pageNumber);
        setIsFetching(true);
        baseApiController.users.getUsers(pageNumber,props.usersOnPage).then(data=>{
            props.setUsers(data.items);
            setIsFetching(false)
        });

    }

    useEffect(()=>{
            baseApiController.users.getUsers(props.currentPage,props.usersOnPage).then(data=>{
                props.setUsers(data.items);
                props.setTotalCount(data.totalCount);
                setIsFetching(false)
            });
    },[])
    return <>
        {
            isFetching ? <Loader/>:
                <Users

                    pages={pages}
                    currentPage={pageNumber}
                    users={props.users}
                    onPageChange={onPageChange}
                    fetchUsers={props.fetchUsers}
                    unfollowSuccess={props.unfollowSuccess}
                    followSuccess={props.followSuccess}
                />
        }

    </>
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage:getCurrentPage(state),
        totalCount: getTotalCount(state),
        usersOnPage:getUsersOnPage(state),
        isFetching:getIsFetching(state),
        fetchUsers:getFetchUsers(state),
    }
}



export default compose(
    connect(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setUsers,
        setTotalCount
    })

    )(UsersContainer)