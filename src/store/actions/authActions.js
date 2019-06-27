export const signIn = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

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
    console.log(newUser);
    if(newUser.password === newUser.passwordConfirm){
      firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return firestore.collection('users').doc(res.user.uid).set({
          organizationName: newUser.organizationName,
          about: newUser.about,
          signUpDate: Date.now(),
          profilePictureUrl: newUser.profilePictureUrl
        })
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' })
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SIGNUP_ERROR', err})
      })
    } else {
      let err = {message: 'Passwords do not match!'};
      dispatch({ type: 'SIGNUP_ERROR', err})
    }
  }
}

export const updateProfile = (profileUID, newInformation) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authID = getState().firebase.auth.uid;

    console.log(profileUID);
    console.log(newInformation);
    firestore.collection('users').doc(`${profileUID}`).update(newInformation)
      .then(() => {
        //Perform query to get all of the users projects to update them
        // OH BOY OH BOY THIS PROBS NEEDS REFACTORED 
        return firestore.collection('projects').where('authorid',  '==', authID).get()
          .then((res) => {
            res.forEach(doc => {
              let project = doc.data;
              project.id = doc.id;
              return firestore.collection('projects').doc(`${project.id}`).update(newInformation)
                .then((res) => {

                })
                .catch((err) => {
                  dispatch({ type: 'UPDATE_ERROR', err})
                });
            })
            dispatch({ type: 'UPDATE_SUCCESS'})
          })
          .catch((err) => {
            dispatch({ type: 'UPDATE_ERROR', err})
          });

      })
      .catch(() => {
        let err = { message: 'Error updating profile. Please try again in a few moments' }
        dispatch({ type: 'UPDATE_ERROR', err})
      });
  }
}
