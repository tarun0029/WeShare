import { AUTH,LOGOUT }  from '../constants/actionTypes'
 

const authReducer = (state = { authData : null },action) => {
    switch(action.type)
    {
        case AUTH : 
        // console.log(action?.data) ;
       //  console.log("auth");
       localStorage.setItem('profile',JSON.stringify({ ...action?.data  }));
         return {...state,authData: action?.data};
       case LOGOUT : 
       localStorage.clear();

       return {...state,authData: null};
         default : 
        console.log("default");
         return state;
    }
}


export default authReducer;