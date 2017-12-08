export default function({dispatch}){
    return next => action =>{
        //if action does not contain a pyaload or promise
        //move on down to the next middleware
        if(!action.payload || !action.payload.then){
           return next(action);
        }
        //if the action has a promise wait for the promise to return response
        //then add the response to the action and go through the middleware cycle again
        action.payload.then(response=>{
            const newAction = {...action,payload:response};
            dispatch(newAction);
        });
    };
}