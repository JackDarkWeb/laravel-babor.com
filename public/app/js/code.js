$(function(){
    let error_code = false;
    let url = location.href;
    let param = url.split('=');

    const q = param[1];

    const alertMessage = (id, errorClass, text) => {
        return $(id).next(errorClass).html(text).show('slow');
    };

    const deleteMessage = (errorClass) => {
        return $(errorClass).hide();
    };
    const requiredMessage = (errorClass, text) => {
        return $(errorClass).html(text).show('slow');
    };

    $(document).on('keyup', '#code', function () {

        let string = $(this).val();
        let filter = /^[0-9 ]+$/;

        if(string === ''){
            alertMessage(this, '.error-code', 'Field code is required');
            error_code = false;
        }else {

            if (string.match(filter)) {

                alertMessage(this, '.error-code', 'Your code is incorrect. Ex B4FRA5');
                error_code = false;

            }else if(string.length !== 6){

                alertMessage(this, '.error-code', 'It\'s a 6 character code');
                error_code = false;

            }else{

                let code = string;
                const ajax = true;

                $.ajax({
                    url: '/user/token',
                    method: 'POST',
                    dataType: 'json',
                    cache: false,
                    async: true,
                    data: {code:code, ajax:ajax, q:q},
                    success: function (response) {
                        if (response.error) {

                            alertMessage('#code', '.error-code', "Your code don't match any account");
                            error_code = false;
                        } else {
                            deleteMessage('.error-code');
                            error_code = true;
                        }
                    }
                });
            }
        }

    });





    $(document).on('submit', '#form-code', function () {

        let form  = $(this),
            code = form.find('#code').val();
        const ajax = true;

        if(error_code === false){

            requiredMessage('.error-code', 'Code is required');
            return false;

        }else {


            $.ajax({
                url: '/user/token',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data:{code:code, ajax:ajax, q:q},
                async :true,
                success: function (data) {

                    if(data.success){

                        window.location = '/user/new_password?q='+q+'&v='+code;
                    }

                },
                error: function (resp, status, error) {
                    $('.result').html(error);
                    //console.log(resp);
                },

            });
            return false;
        }

    });







});