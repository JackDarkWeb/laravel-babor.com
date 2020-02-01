$(function () {

    const paginateActive = () => {
        let uri = window.location.href;
        let detach = uri.split('page=');
        const i = detach[1]*2;
        $("li:nth-child("+i+")").addClass('active');
    };

    paginateActive();
});