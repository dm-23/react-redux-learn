export const ArrayObjectsRewrite= (objectArray,searchPropName,searchPropValue, newObject )=>{
    return objectArray.map(u=>{
        if(u[searchPropName]===searchPropValue){
            return {...u,...newObject};
        }
        return u;
    });
};