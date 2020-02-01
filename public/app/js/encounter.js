$(function () {

    const slider = () => {
        $('.fa-times').click(function (e) {
            e.preventDefault();
            $(this).parents('.col-lg-9').next('.col-lg-9').removeClass('d-none').siblings('.col-lg-9').addClass('d-none');
        });
    }

    slider();

});