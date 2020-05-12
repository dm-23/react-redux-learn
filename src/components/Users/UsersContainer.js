import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Users from "./Users"
import {
    setUsers,
    setTotalCount,
     followSuccess, unfollowSuccess
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

const UsersContainer=({totalCount,usersOnPage,setUsers,currentPage,setTotalCount,unfollowSuccess,fetchUsers,followSuccess,users})=>{
    const [isFetching,setIsFetching]=useState(true);
    const [pageNumber,setPageNumber]=useState(1);
    const pagesCount=Math.ceil(totalCount/usersOnPage);
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
        baseApiController.users.getUsers(pageNumber,usersOnPage).then(data=>{
            setUsers(data.items);
            setIsFetching(false)
        });

    }

    useEffect(()=>{
            baseApiController.users.getUsers(currentPage,usersOnPage).then(data=>{
                setUsers(data.items);
                setTotalCount(data.totalCount);
                setIsFetching(false)
            });
    },[])
    return <>
        {
            isFetching ? <Loader/>:
                <Users

                    pages={pages}
                    currentPage={pageNumber}
                    users={users}
                    onPageChange={onPageChange}
                    fetchUsers={fetchUsers}
                    unfollowSuccess={unfollowSuccess}
                    followSuccess={followSuccess}
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