let infoElement = $('#singers .info').first();
$(infoElement).slideDown(0);
$('#singers .click').click(function(e){
    if ($(e.target).next().css('display') !== 'none'){
        $(infoElement).slideUp(250);
        return;
    }
    $(infoElement).slideUp(250);
    $(e.target).next().slideToggle(250);
    infoElement = $(e.target).next();
})

$('textarea').keyup(function(){
    const text = $('textarea').val();
    const remaning = 100 - text.length;

    $('textarea+p span').text((remaning > 0) ? remaning : "Your available characters are finished");
})

function setCountdown(){
    let currentTime = new Date();
    let futureTime = new Date("2024-10-25");
    let difference = futureTime - currentTime;
    difference = Math.floor(difference /= 1000);
    const day = Math.floor(difference / (3600 * 24));
    difference -= (day * 24 * 3600);
    const hour = Math.floor(difference / 3600);
    difference -= (hour * 3600);
    const min = Math.floor(difference / 60);
    const sec = difference - (min * 60);
    $(".time").children().eq(0).children().text(`${day}D`);
    $(".time").children().eq(1).children().text(`${hour}H`);
    $(".time").children().eq(2).children().text(`${min}M`);
    $(".time").children().eq(3).children().text(`${sec}S`);
}
setInterval(setCountdown,1000);

function openMenu(){
    $('aside').animate({left: 0},250);
}

function closeMenu(){
    $('aside').animate({left: -$('aside').outerWidth()},250);
}
$('aside').animate({left: -$('aside').outerWidth()},0);
$('aside h3').click(openMenu)
$('aside h4').click(closeMenu)

$('aside h5').click(function(e){
    const text = $(e.target).text();
    let jq = '';
    switch (text) {
        case "Home":
            jq = '#title';
            break;
        case "Singers":
            jq = '#singers';
            break;
        case "Event":
            jq = '#event';
            break;
        case "Contact":
            jq = '#contact';
            break;
    }
    $('html, body').scrollTop($(jq).offset().top,250);
})