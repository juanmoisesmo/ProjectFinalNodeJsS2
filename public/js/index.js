class buscador {

    constructor() {
        this.searchAll();
    }

    searchAll() {
        $('#buscar').click(() => {

            $("#dvListaBusqueda").show();
            $('#dvListaBusqueda').html('');

            var ciudadvalue = $('#ciudad').val() !== "0" ? $("#ciudad").val() : "";
            var tipovalue = $('#tipo').val() !== "0" ? $("#tipo").val() : "";

            var ciudad = ciudadvalue == "" ? "" : $('#ciudad option:selected').text()
            var tipo = tipovalue == "" ? "" : $('#tipo option:selected').text()
            var activo = $('#hidActive').val() == "1" ? "1" : "0"

            var slider = $("#rangoPrecio").data("ionRangeSlider")
            var desde = slider.result.from;
            var hasta = slider.result.to;

            var JSONfiltres = {
                "ciudad": ciudad,
                "tipo": tipo,
                "desde": desde,
                "hasta": hasta,
                "all": activo
            };

            var parfiltro = JSON.stringify(JSONfiltres);

            $.ajax({
                url: 'http://localhost:8086/api/search/?filtros=' + parfiltro,
                type: 'GET',
                dataType: 'JSON',
                success: function(data) {
                    for (var i = 0; i < data.length; i++) {

                        var direccion = data[i].Direccion;
                        var ciudad = data[i].Ciudad;
                        var telefono = data[i].Telefono;
                        var postal = data[i].Codigo_Postal;
                        var tipo = data[i].Tipo;
                        var precio = data[i].Precio;

                        $('#dvListaBusqueda').append(
                            `
                        <div class="card horizontal">
                        <div class="card-image">
                            <img src="img/home.jpg">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <div>
                                    <b>Direccion: </b>
                                    <p>${direccion}</p>
                                </div>
                                <div>
                                    <b>Ciudad: </b>
                                    <p>${ciudad}</p>
                                </div>
                                <div>
                                    <b>Telefono: </b>
                                    <p>${telefono}</p>
                                </div>
                                <div>
                                    <b>Código postal: </b>
                                    <p>${postal}</p>
                                </div>
                                <div>
                                    <b>Precio: </b>
                                    <p>${precio}</p>
                                </div>
                                <div>
                                    <b>Tipo: </b>
                                    <p>${tipo}</p>
                                </div>
                            </div>
                            <div class="card-action right-align">
                                <a href="#">Ver más</a>
                            </div>
                        </div>
                    </div>
                        `);

                    }
                },
                error: function(data) {
                    alert("error");
                }
            });


        })
    }
}

var init = new buscador();