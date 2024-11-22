const perangkatList = [];
        const saranWattPerangkat = {
            "Lampu": "8, 13, 18, 20, 24, 45 watt",
            "Kulkas": "100-250 watt",
            "AC": "660-800 watt",
            "Dispenser": "150-500 watt",
            "Mesin Cuci": "90-230 watt",
            "Setrika": "300 watt",
            "Rice Cooker": "100-400 watt",
            "Charger": "10, 33, 67, 120 watt"
        };

        function tampilkanSaranWatt() {
            const perangkat = document.getElementById('perangkat').value;
            const saran = saranWattPerangkat[perangkat];
            document.getElementById('saranWatt').textContent = `Watt umum untuk perangkat ini: ${saran}`;
        }

        function tambahPerangkat() {
            const jenis = document.getElementById('perangkat').value;
            const daya = parseFloat(document.getElementById('daya').value) || 0;
            const jumlah = parseInt(document.getElementById('jumlah').value) || 0;
            const durasi = parseFloat(document.getElementById('durasi').value) || 0;

            if (daya > 0 && jumlah > 0 && durasi > 0) {
                perangkatList.push({ jenis, daya, jumlah, durasi });

                const deviceListDiv = document.getElementById('deviceList');
                const deviceItem = document.createElement('div');
                deviceItem.className = 'device-item';
                deviceItem.innerHTML = `
                    <strong>${jenis}</strong><br>
                    Daya: ${daya} watt<br>
                    Jumlah: ${jumlah}<br>
                    Durasi: ${durasi} jam/hari
                `;
                deviceListDiv.appendChild(deviceItem);

                document.getElementById('daya').value = '';
                document.getElementById('jumlah').value = '';
                document.getElementById('durasi').value = '';
            } else {
                alert('Harap masukkan semua data dengan benar.');
            }
        }

        function hitungEnergi() {
            const tarifListrik = parseFloat(document.getElementById('dayaRumah').value);
            let totalEnergi = 0;

            perangkatList.forEach(perangkat => {
                const energiPerangkat = perangkat.daya * perangkat.jumlah * perangkat.durasi * 30 / 1000; // kWh
                totalEnergi += energiPerangkat;
            });

            const biayaEnergi = totalEnergi * tarifListrik;

            document.getElementById('result').innerHTML = `
                <p><strong>Total Konsumsi Energi:</strong> ${totalEnergi.toFixed(2)} kWh per bulan</p>
                <p><strong>Total Biaya Energi:</strong> Rp. ${biayaEnergi.toFixed(2)}</p>
            `;
        }