var parent;

function set_light_button(on_or_off)
{
        if(on_or_off=="off")
        {
            $("#lightLable").html("Light is OFF");
            $("#lightPic").attr('src', 'img/off.png');
            $('.checkbox',parent).attr('checked', false);
        }
        else if(on_or_off=="on")
        {
            $("#lightLable").html("Light is ON");
            $("#lightPic").attr('src', 'img/on.png');
            $('.checkbox',parent).attr('checked', true);
        }
}

function on_light()
{
    //set_light_button("on");
    var on_url="/lighton";   //here api
    $.ajax({
                url: on_url,
                type: "GET",
              //  dataType: "json",//必须加这个
                data:{},
             //   contentType: "application/json; charset=utf-8",
                success: function(response) {
                   console.log("on OK");
                   set_light_button("on");
                },
                error:function()
                {

                }
            });
}

function off_light()
{
    //set_light_button("off");
    var off_url="/lightoff";   //here api
    $.ajax({
                url: off_url,
                type: "GET",
            //    dataType: "json",//必须加这个
                data:{},
            //    contentType: "application/json; charset=utf-8",
                success: function(response) {
                    console.log("off OK");
                    set_light_button("off");
                },
                error:function()
                {
                   console.log(pid+"stop Error");
                }
            });
}

$("#deng").on("click",".plug_toggle",function(){
    console.log("click");
    parent = $(this).parents('.on_off_block');

    console.log($('.checkbox',parent).attr('checked'));
    //if current is on,click to off
    if($('.checkbox',parent).attr('checked'))  //true
    {
        off_light();
    }
    else
    {
        on_light();
    }
});
