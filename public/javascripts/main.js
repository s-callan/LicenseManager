/**
 * Created by simon on 29/06/2017.
 */

main = function () {
    $.get("/api/clients", function (data, status) {
        var table = "<table border='1'><tr><th>&nbsp;</th><th>Name</th><th>Description</th></tr>";
        for (var index = 0; index < data.length; ++index) {
            var row = data[index];
            table += '<tr><td><input type="radio" name="client" value = "' + row.id + '" onclick="select_client(this)">';
            table += '</td><td>' + row.name + '</td><td>' + row.description + '</td></tr>';
        }

        table += '</table>';

        document.getElementById("clients").innerHTML = table;
    });
};

select_client = function (button) {
    var client_id = button.value;
    $.get("/api/licenses/" + client_id, function (data, status) {
        var table = "";
        if (data.length) {
            table = "<table border='1'><tr><th>&nbsp;</th><th>Name</th><th>Description</th><th>Start date</th><th>End date</th></tr>";

            for (var index = 0; index < data.length; ++index) {
                var row = data[index];
                table += '<tr><td><input type="radio" name="license" value = "' + row.id + '" onclick="select_license(this)">';
                table += '</td><td>' + row.name + '</td><td>' + row.description + '</td>';
                table += '</td><td>' + row.start_date + '</td><td>' + row.end_date + '</td>';
                table += '</tr>';
            }

            table += '</table>'
        }
        document.getElementById("license").innerHTML = table;
        hide_license();
    });
};

hide_license = function () {
    if (document.getElementById("system")) {
        document.getElementById("system").innerHTML = "";
    }
    if (document.getElementById("project")) {
        document.getElementById("project").innerHTML = "";
    }
}

create_client = function() {

}

select_license = function (button) {
    var license_id = button.value;
    $.get("/api/licenses/" + license_id, function (data, status) {
        for (var section in data) {
            var html = "";
            html += "<table><tr><th align=left'>Name</th><th align=left'>Value</th><th></th></tr>";

            var datepicker = [];
            for (var item in data[section]) {
                var row = data[section][item];
                html += "<tr>";
                html += "<td>" + row.label + "</td>";
                html += "<td>";
                if (row.type === "bool") {
                    var checked = "";
                    if (row.value === 'true') {
                        checked = " checked";
                    }
                    html += "<input type='checkbox'" + checked + ">"
                } else if (row.type === "int") {
                    html += "<input type='number' value ='" + row.value + "' min='1' max='2147483647'>"
                } else if (row.type === "date") {
                    html += "<input type='date' value ='" + row.value + "' id= 'date_picker_"+row.name + "'>";
                    datepicker.push(row.name);
                } else if (row.type.slice(0, 5) === "enum(") {
                    var values = row.type.slice(5, -1);
                    values = values.split(",");
                    html += "<select>";
                    for (var v in values) {
                        var selected = "";
                        if (values[v] === row.value)
                            selected = " selected";
                        html += "<option value='" + values[v] + "'" + selected + ">" + values[v] + "</option>";
                    }
                    html += "</select>";
                } else {
                    html += "<input type='text' value ='" + row.value + "'>"
                }
                html += "</td>";

                html += "<td>" + row.comment + "</td>";

                html += "</tr>";
            }
            html += "</table>";

            document.getElementById(section).innerHTML = html;
            for(var i = 0; i < datepicker.length; ++i)
            {
                $("#date_picker_"+datepicker[i]).datepicker();
            }
        }
    })
};
