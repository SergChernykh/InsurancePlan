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
            "<th>Cost</th>" + 
            "<th>Enabled</th></tr>";

    planOptions.base.forEach(item => {
        txt += "<tr>";
        addField(item.name, "name");
        addField(item.desc, "desc");
        addField(item.cost, "cost");

        var optionChecked = localStorage.getItem(item.name);
        if (optionChecked == null)
            optionChecked = false;
        if (optionChecked == "true")
            optionChecked = true;
        if (optionChecked == "false")
            optionChecked = false;
        
        addButton(item.name, optionChecked); //TODO: name or id?
        txt += "</tr>";
    });

    txt += "</table>"
    document.getElementById(element).innerHTML = txt;
}

function switchCheckedChanged(element) {
    console.debug(element.name, element.checked)
    localStorage.setItem(element.name, element.checked);
}