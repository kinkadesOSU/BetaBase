// const baseURL = "http://localhost:3625/gyms/edit"
const baseURL = "http://flip3.engr.oregonstate.edu:3625/gyms/edit"
const baseURL_add = "http://flip3.engr.oregonstate.edu:3625/gyms"

document.addEventListener('DOMContentLoaded', addRow)
const myTable = document.getElementById('gym-table-body')


let modal = document.getElementById("myModal");
let id = document.getElementById('edit-id')
let name = document.getElementById('edit-name')
let city = document.getElementById('edit-city')
let stateID = document.getElementById('edit-stateID')
let address = document.getElementById('edit-address')
let cost = document.getElementById('edit-cost')

let btn = document.getElementById('update-gym')
btn.addEventListener('click', () => editGym(), false);

var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

document.addEventListener('DOMContentLoaded', addListener)

function addListener() {
    btns = document.querySelectorAll('button.modal-btn')
    btns.forEach(element => element.addEventListener('click', () => getGym(element), false));
}

async function getGym(element) {
    let tr = element.closest("tr")
    const row_id = tr.id

    const res = await axios.get(baseURL, { params: { id: row_id } } );

    modal.style.display = "block";

    id.value = res.data[0].id
	name.value = res.data[0].name
	city.value = res.data[0].city
	stateID.value = res.data[0].stateID
	address.value = res.data[0].address
	cost.value = res.data[0].cost
	
};

async function editGym() {

    let id = document.getElementById('edit-id').value
	let name = document.getElementById('edit-name').value
	let city = document.getElementById('edit-city').value
	let stateID = document.getElementById('edit-stateID').value
	let address = document.getElementById('edit-address').value
	let cost = document.getElementById('edit-cost').value

    let payload = { 
        id: id,
		name: name, 
		city: city, 
		stateID: stateID, 
		address: address, 
		cost: cost };
	
    axios.put(baseURL, payload)

    .then((response) => {
        // console.log(response);
    }, (error) => {
        console.log(error);
    });
}




function addRow() {
    document.getElementById('add_gym').addEventListener('click', () => addGym(), false);
}

async function addGym() {
    let name = document.getElementById('name').value
    let city = document.getElementById('city').value
    let state = document.getElementById('area_name').value
    let address = document.getElementById('address').value
    let cost = document.getElementById('cost').value

    let payload = { name: null, city: null, state: null, address: null, cost: null };
        payload.name = name
        payload.city = city
        payload.stateID = state
        payload.address = `${address}`
        payload.cost = `${cost}`
    
    console.log(payload)

    axios.post(baseURL_add, payload)

    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
};