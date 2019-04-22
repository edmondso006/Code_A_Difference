export const signIn = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase(); //Intialize firebase

    firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR',  err});
      });
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS'})
      })
      .catch((err) => {
        dispatch({ type: 'SIGNOUT_ERROR'}, err);
      });
  }
}

export const signUp = (newUser) => {
  //Need both firebase and firestore because we are storing additional information about user in firestore. UID = primary key
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    if(newUser.password === newUser.passwordConfirm){
      firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return firestore.collection('users').doc(res.user.uid).set({
          organizationName: newUser.organizationName,
          initials: newUser.organizationName[0]
        })
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' })
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err})
      })
    } else {
      console.log('passowrd does not match')
      let err = {message: 'Passwords do not match!'};
      dispatch({ type: 'SIGNUP_ERROR', err})
    }

    
  }
}

export const updateProfile = (profileUID, newInformation) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(profileUID);
    firestore.collection('users').doc(`${profileUID}`).update(newInformation)
      .then(() => {
        dispatch({ type: 'UPDATE_SUCCESS'})
      })
      .catch(() => {
        let err = { message: 'Error updating profile. Please try again in a few moments' }
        dispatch({ type: 'UPDATE_ERROR', err})
      });

  }
}
