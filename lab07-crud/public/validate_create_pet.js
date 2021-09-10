document.querySelector("#create-pet").addEventListener('submit', function(event){
    event.preventDefault();

    let petName = document.querySelector('[name="petName"]').value;
    let category = document.querySelector('[name="category"]').value;

    let errorString = "";

    if (petName.length == 0) {
        // alert("pet name problem")
       errorString += "Pet name is too short";
    }

    if (category.length == 0) {
        // alert("cateogry too short")
        errorString +="Category name is too short";
    }
    // alert(errorString);
    if (errorString) {
        alert(errorString);
        return false;
    } else {
        event.target.submit();
    }
})