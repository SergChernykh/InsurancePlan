function loadBaseTable(element, coreOption) {
    var txt = "<table class='optTable'>";

    var planOptions = data[coreOption];

    var addField = (field, fieldClass) => {
        txt += "<td class=" + fieldClass + ">" + field + "</td>";
    };

    var addButton = (name, checked) => {
        txt += "<td>" + 
        "<label class='switch'>" + 
            "<input type='checkbox' name='" + name + "' onclick=switchCheckedChanged(this)";
        txt += checked ? " checked>" : ">";
        txt += "<span class='slider round'></span>" + 
        "</label></td>";
    };

    txt += "<tr><th>Name</th>" + 
            "<th>Description</th>" + 
            "<th>Cost, $/month</th>" + 
            "<th>Enabled</th></tr>";

    planOptions.base.forEach(item => {
        txt += "<tr>";
        addField(item.name, "name");
        addField(item.desc, "desc");
        addField(item.cost, "cost");

        var optionChecked = checkState(localStorage.getItem(item.name));
        addButton(item.name, optionChecked);
        txt += "</tr>";
    });

    txt += "</table>"
    document.getElementById(element).innerHTML = txt;
}

function loadAdditionalTable(element, coreOption) {
    var txt = "<fieldset class='optField'>";

    var planOptions = data[coreOption];

    var addField = (field, fieldClass) => {
        txt += "<td class=" + fieldClass + ">" + field + "</td>";
    };

    var addButton = (name, checked, description) => {
        txt +=  "<div><label class='switch'>" + 
                "<input type='checkbox' id='"+ name + "' name='" + name + "' onclick=switchCheckedChanged(this)";
        txt += checked ? " checked>" : ">";
        txt += "<span class='slider round'></span>" + 
        "</label>";
        txt += "<label class='switchLabel' for='" + name + "'>" + description + "</label></div>";
    };

    txt += "<legend>Choose additional options</legend>";
    planOptions.additional.forEach(item => {
        var optionChecked = checkState(localStorage.getItem(item.name));
        addButton(item.name, optionChecked, item.desc)
    });

    txt += "</fieldset>"
    document.getElementById(element).innerHTML = txt;
}

function checkState(option) {
    return option == null || option == "false" ? false : true; 
}

function switchCheckedChanged(element) {
    console.debug(element.name, element.checked)
    localStorage.setItem(element.name, element.checked);
}