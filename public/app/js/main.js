$(function () {

    $('.error-save').hide();

    let error_name = false, error_day = false, error_month = false,
        error_year = false, error_location = false, error_pass = false,
        error_sex = false, error_email = false;
    let sex;

    const alertMessage = (id, errorClass, text) => {
        return $(id).next(errorClass).html(text).show('slow');
    };

    const deleteMessage = (errorClass) => {
        return $(errorClass).hide();
    };
    const requiredMessage = (errorClass, text) => {
        return $(errorClass).html(text).show('slow');
    };
    const borderColorMessage = (id) => {
        return $(id).css('border-color', 'red');
    };


    const birthDay = (id) => {

        $(document).on('change', id, function () {
            let natural = $(this).val();
            let filter = /^[0-9]+$/;

            if(!natural.match(filter)){
                borderColorMessage(this);
                (id === '#day') ? error_day = false : error_month = false;
            }else {
                $(this).removeAttr('style');
                (id === '#day') ? error_day = true : error_month = true;
            }
        });
    };


    $(document).on('blur', '#name', function () {
        let name = $(this).val();
        let filter = /^[a-zA-Zéèêëíìîïñóòôöõúùûüýÿæ -]+$/i;

        if(name === ''){
            alertMessage(this, '.error-name', 'Field name is required');
            error_name = false;
        }else if(!name.match(filter)){
            alertMessage(this, '.error-name', 'Your name contains characters  not allowed');
            error_name = false;
        }else if(name.length < 3){
            alertMessage(this, '.error-name', 'Name must be at least 3 characters long');
            error_name = false;
        }else{
            deleteMessage('.error-name');
            error_name = true;
        }
    });

    birthDay('#day');
    birthDay('#month');

    $(document).on('blur', '#year', function () {

        let year = $(this).val();
        let filter = /^(19|20)[0-9]{2}/;

        if(year === ''){
            borderColorMessage(this);
            error_year = false;
        }else if(!year.match(filter)){
            borderColorMessage(this);
            error_year = false;
        }else if(year >= 2012){
            borderColorMessage(this);
            error_year = false;
        } else {
            $(this).removeAttr('style');
            error_year = true;
        }
    });

    $(document).on('blur', '#location', function () {

        let location = $(this).val();
        let filter = /^[a-zA-Z ,]+$/;

        if(location === ''){
            alertMessage(this, '.error-location', 'Field location is required');
            error_location = false;
        }else if(!location.match(filter)){
            alertMessage(this, '.error-location', 'Field location is incorrect');
            error_location = false;
        }else{
            deleteMessage('.error-location');
            alertMessage('#radio', '.error-sex', 'Field sexy is required');
            error_location = true;
        }
    });

    $(document).on('click', '#male, #female', function (e) {
        e.preventDefault();

        let value = $(this).attr('value');
        if(value === 'male' || value === 'female'){
            sex = value;
            error_sex = true;

        }else{
            error_sex = false;
        }
    });

    $(document).on('blur', '#email', function () {
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
                    deleteMessage('.error-email');
                    error_email = true;
                }
            }else{

                if(!string.match(email)){
                    alertMessage(this, '.error-email', 'Your email is incorrect');
                    error_email = false;
                }else {
                    deleteMessage('.error-email');
                    error_email = true;
                }
            }
        }

    });

    $(document).on('blur', '#password', function () {
        let pass = $(this).val();
        if(pass === ''){
            alertMessage(this, '.error-password', 'Field password is required');
            error_pass = false;
        }else if(pass.length < 8){
            alertMessage(this, '.error-password', 'Password must be at least 8 characters long');
            error_pass = false;
        }else {
            deleteMessage('.error-password');
            error_pass = true;
        }
    });


    $(document).on('submit', '#form-register', function () {

        let form = $(this),
            name = form.find('#name').val(),
            day = form.find('#day').val(),
            month = form.find('#month').val(),
            year = form.find('#year').val(),
            sexy = sex,
            location = form.find('#location').val(),
            email_or_phone = form.find('#email').val(),
            password = form.find('#password').val();

        const ajax = true;

        let filter = /^[0-9]+$/;
        //alert(error_year)
        if(error_name === false || error_pass === false || error_email === false || error_sex === false || error_location === false || error_day === false || error_month === false || error_year === false){

            if(name === ''){
                requiredMessage('.error-name', 'Field name is required');
            }
            if(!day.match(filter)){
                borderColorMessage('#day');
            }
            if(!month.match(filter)){
                borderColorMessage('#month');
            }
            if(year === ''){
                borderColorMessage('#year');
            }
            if(location === ''){
                requiredMessage('.error-location', 'Field location is required');
            }
            if(email_or_phone === ''){
                requiredMessage('.error-email', 'Field email or phone is required');
            }
            if(password === ''){
                requiredMessage('.error-password', 'Field password is required');
            }
            return false;
        }else{

            $.ajax({
                url:'/user/register',
                method:'POST',
                dataType:'json',
                async: true,
                cache:false,
                data:{name:name,day:day,month:month,year:year,location:location,sexy:sexy,email_or_phone:email_or_phone,password:password, ajax:ajax},
                success:function (response) {
                    if(response.error === true){

                        $('.result').html(response.message);

                    }else{
                        $('.result').html(response.message);
                        $('#form-register').find('#name, #day, #month, #year, #email, #location, #password').val('');
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
