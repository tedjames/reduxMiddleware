// Currently logs every action
export default function({ dispatch }) {
  return next => action => {
    // if the action doesn't have a payload or if the payload doesn't have a callback...
    if (!action.payload || !action.payload.then) {
      // pass the action along the middleware chain
      return next(action);
    }

    action.payload
      .then(function(response) {
        // create a new action with the old type
        // replace the promise with the response data
        const newAction = { ...action, payload: response }
        // take this action and run it through all the middleware from the top of the chain
        dispatch(newAction);
      });
  }
}

// Middleware can be used to clean data before arriving at an action
