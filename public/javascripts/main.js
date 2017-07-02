/**
 * Created by simon on 29/06/2017.
 */

main = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var table = "<table border='1'><tr><th>&nbsp;</th><th>Name</th><th>Description</th></tr>";
            var data = JSON.parse(this.responseText);
            for (var index = 0; index < data.length; ++index) {
                var row = data[index];
                table += '<tr><td><input type="radio" name="client" value = "' + row.id + '" onclick="select_client(this)">';
                table += '</td><td>' + row.name + '</td><td>' + row.description + '</td></tr>';
            }

            table += '</table>';

            document.getElementById("clients").innerHTML = table;
        }
    };
    xhttp.open("GET", "/api/clients", true);
    xhttp.send();
};

select_client = function (button) {
    var client_id = button.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
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
        }
    };
    xhttp.open("GET", "/api/licenses/" + client_id, true);
    xhttp.send();
};

select_license = function (button) {
    var license_id = button.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (section in data) {
                var html = "";
                html += "<table><tr><th align=left'>Name</th><th align=left'>Value</th></tr>";
                for (var item in data[section]) {
                    var row = data[section][item]
                    html += "<tr><td>" + row.label + "</td>";
                    html += "<td>";
                    if (row.type == "bool") {
                        if (row.value == 'true') {
                            html += "<input type='checkbox' checked>"
                        } else
                            html += "<input type='checkbox'>"
                    } else if (row.type == "int") {
                        html += "<input type='number' value ='" + row.value + "' min='1' max='2147483647'>"
                    } else if (row.type == "date") {
                        html += "<input type='date' value ='" + row.value + "'>"
                    } else if (row.type.startsWith("enum(")) {
                        var values = row.type.slice(5, -1);
                        values = values.split(",");
                        html += "<select>";
                        for (var v in values) {
                            html += "<option value='" + values[v] + "'>" + values[v] + "</option>";
                        }
                        html += "</select>";
                    } else {
                        html += "<input type='text' value ='" + row.value + "'>"
                    }
                    html += "</td></tr>"
                }
                html += "</table>"
                document.getElementById(section).innerHTML = html;
            }
        }
    };
    xhttp.open("GET", "/api/licenses/" + license_id, true);
    xhttp.send();

};