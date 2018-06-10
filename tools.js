function loadBaseTable(element, coreOption) {
    var txt = "<table class='optTable'>";

    var planOptions = data[coreOption];

    var addField = (field) => {
        txt += "<td>" + field + "</td>";
    };

    var addButton = () => {
        txt += "<td>" + "<label class='switch'><input type='checkbox'><span class='slider round'></span></label>" + "</td>";
    };

    planOptions.base.forEach(item => {
        txt += "<tr>";
        addField(item.name);
        addField(item.desc);
        addField(item.cost);
        addButton();
        txt += "</tr>";
    });

    txt += "</table>"
    document.getElementById(element).innerHTML = txt;
}