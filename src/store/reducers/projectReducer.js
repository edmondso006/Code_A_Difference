const initState = {
  projects: [
  ]
}

const projectReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_PROJECT':
      console.log('created project', action.project);
      return state;
    case 'CREATE_PROJECT_ERRPR':
      console.log('create project error', action.err);
      return state;
    case 'GET_PROJECTS':
      //console.log(action.projects);
      return {
        ...state,
        projects: action.projects
      };
    case 'DELETE_PROJECT_SUCCESS':
      //console.log(action.project);
      return {
        ...state,
        projects: state.projects.filter(project => project !== action.project)
      }
    default:
      return state
  }

}

export default projectReducer;