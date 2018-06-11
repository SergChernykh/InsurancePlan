function loadBaseTable(element, coreOption) {
    var txt = "<table class='optTable'>";

    var planOptions = data[coreOption];

    var addField = (field, fieldClass) => {
        txt += "<td class=" + fieldClass + ">" + field + "</td>";
    };

    var addButton = () => {
        txt += "<td>" + 
        "<label class='switch'>" + 
            "<input type='checkbox'>" + 
                "<span class='slider round'></span>" + 
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
        addButton();
        txt += "</tr>";
    });

    txt += "</table>"
    document.getElementById(element).innerHTML = txt;
}