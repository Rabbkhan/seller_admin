function submitdetails(event) {
    event.preventDefault();

    const sprice = event.target.sprice.value;
    const pname = event.target.pname.value;
    const category = document.getElementById("select").value;

    const obj = {
        sprice,
        pname,
        category,
    };

    axios.post("https://crudcrud.com/api/858cd1564d33482eaa36902085a62ce5/admindata", obj)
        .then(function(response) {
            showuseronscreen(response.data);
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
}

window.addEventListener("DOMContentLoaded", function() {
    axios.get("https://crudcrud.com/api/858cd1564d33482eaa36902085a62ce5/admindata")
        .then(function(response) {
            for (let i = 0; i < response.data.length; i++) {
                showuseronscreen(response.data[i]);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});

function deleteProduct(obj, parentelem, childelem) {
    axios.delete(`https://crudcrud.com/api/858cd1564d33482eaa36902085a62ce5/admindata/${obj._id}`)
        .then(function(response) {
            parentelem.removeChild(childelem);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function editProduct(obj, childelem) {
    const sprice = prompt("Enter the new selling price:");
    const pname = prompt("Enter the new product name:");
    const category = prompt("Enter the new category:");

    const updatedObj = {
        sprice,
        pname,
        category,
    };

    axios.put(`https://crudcrud.com/api/858cd1564d33482eaa36902085a62ce5/admindata/${obj._id}`, updatedObj)
        .then(function(response) {
            childelem.textContent = updatedObj.sprice + " - " + updatedObj.pname + " - " + updatedObj.category + " ";
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function showuseronscreen(obj) {
    let parentelem = document.getElementById(obj.category + "list");
    if (!parentelem) {
        parentelem = document.createElement('li');
        parentelem.id = obj.category + "list";
        document.body.appendChild(parentelem);
    }

    let childelem = document.createElement("li");
    childelem.textContent = obj.sprice + " - " + obj.pname + " - " + obj.category + " ";

    let edit = document.createElement("input");
    edit.type = "button";
    edit.value = "Edit Product";

    edit.onclick = function() {
        editProduct(obj, childelem);
    };

    let del = document.createElement("input");
    del.type = "button";
    del.value = "Delete Product";

    del.onclick = function() {
        deleteProduct(obj, parentelem, childelem);
    };

    childelem.appendChild(edit);
    childelem.appendChild(del);
    parentelem.appendChild(childelem);
}
