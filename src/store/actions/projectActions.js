//All actions that have to do with a project (CRUD)
//Thunk allows us to return a function
//Dispatch function dispatches an action to the reducer
export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //Make async call to db here
    //Pausing the dispatch until we get data back from the db
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authID = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      organizationName: profile.organizationName,
      authorid: authID,
      aboutOrg: profile.about,
      createdAt: new Date().toString()
    }).then(() => {
      //calling dispatch then resumes the dispatch to the reducer
      dispatch({type: 'CREATE_PROJECT', project})
    }).catch((err) => {
      dispatch({type: 'CREATE_PROJECT_ERROR', err})
    });
  }
};


export const getUsersProjects = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authID = getState().firebase.auth.uid;
    firestore.collection('projects').where('authorid',  '==', authID).get()
      .then((res) => {
        let projects = [];
        res.forEach(doc => {
          let project = doc.data();
          project.id = doc.id;
          projects.push(project);
        });
        dispatch({type: 'GET_PROJECTS', projects})
      })
      .catch(err => {
        console.log('error');
        dispatch({type: 'GET_PROJECTS_ERROR', err})
      });
  }
};

export const deleteProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('projects').doc(`${project.id}`).delete()
      .then((res) => {
        dispatch({type: 'DELETE_PROJECT_SUCCESS', project})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_PROJECT_ERROR', err})
      })
  }
}

export const updateProject = (projectID, updatedProject) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
 
    console.log(updatedProject);
    firestore.collection('projects').doc(`${projectID}`).update(updatedProject)
      .then(() => {
        dispatch({ type: 'UPDATE_PROJECT_SUCCESS'})
      })
      .catch((err) => {
        console.log(err);
        let errMSG = { message: 'Error updating a project. Please try again in a few moments' }
        dispatch({ type: 'UPDATE_PROJECT_ERROR', errMSG})
      });
  }
}


