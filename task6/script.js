window.onload = function () {
    var ValidationState;
    (function (ValidationState) {
        ValidationState["Valid"] = "valid";
        ValidationState["Invalid"] = "invalid";
    })(ValidationState || (ValidationState = {}));
    var form = document.getElementById("regForm");
    var submitBtn = document.getElementById("submitBtn");
    var successMsg = document.getElementById("successMsg");
    var today = new Date();
    var maxDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    var dobInput = document.getElementById("dob");
    if (dobInput) {
        dobInput.max = maxDob.toISOString().split("T")[0];
    }
    var fields = {
        name: { el: "name", msg: "nameMsg", validate: function (v) { return v.trim().length > 0; } },
        email: { el: "email", msg: "emailMsg", validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
        pass: { el: "pass", msg: "passMsg", validate: function (v) { return v.length >= 6; } },
        dob: { el: "dob", msg: "dobMsg", validate: function (v) { return v !== "" && new Date(v) <= maxDob; } },
        phone: { el: "phone", msg: "phoneMsg", validate: function (v) { return /^\d{10}$/.test(v.replace(/\D/g, "")); } }
    };
    var fieldArray = Object.keys(fields).map(function (k) { return fields[k]; });
    fieldArray.forEach(function (f) {
        var input = document.getElementById(f.el);
        input.addEventListener("input", function () { return validateField(f); });
    });
    function validateField(f) {
        var input = document.getElementById(f.el);
        var msg = document.getElementById(f.msg);
        var val = input.value;
        var ok = f.validate(val);
        input.className = ok ? ValidationState.Valid : ValidationState.Invalid;
        msg.textContent = "";
        if (!ok && val) {
            if (f.el === "name")
                msg.textContent = "Required";
            if (f.el === "email")
                msg.textContent = "Invalid email";
            if (f.el === "pass")
                msg.textContent = "Min 6 chars";
            if (f.el === "dob")
                msg.textContent = "18+ only";
            if (f.el === "phone")
                msg.textContent = "10 digits";
        }
        toggleBtn();
    }
    function toggleBtn() {
        var all = fieldArray.every(function (f) {
            var val = document.getElementById(f.el).value;
            return f.validate(val);
        });
        submitBtn.disabled = !all;
    }
    form.onsubmit = function (e) {
        e.preventDefault();
        form.style.display = "none";
        successMsg.style.display = "block";
    };
};
