//get the drones data from the server (master server)
function getData() {

    // do an ajax call
    $.ajax({
        url: `http://localhost:3000/drones?minutes=${$('#minutes').val()}`, success: function (data) {
            if (data.length > 0) {
                const header = [{id:'droneid',display:'ID'},{id:'droneip',display:'IP'}, {id:'lastupdate',display:'Last Update'}
                ,{id:'payload',display:'Payload'},{id:'status',display:'Status'}];

                const table = new Table();
                table.setHeader(header)
                    .setData(data)
                    .setTableClass('table')
                    .build();
            }
        },error:function(err){
            console.log(err);
        },
        dataType:"json"
    })
}
// post data (insert\update) from client to master server
function postData() {
    let payloadToServer = {};
    payloadToServer.payload = $("#dronepayload").val();
    payloadToServer.droneid = $("#droneid").val();
    payloadToServer.droneip = $("#droneip").val();
    payloadToServer.status = $("#dronestatus").val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
         url: `http://localhost:3000/drones`, 
         data:JSON.stringify(payloadToServer),
         contentType: "application/json; charset=utf-8",
          success: function (data) {
            console.log(data);
        }, error: function (err) {
            console.log(err);
        }
    });

}
///###### this is a script from the internet ####### ///////
function Table() {
    //sets attributes
    this.header = [];
    this.data = [[]];
    this.tableClass = ''
}
Table.prototype.setHeader = function (keys) {
    //sets header data
    this.header = keys
    return this
}

Table.prototype.setData = function (data) {
    //sets the main data
    this.data = data
    return this
}

Table.prototype.setTableClass = function (tableClass) {
    //sets the table class name
    this.tableClass = tableClass
    return this
}

Table.prototype.build = function (container) {

    //default selector
    container = container || '.table-container'

    //creates table
    var table = $('<table></table>').addClass(this.tableClass)

    $(container).empty();
    var tr = $('<tr></tr>') //creates row
    var th = $('<th></th>') //creates table header cells
    var td = $('<td></td>') //creates table cells

    var header = tr.clone() //creates header row

    //fills header row
    this.header.forEach(function (d) {
        header.append(th.clone().text(d.display))
    })

    //attaches header row
    table.append($('<thead></thead>').append(header))

    //creates 
    var tbody = $('<tbody></tbody>')
    var header1 = this.header;
    //fills out the table body
    this.data.forEach(function (d) {
        var row = tr.clone() //creates a row
        header1.forEach(function (e, j) {
            row.append(td.clone().text(d[e.id])) //fills in the row
        })
        tbody.append(row) //puts row on the tbody
    })

    $(container).append(table.append(tbody)) //puts entire table in the container

    return this
}
