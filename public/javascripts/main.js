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
    $("#license_details").tabs();
    $(document).tooltip();
};

select_client = function (button) {
    var client_id = button.value;
    $.get("/api/licenses/?client=" + client_id, function (data, status) {
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
};

create_client = function () {

};

select_license = function (button) {
    var license_id = button.value;

    $.get("/api/licenses/?license=" + license_id, function (data, status) {
        var datepicker = [];
        var spinners = [];

        for (var section in data) {
            var html = "";
            html += "<table><tr><th align=left'>Name</th><th align=left'>Value</th><th></th></tr>";

            for (var item in data[section]) {
                var row = data[section][item];
                html += "<tr>";
                html += "<td valign='top'>" + row.label + "</td>";
                html += "<td>";
                if (row.type === "bool") {
                    html += "<input type='checkbox'";
                    if (row.value === 'true') {
                        html += " checked";
                    }
                    html += " title='" + row.comment + "'";
                    html += "/>";
                } else if (row.type === "int") {
                    html += "<input type='text'";
                    html += " value ='" + row.value + "'";
                    html += " id='spinner_" + row.name + "'";
                    html += " title='" + row.comment + "'";
                    html += " min='1' max='2147483647'>";
                    spinners.push(row.name)
                } else if (row.type === "date") {
                    html += "<input type='text'";
                    html += " value ='" + row.value + "'";
                    html += " id='date_picker_" + row.name + "'";
                    html += " title='" + row.comment + "'>";
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
                } else if (row.type === "long_string") {
                    html += "<textarea rows='14' cols='50'";
                    html += " title='" + row.comment + "'>";
                    html += row.value;
                    html += "</textarea>";
                }
                else {
                    html += "<textarea rows='1' cols='50'";
                    html += " title='" + row.comment + "'>";
                    html += row.value;
                    html += "</textarea>";
                }
                html += "</td>";
                html += "</tr>";
            }
            html += "</table>";
            document.getElementById("license_" + section).innerHTML = html;
        }

        for (var i = 0; i < datepicker.length; ++i) {
            $("#date_picker_" + datepicker[i]).datepicker();
        }
        for (var i = 0; i < spinners.length; ++i) {
            $("#spinner_" + spinners[i]).spinner();
        }
    })
};
