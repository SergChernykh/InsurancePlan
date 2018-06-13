function loadBaseTable(element, coreOption) {
    var txt = "<table class='optTable'>";

    var planOptions = data[coreOption];

    var addField = (field, fieldClass) => {
        txt += "<td class=" + fieldClass + ">" + field + "</td>";
    };

    var addButton = (name, checked) => {
        txt += "<td>" + 
        "<label class='switch'>" + 
            "<input type='checkbox' name='" + name + "' onclick=switchCheckedChanged('base',this)";
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

        var optionChecked = checkState("base", item.name);
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
                "<input type='checkbox' id='"+ name + "' name='" + name + "' onclick=switchCheckedChanged('additional',this)";
        txt += checked ? " checked>" : ">";
        txt += "<span class='slider round'></span>" + 
        "</label>";
        txt += "<label class='switchLabel' for='" + name + "'>" + description + "</label></div>";
    };

    txt += "<legend>Choose additional options</legend>";
    planOptions.additional.forEach(item => {
        var optionChecked = checkState("additional", item.name);
        addButton(item.name, optionChecked, item.desc)
    });

    txt += "</fieldset>"
    document.getElementById(element).innerHTML = txt;
}

function loadSummaryPlan(element) {
    var core = localStorage.getItem("core");
    var txt = "<ul class='summary'>";
    txt += "<li class='header'>Your plan</li>";
    txt += "<li class='grey' style='text-transform:capitalize'>" + core + "</li>";

    var baseObj = JSON.parse(localStorage.getItem("base"));
    if (baseObj != undefined) {
        for (const name in baseObj) {
            if (baseObj.hasOwnProperty(name)) {
                const option = baseObj[name];
                if (option)
                    txt += "<li>" + name + "</li>";
            }
        }
    }
    document.getElementById(element).innerHTML = txt;
}

function loadSummaryOptions(element) {
    var txt = "<ul class='summary'>";
    txt += "<li class='header'>Your options</li>";

    var addObj = JSON.parse(localStorage.getItem("additional"));
    if (addObj != undefined && Object.keys(addObj).length > 0) {
        for (const name in addObj) {
            if (addObj.hasOwnProperty(name)) {
                const option = addObj[name];
                if (option)
                    txt += "<li>" + name + "</li>";
            }
        }
        document.getElementById(element).innerHTML = txt;
    }
}

function loadTotalPrice(element) {
    var core = localStorage.getItem("core");
    var total = 0;
    var coreData = data[core];

    var calcForType = function(type) {
        var typeObj = JSON.parse(localStorage.getItem(type));
        for (const name in typeObj) {
            if (typeObj.hasOwnProperty(name)) {
                const option = typeObj[name];
                if (option)
                {
                    var optionObj = coreData[type].filter(function(item) {
                        return item.name == name;
                    })[0];
                    total += optionObj.cost;
                }
                    
            }
        }
    };

    calcForType("base");
    calcForType("additional");

    var txt = "<ul class='summary'>";
    txt += "<li class='header'>Total</li>";
    txt += "<li>" + total + "</li>";

    document.getElementById(element).innerHTML = txt;
}

function checkState(type, name) {
    var obj = JSON.parse(localStorage.getItem(type));
    if (obj == undefined)
        return false;
    var option = obj[name];
    return option == null ? false : option; 
}

function switchCheckedChanged(type, element) {
    console.debug(element.name, element.checked)
    var obj = JSON.parse(localStorage.getItem(type));
    if (obj == undefined)
        obj = {};
    obj[element.name] = element.checked;
    localStorage.setItem(type, JSON.stringify(obj));
}