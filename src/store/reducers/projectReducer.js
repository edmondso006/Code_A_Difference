const initState = {
  projects: [],
  updateProjectError: null,
  createdProjectError: null,
  deleteProjectError: null,
}

const projectReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_PROJECT':
      console.log('created project', action.project);
      return state;
    case 'CREATE_PROJECT_ERRPR':
      console.log('create project error', action.err);
      return {
        ...state,
        createdProjectError: action.err
      };
    case 'GET_PROJECTS':
      return {
        ...state,
        projects: action.projects
      };
    case 'DELETE_PROJECT_SUCCESS':
      return {
        ...state,
        projects: state.projects.filter(project => project !== action.project)
      }
    case 'DELETE_PROJECT_ERROR':
      return {
        ...state,
        deleteProjectError: action.err
      }
    case 'UPDATE_PROJECT_SUCCESS':
      return {
        ...state
      }
    case 'UPDATE_PROJECT_ERROR':
      return {
        ...state,
        updateProjectError: action.errMSG.message
      }
    default:
      return state
  }
}

export default projectReducer;