import { FETCH_ALL,FETCH_POST, FETCH_BY_SEARCH, CREATE,DELETE,UPDATE,START_LOADING,END_LOADING,COMMENT }  from '../constants/actionTypes'
export default  (state={ isLoading: true,posts: []},action) => {
    switch(action.type){
        case START_LOADING : 
        return {...state,isLoading: true};
        case END_LOADING : 
        return {...state,isLoading: false};
        return 
        case FETCH_ALL:
        return{ 
            ...state,
         posts: action.payload.data,
           currentPage: action.payload.currentPage,
           numberOfPages: action.payload.numberOfPages,

        }; 
        case FETCH_BY_SEARCH : 
           return {...state ,posts: action.payload};
        case FETCH_POST : 
           return {...state ,post: action.payload};
           case UPDATE:
               // case LIKE: like and update are same
               return {...state,posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post )}; //action.payload is updated post
            case COMMENT : 
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id===action.payload._id) return action.payload;
                    return post;
                    // return all the other posts normally ...
                    // change the post that just received a comment..
                })
            }
               case CREATE:
                   return {...state,posts: [ ...state.posts,action.payload]};
                   case DELETE:
                       return {...state,posts: state.posts.filter((post) => post._id !==action.payload)}; // we are going to return all post except the deleted one
        default:
            return state; 
    }
} 