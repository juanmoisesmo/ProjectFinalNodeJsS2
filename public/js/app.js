//Inicializador del elemento Slider

$('select').material_select();

$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
})

function setSearch() {
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
        if (this.customSearch == false) {

            this.customSearch = true
            $('#hidActive').val('0')
            $('#ciudad').val('0')
            $('#tipo').val('0')

            var slider = $("#rangoPrecio").data("ionRangeSlider");
            slider.reset();

            $('select').material_select()

        } else {
            this.customSearch = false
            $('#hidActive').val('1')
        }
        $('#personalizada').toggleClass('invisible')
    })
}

setSearch()