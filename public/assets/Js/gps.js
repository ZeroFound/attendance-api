// GPS & Location Functions

let currentLatitude = null;
let currentLongitude = null;

function getGPSLocation() {
    if (!navigator.geolocation) {
        showAlert('attendanceAlert', 'Browser tidak support GPS', 'danger');
        return;
    }

    showAlert('attendanceAlert', 'Mendapatkan lokasi GPS...', 'info');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            document.getElementById('gpsLocation').value = 'Lokasi berhasil didapatkan';
            document.getElementById('coordinates').textContent =
                `${currentLatitude.toFixed(6)}, ${currentLongitude.toFixed(6)}`;

            showAlert('attendanceAlert', 'Lokasi GPS berhasil didapatkan!', 'success');
        },
        (error) => {
            let message = 'Gagal mendapatkan lokasi GPS';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Akses lokasi ditolak. Izinkan akses lokasi di browser.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Informasi lokasi tidak tersedia.';
                    break;
                case error.TIMEOUT:
                    message = 'Request timeout. Coba lagi.';
                    break;
            }
            showAlert('attendanceAlert', message, 'danger');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Browser tidak support GPS');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            document.getElementById('classLatitude').value = position.coords.latitude;
            document.getElementById('classLongitude').value = position.coords.longitude;
            alert('Lokasi berhasil didapatkan!');
        },
        (error) => {
            alert('Gagal mendapatkan lokasi: ' + error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Auto-get GPS when dashboard loads
function autoGetGPS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;

                const coordsEl = document.getElementById('coordinates');
                if (coordsEl) {
                    coordsEl.textContent = `${currentLatitude.toFixed(6)}, ${currentLongitude.toFixed(6)}`;
                }
            },
            (error) => {
                console.log('GPS not available:', error);
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 60000
            }
        );
    }
}
