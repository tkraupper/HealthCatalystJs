import api from "./api";

//REDUX ACTIONS && ACTION CREATORS

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL',
    SEARCH_PEOPLE: 'SEARCH_PEOPLE'
}

const formatData = data =>({
    ...data,
    age:parseInt(data.age?data.age:0)
})

//FETCH METHOD TO RETURN LIST OF PEOPLE
export const fetchAll = () => dispatch =>
{
    api.person().fetchAll()
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        )
        .catch(err => console.log(err))
}

//CREATE METHOD TO CREATE NEW RECORD
export const create = (data, onSuccess) => dispatch =>{
    data = formatData(data)
    api.person().create(data)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

//UPDATE METHOD TO UPDATE EXISTING RECORD
export const update = (id, data, onSuccess) => dispatch =>{
    data = formatData(data)
    api.person().update(id, data)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: {id: id,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

//DELETE METHOD TO DELETE EXISTING RECORD
export const Delete = (id, onSuccess) => dispatch =>{
    api.person().delete(id)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

//FETCH METHOD TO RETURN LIST OF PEOPLE
export const searchPeople = (people, searchTerm) => dispatch => {
    let filteredPeople = null;
    if (searchTerm != '') {
        filteredPeople = people.filter((person)  => `${person.firstName} ${person.lastName}`.includes(searchTerm))
    }
        dispatch({
            type: ACTION_TYPES.SEARCH_PEOPLE,
            payload: filteredPeople
        })
    }