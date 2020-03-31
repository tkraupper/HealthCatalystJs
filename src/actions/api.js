import axios from "axios";

const baseUrl = "http://localhost:59289/api/";

//HANDLES ALL THE HTTP REQUESTS

export default {
    person(url = baseUrl + 'People/'){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url + id),
            create : newRecord => axios.post(url, newRecord),
            update : (id,updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
}