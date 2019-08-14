import axios from 'axios';
const initialState = () => {
    const localState = JSON.parse(window.localStorage.getItem('initialState'));

    if (localState !== null) {
        console.log(JSON.stringify(localState.profiles));
        localState.current = 0;
        return localState;
    }
    const INITIAL_STATE = {
        profiles: [
            {
                id: 1,
                type: "profile",
                className: "profile-item",
                isActive: true,
                text: "default",
            },
            {
                id: 2,
                type: "profile",
                className: "profile-item",
                isActive: false,
                text: "game",
            },
            {
                id: 3,
                type: "profile",
                className: "profile-item",
                isActive: false,
                text: "movie",
            },
            {
                id: 4,
                type: "profile",
                className: "profile-item",
                isActive: false,
                text: "music",
            },
        ],
        current: 0,


        icons: [
            {
                type: "Up",
                className: "icon up"
            }, {
                type: "Down",
                className: "icon down"
            }, {
                type: "Add",
                className: "icon add"
            }, {
                type: "Edit",
                className: "icon edit",
            }, {
                type: "Delete",
                className: "icon delete"
            }
        ],
        currentAction: null,
        showMsgDelete: false,

    };
    

    return INITIAL_STATE;
}
const saveToLocal = (object) => {
    window.localStorage.setItem('initialState', JSON.stringify(object));
}

const deepClone = (obj) => { 
    return JSON.parse(JSON.stringify(obj)) 
};

const actionChoose = (state, index) => {
    let temp = deepClone(state);
    temp.current = index;
    saveToLocal(temp);
    return temp;
}
const actionAdd = (state) => {
    let temp = deepClone(state);
    temp.profiles.push({
        id: temp.profiles.length + 1,
        type: "custom",
        className: "profile-item",
        isActive: false,
        text: "New Profile",
        isEdit: true
    });
    temp.current = temp.profiles.length - 1;
    console.log(temp.profiles[temp.current]);

    saveToLocal(temp);
    return temp;
}
const actionUp = (state) => {
    let temp = deepClone(state);


    let currentUp = temp.current;
    let moveItem = temp.profiles[temp.current];
    if (currentUp !== 0) {
        temp.profiles[temp.current] = temp.profiles[currentUp - 1]
        temp.profiles[currentUp - 1] = moveItem;
        temp.current = currentUp - 1;
    }

    saveToLocal(temp);

    return temp;
}
const actionDown = (state) => {
    let temp = deepClone(state);

    let currentDown = temp.current;
    let moveItem = temp.profiles[temp.current];
    if (currentDown !== temp.profiles.length - 1) {
        temp.profiles[temp.current] = temp.profiles[currentDown + 1]
        temp.profiles[currentDown + 1] = moveItem;
        temp.current = currentDown + 1;
    }


    saveToLocal(temp);

    return temp;
}



var tempSetTimeOut;

export const onAutoSave = (value) => {

    tempSetTimeOut = setTimeout(
        () => axios.post('https://my-json-server.typicode.com/quocthai95/demo/items', value).then(response => {
            console.log(response);
            saveToLocal(value);
        }).catch(error => {
            console.log("Trinh Trinh ^^")
        }), 3000
    )
}


export const clearTime = () => {
    console.log('abc');
    clearTimeout(tempSetTimeOut);
}




const handleNameChange = (state, e) => {
    let value = e.target.value.replace(/^\s+/g,"");
    let temp = deepClone(state);
    if (!value) return temp
    const newList = temp.profiles;
    newList[temp.current].text = value;
    temp.profiles = newList;

    //saveToLocal(temp);
    clearTime();
    onAutoSave(temp);
    return temp;
}
const actionDelete = (state) => {
    let temp = deepClone(state);
    let currentProfile = temp.current;
    if (currentProfile >0){
        
        temp.profiles.splice(currentProfile, 1);
        temp.current = currentProfile - 1;

    }
    else{
        temp.profiles.splice(currentProfile, 1);
        temp.current = currentProfile;
    }
    

    saveToLocal(temp);

    return temp;
}



export function reducer(state = initialState(), action) {
    switch (action.type) {
        case 'choose':
            return actionChoose(state, action.index);
        case 'addProfile':
            return actionAdd(state);
        case 'upProfile':
            return actionUp(state);
        case 'downProfile':
            return actionDown(state);
        case 'handleNameChange':
            return handleNameChange(state, action.e);
        case 'deleteProfile':
            return actionDelete(state);
        default:

            return state
    }
}


export default reducer;