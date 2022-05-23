$(document).ready(function(){
    $('select').change(function(event){
        $('#total').css({'display':'none'})
        $('#ctg').css({'display':'none'})
        $('#jp').css({'display':'none'})
        $('#layanan').css({'display':'none'})
        id = $('select').val();
        $.getJSON('user-req', function(data) {
            let layanan = data
            let count = 0
            let id_category = ''
            let idJenisLayanan = ''
            let countDone = 0
            let countUnverified = 0
            let countVerified = 0
            $.each(layanan, function(i, data) {
                if(data.id_layanan == id) {
                    count++;
                    id_category = data.id_kategori
                    idJenisLayanan = data.id_jenis_layanan
                    if(data.status == 'Done') {
                        countDone++;
                    }
                    if(data.status == 'unverified') {
                        countUnverified++;
                    }
                    if(data.status == 'On Progress') {
                        countVerified++;
                    }
                }
            })
            Highcharts.chart('chartUser', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Grafik Pengaduan dan Layanan Informasi'
                },
                subtitle: {
                    text: 'Source: Kantor Imigrasi Non TPI Kelas I Bogor'
                },
                xAxis: {
                    categories: [
                        
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Jumlah Laporan dan Pengaduan (Orang)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.f} Orang</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.1,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Un Verified',
                    data: [countUnverified]
          
                }, {
                    name: 'On Progres',
                    data: [countVerified]
          
                }, {
                    name: 'Done',
                    data: [countDone]
          
                }]
              });


            $.getJSON('kategori', function(data) {
                let kategori = data;
                let chose = '';
                $.each(kategori, function(j, data) {
                    if(data.id_kategori == id_category) {
                        chose = data.Nama_Kategori;
                    }
                })
                $('#show-category').html('<input type="text" class="form-control mt-2" value="'+ chose +'" disabled>');
            })
            $.getJSON('jenis-layanan', function(data) {
                let jenisLayanan = data
                let namaJenisPelayanan = ''
                $.each(jenisLayanan, function(l, data) {
                    if(data.Id_JenisPelayanan == idJenisLayanan) {
                        namaJenisPelayanan = data.Nama_Pelayanan;
                    }
                })
                $('#show-jenis').html('<input type="text" class="form-control mt-2" value="'+ namaJenisPelayanan +'" disabled>');
            })
            $.getJSON('layanan', function(data) {
                let layanan = data
                let namaLayanan
                $.each(layanan, function(o, data) {
                    if(data.Id_Layanan == id) {
                        namaLayanan = data.Nama_Layanan
                    }
                })
                $('#show-layanan').html('<input type="text" class="form-control mt-2" value="'+ namaLayanan +'" disabled>');
            })
            $('#show-total').html('<input type="text" class="form-control mt-2" value="'+ count +' Request" disabled>');
        })
    });
});