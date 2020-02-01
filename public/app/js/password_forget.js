$(function(){
    let error_email = false;

    const alertMessage = (id, errorClass, text) => {
        return $(id).next(errorClass).html(text).show('slow');
    };

    const deleteMessage = (errorClass) => {
        return $(errorClass).hide();
    };
    const requiredMessage = (errorClass, text) => {
        return $(errorClass).html(text).show('slow');
    };

    $(document).on('keyup', '#email', function () {
        let string = $(this).val();
        let filter = /^[0-9 +]+$/;
        let number = /^(\+)[0-9]{11,12}/;
        let email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(string === ''){
            alertMessage(this, '.error-email', 'Field email or phone is required');
            error_email = false;
        }else{
            if(string.match(filter)){

                if(!string.match(number)){
                    alertMessage(this, '.error-email', 'Your number is incorrect. Ex +380633471236');
                    error_email = false;
                }else{


                    let email_or_phone = string;
                    const ajax         = true;

                    $.ajax({
                        url: '/user/password_forget',
                        method: 'POST',
                        dataType: 'json',
                        cache: false,
                        async: true,
                        data:{email_or_phone:email_or_phone, ajax:ajax},
                        success: function (response) {
                            if(response.error){

                                alertMessage('#email', '.error-email', "Your number don't match any account");
                                error_email = false;
                            }else{
                                deleteMessage('.error-email');
                                error_email = true;
                            }
                        }
                    });
                }
            }else{

                if(!string.match(email)){
                    alertMessage(this, '.error-email', 'Your email is incorrect');
                    error_email = false;
                }else {

                    let email_or_phone = string;
                    const ajax         = true;

                    $.ajax({
                        url: '/user/password_forget',
                        method: 'POST',
                        dataType: 'json',
                        cache: false,
                        async: true,
                        data:{email_or_phone:email_or_phone, ajax:ajax},
                        success: function (response) {
                            if(response.error){

                                alertMessage('#email', '.error-email', "Your email don't match any account");
                                error_email = false;
                            }else{
                                deleteMessage('.error-email');
                                error_email = true;
                            }
                        }
                    });

                }
            }
        }

    });


    $(document).on('submit', '#form-reset', function () {

       let form  = $(this),
           email_or_phone = form.find('#email').val();
       const ajax = true;

       if(error_email === false){

           requiredMessage('.error-email', 'Email or phone  is required');
           return false;

       }else {


           $.ajax({
               url: '/user/password_forget',
               type: 'POST',
               dataType: 'json',
               cache: false,
               data:{email_or_phone:email_or_phone, ajax:ajax},
               async :true,
               success: function (data) {

                   if(data.success){

                       window.location = '/user/token?q='+ email_or_phone;
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