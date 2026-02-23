let formData = [
    { label: "Name", type: "text", id: "name" },
    { label: "Email", type: "text", id: "email" },
    { label: "Password", type: "password", id: "password" },
    { 
        label: "Country", 
        type: "select", 
        id: "country",
        options: ["India", "USA", "Canada"]
    }
];

function createForm() {
    let form = $("#myForm");

    formData.forEach(function(item) {

        let div = $("<div class='field'></div>");
        let label = $("<label>" + item.label + ": </label>");

        div.append(label);

        if(item.type === "text" || item.type === "password") {
            let input = $("<input type='" + item.type + "' id='" + item.id + "'>");
            div.append(input);
        }

        if(item.type === "select") {
            let select = $("<select id='" + item.id + "'></select>");

            item.options.forEach(function(opt) {
                select.append("<option value='" + opt + "'>" + opt + "</option>");
            });

            div.append(select);
        }

        div.append("<span class='error' id='" + item.id + "Err'></span>");

        form.append(div);
    });

    let stateDiv = $("<div class='field' id='stateDiv' style='display:none;'></div>");
    stateDiv.append("<label>State: </label>");
    stateDiv.append("<input type='text' id='state'>");
    stateDiv.append("<span class='error' id='stateErr'></span>");

    form.append(stateDiv);
}

$(document).ready(function() {

    createForm();

    $("#myForm").on("change", "#country", function() {
        if($(this).val() === "USA") {
            $("#stateDiv").show();
        } else {
            $("#stateDiv").hide();
        }
    });

    $("#submitBtn").click(function() {

        let isValid = true;

        $(".error").text("");

        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let country = $("#country").val();
        let state = $("#state").val();

        if(name === "") {
            $("#nameErr").text("Name required");
            isValid = false;
        }

        if(email === "" || !email.includes("@")) {
            $("#emailErr").text("Enter valid email");
            isValid = false;
        }

        if(password.length < 6) {
            $("#passwordErr").text("Min 6 characters");
            isValid = false;
        }

        if(country === "USA" && state === "") {
            $("#stateErr").text("State required");
            isValid = false;
        }

        if(isValid) {
            alert("Form submitted successfully");
        }

    });

});