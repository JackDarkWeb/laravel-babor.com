$(function(){

    $('.label-file').click(function () {
        $(this).addClass('d-none').siblings('.btn-mob1').removeClass('d-none')
    });





    $(window).load(function(){
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#profilCv').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#imgInp").change(function(){
            readURL(this);
        });
    });
});
