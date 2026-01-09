// GPS & Location Functions

let currentLatitude = null;
let currentLongitude = null;

console.log('📍 GPS Module loaded');

// Get Real GPS Location
function getGPSLocation() {
    if (!navigator.geolocation) {
        showAlert('attendanceAlert', '❌ Browser tidak mendukung GPS', 'danger');
        return;
    }

    showAlert('attendanceAlert', '🔄 Mendapatkan lokasi GPS...', 'info');

    const gpsBtn = document.querySelector('[onclick="getGPSLocation()"]');
    if (gpsBtn) {
        gpsBtn.disabled = true;
        gpsBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            const gpsInput = document.getElementById('gpsLocation');
            const coordsSpan = document.getElementById('coordinates');

            if (gpsInput) {
                gpsInput.value = '✓ Lokasi GPS berhasil didapatkan';
            }

            if (coordsSpan) {
                coordsSpan.textContent = `${currentLatitude.toFixed(6)}, ${currentLongitude.toFixed(6)}`;
            }

            showAlert('attendanceAlert', '✅ Lokasi GPS berhasil didapatkan!', 'success');

            console.log('📍 GPS Location:', { latitude: currentLatitude, longitude: currentLongitude });

            if (gpsBtn) {
                gpsBtn.disabled = false;
                gpsBtn.innerHTML = '<i class="bi bi-crosshair"></i>';
            }
        },
        (error) => {
            let message = 'Gagal mendapatkan lokasi GPS';

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = '❌ Akses lokasi ditolak. Izinkan akses lokasi di browser Anda.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = '❌ Informasi lokasi tidak tersedia.';
                    break;
                case error.TIMEOUT:
                    message = '⏱️ Request timeout. Silakan coba lagi.';
                    break;
                default:
                    message = '❌ Error tidak diketahui: ' + error.message;
            }

            showAlert('attendanceAlert', message, 'danger');
            console.error('GPS Error:', error);

            if (gpsBtn) {
                gpsBtn.disabled = false;
                gpsBtn.innerHTML = '<i class="bi bi-crosshair"></i>';
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Use Test GPS (Universitas Bumigora Coordinates)
function useTestGPS() {
    // Koordinat Universitas Bumigora, Mataram, NTB
    currentLatitude = -8.583069;
    currentLongitude = 116.116600;

    const gpsInput = document.getElementById('gpsLocation');
    const coordsSpan = document.getElementById('coordinates');

    if (gpsInput) {
        gpsInput.value = '✓ Test GPS (Universitas Bumigora)';
    }

    if (coordsSpan) {
        coordsSpan.textContent = `${currentLatitude}, ${currentLongitude}`;
    }

    showAlert('attendanceAlert', '✅ Test GPS berhasil diset! (Bumigora)', 'success');

    console.log('🧪 Test GPS Location:', { latitude: currentLatitude, longitude: currentLongitude });
}

// Get Current Location for Class Form
function getCurrentLocationForClass() {
    if (!navigator.geolocation) {
        alert('Browser tidak mendukung GPS');
        return;
    }

    const latInput = document.getElementById('classLatitude');
    const lngInput = document.getElementById('classLongitude');

    if (latInput) latInput.value = 'Loading...';
    if (lngInput) lngInput.value = 'Loading...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            if (latInput) latInput.value = position.coords.latitude;
            if (lngInput) lngInput.value = position.coords.longitude;
            alert('✅ Lokasi berhasil didapatkan!');
        },
        (error) => {
            if (latInput) latInput.value = '';
            if (lngInput) lngInput.value = '';
            alert('❌ Gagal mendapatkan lokasi: ' + error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Use Bumigora Location for Class Form
function useBumigoraLocation() {
    const latInput = document.getElementById('classLatitude');
    const lngInput = document.getElementById('classLongitude');

    if (latInput) latInput.value = -8.583069;
    if (lngInput) lngInput.value = 116.116600;

    alert('✅ Lokasi Bumigora berhasil diset!');
}

// Auto-get GPS when dashboard loads
function autoGetGPS() {
    if (!navigator.geolocation) {
        console.log('⚠️ Browser tidak mendukung GPS');
        return;
    }

    console.log('🔄 Auto-detecting GPS...');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            const coordsEl = document.getElementById('coordinates');
            if (coordsEl) {
                coordsEl.textContent = `${currentLatitude.toFixed(6)}, ${currentLongitude.toFixed(6)}`;
            }

            const gpsLocEl = document.getElementById('gpsLocation');
            if (gpsLocEl) {
                gpsLocEl.value = '✓ Lokasi otomatis terdeteksi';
            }

            console.log('✅ GPS Auto-detected:', { latitude: currentLatitude, longitude: currentLongitude });
        },
        (error) => {
            console.log('⚠️ GPS auto-detect failed:', error.message);
        },
        {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 60000
        }
    );
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
}

console.log('✅ GPS Module initialized');
