$(document).ready(() => {

    //navibar styling
    $("a").click(function () {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
    });


    var setSchedule = (year, month) => {
        var weekdays = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"]
        var days = new Date(year, month, 0).getDate();
        for (var date = 1; date < days; date++) {
            var weekday = weekdays[new Date(year, month, date).getDay()];
            $("#list").append(`
          <li>
            <div class="date">${date}</div><div class="day">${weekday}</div><div class="time">09:00 ~ 18:00</div>
          </li>
        `);
        }
    }


    //initial schedule
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    $("#datePicker").val(`${year} / ${month + 1}`);
    setSchedule(year, month);


    //date picker
    $("#datePicker").AnyPicker({
        mode: "datetime",
        dateTimeFormat: "yyyy / M",
        maxValue: "2030 / 12",
        minValue: "2010 / 1",
        onSetOutput: function (sOutput) {
            var selectedDate = $("#datePicker").val();
            $.when($("#list").empty()).then(() => {
                selectedDate = selectedDate.split(" / ");
                setSchedule(selectedDate[0], selectedDate[1] - 1);
            });
        }
    });

});