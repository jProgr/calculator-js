var calculation = "";
var result = 0;

function number_entry()
{
    calculation += this.textContent;
    console.log(calculation);
    
    set_display_text(false);
    set_secondary_display_text();
}

function operation_entry()
{
    switch (this.textContent)
    {
        case "C": calculation = ""; break;
        case ".": checkForDoubleDot(); break;
        case "=": calculate(); break;
        default: calculation += this.textContent; checkForDoubleOp();
    }
    console.log(calculation);
    
    set_secondary_display_text();
}

function checkForDoubleOp()
{
    // Searches for double +, -, *, /
    const last_chars = calculation.slice(-2);
    const number_then_op = /\d[\+\-\*\/]/;
    if (!number_then_op.test(last_chars)) { calculation = calculation.slice(0, -2) + calculation.slice(-1); }
}

function checkForDoubleDot()
{
    // Gets the last entry number (in "13+12-15.23*17.98" gets "17.98")
    var last_number = calculation.match(/([\d\.]+)$/)[1];
    // If double dot detected, deletes the oldest one
    if (/\./.test(last_number))
    {
        last_number = last_number.split(".").join("");
        calculation = calculation.slice(0, -last_number.length) + last_number;
    }
    calculation += ".";
}

function calculate()
{
    // Gets numbers and operations
    const numbers = calculation.split(/[\+\-\*\/]/).map((n) => { return parseFloat(n); });
    const op = calculation.split(/\d/).filter((c) => { return (c) ? true : false; }).filter((c) => { return (c !== ".") ? true : false; });     // Filters dots and empty strings with those string.filter().filter()
    
    console.log(numbers);
    console.log(op);
    
    // Operates
    result = numbers[0];
    for (var i=0; i<op.length; i++)
    {
        console.log("In for: " + result + " : " + op[0]);
        switch (op[i])
        {
            case "+": result += numbers[i + 1]; break;
            case "-": result -= numbers[i + 1]; break;
            case "*": result *= numbers[i + 1]; break;
            case "/": result /= (numbers[i + 1] === 0) ? 1 : numbers[i + 1]; break;
        }
    }
    result = result.toFixed(3);
    console.log("Total: " + result);
    
    set_display_text(true);
}

function set_display_text(isResult)
{   
    var show_n = "0";
    if (isResult) { show_n = result + ""; }
    else { show_n = calculation.match(/([\d\.]+)$/)[1]; }
    
    $(".main-display").text(show_n);
}

function set_secondary_display_text()
{ $(".secondary-display").text(calculation); }

$(document).ready(function()
{
    // On key pad
    var number_pad = $(".number");
    var operation_pad = $(".operation");
    number_pad.on("click", number_entry);
    operation_pad.on("click", operation_entry);
});

/*
<script type="text/javascript">
    $(document).ready(function() {
        $('.my_button').click(function() {
            alert($(this).attr("value"));
        });
    });
</script>
*/

/*function quote(select)
{ return json[select].quote; }

function author(select)
{ return json[select].author; }

function write_quote()
{
    var pick = (Math.random() * json.length) | 0;
    $(".quote_line").html(quote(pick) + ".");
    $(".author_line").html(author(pick) + ".");
    update_tweet_button(quote(pick), author(pick));
}

function update_tweet_button(quote, author)
{
    var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("\"" + quote + "\"") + " -" + encodeURIComponent(author);
    $(".tweet").prop("href", url);
}

var json;

$.getJSON("quotes_list.json", (data) => { json = data; write_quote(); });

$(document).ready(function()
{
    // On button press
    $("#new_quote").on("click", write_quote);
});
*/