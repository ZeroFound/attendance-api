// Main Application Functions

let currentUser = null;
let allCourses = [];
let allClasses = [];
let enrolledClasses = [];

// Initialize App
async function initApp() {
    try {
        const response = await API.getProfile();

        if (response.status === 'success') {
            currentUser = response.data;
            setUser(currentUser);

            // Hide login, show main app
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('registerPage').style.display = 'none';
            document.getElementById('navbar').style.display = 'block';

            // Update navbar
            document.getElementById('userName').textContent = currentUser.name;

            // Setup navigation based on role
            setupNavigation();

            // Show dashboard
            showDashboard();
        } else {
            // Token invalid, logout
            removeToken();
            window.location.reload();
        }
    } catch (error) {
        console.error('Init error:', error);
        removeToken();
        window.location.reload();
    }
}

function setupNavigation() {
    const role = currentUser.role;

    // Hide all nav items first
    document.getElementById('nav-courses').style.display = 'none';
    document.getElementById('nav-classes').style.display = 'none';
    document.getElementById('nav-attendance').style.display = 'none';

    if (role === 'admin' || role === 'dosen') {
        document.getElementById('nav-courses').style.display = 'block';
        document.getElementById('nav-classes').style.display = 'block';
    }

    if (role === 'mahasiswa') {
        document.getElementById('nav-attendance').style.display = 'block';
    }
}

// Page Navigation
function hideAllPages() {
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('coursesPage').style.display = 'none';
    document.getElementById('classesPage').style.display = 'none';
    document.getElementById('attendancePage').style.display = 'none';
    document.getElementById('profilePage').style.display = 'none';
}

async function showDashboard() {
    hideAllPages();
    document.getElementById('dashboardPage').style.display = 'block';

    // Update user info
    document.getElementById('dashUserName').textContent = currentUser.name;
    document.getElementById('dashUserRole').textContent =
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    if (currentUser.role === 'mahasiswa') {
        document.getElementById('mahasiswaDashboard').style.display = 'block';
        document.getElementById('dosenDashboard').style.display = 'none';
        await loadMahasiswaDashboard();
    } else {
        document.getElementById('mahasiswaDashboard').style.display = 'none';
        document.getElementById('dosenDashboard').style.display = 'block';
        await loadDosenDashboard();
    }
}

async function loadMahasiswaDashboard() {
    // Load statistics
    try {
        const stats = await API.getStats();
        if (stats.status === 'success') {
            document.getElementById('totalAttendance').textContent = stats.data.total;
            document.getElementById('hadirCount').textContent = stats.data.hadir;
            document.getElementById('izinSakitCount').textContent =
                stats.data.izin + stats.data.sakit;
            document.getElementById('alphaCount').textContent = stats.data.alpha;
        }
    } catch (error) {
        console.error('Load stats error:', error);
    }

    // Load enrolled classes
    try {
        const classes = await API.getClasses();
        if (classes.status === 'success') {
            enrolledClasses = classes.data;

            const select = document.getElementById('classSelect');
            select.innerHTML = '<option value="">Pilih Kelas</option>';

            enrolledClasses.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls.id;
                option.textContent = `${cls.course.course_name} - ${cls.schedule}`;
                option.dataset.lat = cls.latitude;
                option.dataset.lng = cls.longitude;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Load classes error:', error);
    }

    // Load recent attendance
    try {
        const history = await API.getHistory();
        if (history.status === 'success') {
            const recentDiv = document.getElementById('recentAttendance');
            recentDiv.innerHTML = '';

            const recent = history.data.slice(0, 5);

            if (recent.length === 0) {
                recentDiv.innerHTML = '<p class="text-muted">Belum ada riwayat absensi</p>';
            } else {
                recent.forEach(att => {
                    const item = document.createElement('div');
                    item.className = 'list-group-item';

                    const statusBadge = getStatusBadge(att.status);
                    const courseName = att.class?.course?.course_name || 'N/A';
                    const date = new Date(att.date).toLocaleDateString('id-ID');
                    const checkIn = att.check_in_time
                        ? new Date(att.check_in_time).toLocaleTimeString('id-ID',
                            {hour: '2-digit', minute: '2-digit'})
                        : '-';

                    item.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1">${courseName}</h6>
                                <small class="text-muted">${date} - ${checkIn}</small>
                            </div>
                            <span class="badge ${statusBadge.class}">${statusBadge.text}</span>
                        </div>
                    `;
                    recentDiv.appendChild(item);
                });
            }
        }
    } catch (error) {
        console.error('Load history error:', error);
    }

    // Auto-get GPS
    autoGetGPS();
}

async function loadDosenDashboard() {
    // Load statistics
    try {
        const [coursesRes, classesRes] = await Promise.all([
            API.getCourses(),
            API.getClasses()
        ]);

        if (coursesRes.status === 'success') {
            document.getElementById('totalCourses').textContent = coursesRes.data.length;
        }

        if (classesRes.status === 'success') {
            allClasses = classesRes.data;
            document.getElementById('totalClasses').textContent = allClasses.length;

            // Count total students enrolled
            let totalStudents = 0;
            for (const cls of allClasses) {
                try {
                    const students = await API.getClassStudents(cls.id);
                    if (students.status === 'success') {
                        totalStudents += students.data.length;
                    }
                } catch (error) {
                    console.error('Load students error:', error);
                }
            }
            document.getElementById('totalStudents').textContent = totalStudents;

            // Populate today class select
            const select = document.getElementById('todayClassSelect');
            select.innerHTML = '<option value="">Pilih Kelas</option>';

            allClasses.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls.id;
                option.textContent = `${cls.course.course_name} - ${cls.schedule}`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Load dosen dashboard error:', error);
    }
}

async function loadTodayAttendance() {
    const classId = document.getElementById('todayClassSelect').value;
    const listDiv = document.getElementById('todayAttendanceList');

    if (!classId) {
        listDiv.innerHTML = '<p class="text-muted">Pilih kelas untuk melihat absensi</p>';
        return;
    }

    listDiv.innerHTML = '<p class="text-muted">Loading...</p>';

    try {
        const response = await API.getTodayAttendance(classId);

        if (response.status === 'success') {
            const students = response.data;

            if (students.length === 0) {
                listDiv.innerHTML = '<p class="text-muted">Tidak ada mahasiswa terdaftar</p>';
                return;
            }

            let html = '<div class="table-responsive"><table class="table table-hover">';
            html += '<thead><tr><th>NPM</th><th>Nama</th><th>Status</th><th>Check-in</th></tr></thead><tbody>';

            students.forEach(student => {
                const status = student.status || 'Belum Absen';
                const statusBadge = getStatusBadge(status);
                const checkIn = student.check_in_time
                    ? new Date(student.check_in_time).toLocaleTimeString('id-ID',
                        {hour: '2-digit', minute: '2-digit'})
                    : '-';

                html += `
                    <tr>
                        <td>${student.npm || '-'}</td>
                        <td>${student.name}</td>
                        <td><span class="badge ${statusBadge.class}">${statusBadge.text}</span></td>
                        <td>${checkIn}</td>
                    </tr>
                `;
            });

            html += '</tbody></table></div>';
            listDiv.innerHTML = html;
        }
    } catch (error) {
        listDiv.innerHTML = '<p class="text-danger">Error loading data</p>';
        console.error('Load today attendance error:', error);
    }
}

// Check-in/Check-out Functions
async function checkIn() {
    const classId = document.getElementById('classSelect').value;

    if (!classId) {
        showAlert('attendanceAlert', 'Pilih kelas terlebih dahulu', 'warning');
        return;
    }

    if (!currentLatitude || !currentLongitude) {
        showAlert('attendanceAlert', 'Dapatkan lokasi GPS terlebih dahulu', 'warning');
        return;
    }

    const btn = document.getElementById('checkInBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';

    try {
        const response = await API.checkIn(classId, currentLatitude, currentLongitude);

        if (response.status === 'success') {
            showAlert('attendanceAlert', response.message, 'success');

            // Enable check-out button
            document.getElementById('checkOutBtn').disabled = false;

            // Reload dashboard data
            setTimeout(() => {
                loadMahasiswaDashboard();
            }, 2000);
        } else {
            showAlert('attendanceAlert', response.message, 'danger');
            btn.disabled = false;
        }
    } catch (error) {
        showAlert('attendanceAlert', 'Terjadi kesalahan: ' + error.message, 'danger');
        btn.disabled = false;
    } finally {
        btn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Check-in';
    }
}

async function checkOut() {
    const classId = document.getElementById('classSelect').value;

    if (!classId) {
        showAlert('attendanceAlert', 'Pilih kelas terlebih dahulu', 'warning');
        return;
    }

    if (!currentLatitude || !currentLongitude) {
        showAlert('attendanceAlert', 'Dapatkan lokasi GPS terlebih dahulu', 'warning');
        return;
    }

    const btn = document.getElementById('checkOutBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';

    try {
        const response = await API.checkOut(classId, currentLatitude, currentLongitude);

        if (response.status === 'success') {
            showAlert('attendanceAlert', response.message, 'success');

            // Reload dashboard data
            setTimeout(() => {
                loadMahasiswaDashboard();
                document.getElementById('checkInBtn').disabled = false;
                document.getElementById('checkOutBtn').disabled = true;
            }, 2000);
        } else {
            showAlert('attendanceAlert', response.message, 'danger');
            btn.disabled = false;
        }
    } catch (error) {
        showAlert('attendanceAlert', 'Terjadi kesalahan: ' + error.message, 'danger');
        btn.disabled = false;
    } finally {
        btn.innerHTML = '<i class="bi bi-box-arrow-right"></i> Check-out';
    }
}

// Courses Page
async function showCourses() {
    hideAllPages();
    document.getElementById('coursesPage').style.display = 'block';
    await loadCourses();
}

async function loadCourses() {
    const tbody = document.getElementById('coursesTableBody');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Loading...</td></tr>';

    try {
        const response = await API.getCourses();

        if (response.status === 'success') {
            allCourses = response.data;

            if (allCourses.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Belum ada data</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            allCourses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.course_code}</td>
                    <td>${course.course_name}</td>
                    <td>${course.credits} SKS</td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-warning" onclick="editCourse(${course.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger" onclick="deleteCourse(${course.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error loading data</td></tr>';
        console.error('Load courses error:', error);
    }
}

function resetCourseForm() {
    document.getElementById('courseId').value = '';
    document.getElementById('courseCode').value = '';
    document.getElementById('courseName').value = '';
    document.getElementById('courseCredits').value = '';
    document.getElementById('courseModalLabel').textContent = 'Tambah Mata Kuliah';
}

function editCourse(id) {
    const course = allCourses.find(c => c.id === id);
    if (!course) return;

    document.getElementById('courseId').value = course.id;
    document.getElementById('courseCode').value = course.course_code;
    document.getElementById('courseName').value = course.course_name;
    document.getElementById('courseCredits').value = course.credits;
    document.getElementById('courseModalLabel').textContent = 'Edit Mata Kuliah';

    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
}

async function deleteCourse(id) {
    if (!confirm('Yakin ingin menghapus mata kuliah ini?')) return;

    try {
        const response = await API.deleteCourse(id);

        if (response.status === 'success') {
            alert('Mata kuliah berhasil dihapus');
            loadCourses();
        } else {
            alert(response.message || 'Gagal menghapus mata kuliah');
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}

// Course Form Submit
document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
        courseForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const id = document.getElementById('courseId').value;
            const data = {
                course_code: document.getElementById('courseCode').value,
                course_name: document.getElementById('courseName').value,
                credits: parseInt(document.getElementById('courseCredits').value)
            };

            try {
                let response;
                if (id) {
                    response = await API.updateCourse(id, data);
                } else {
                    response = await API.createCourse(data);
                }

                if (response.status === 'success') {
                    alert(response.message || 'Berhasil menyimpan mata kuliah');
                    bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
                    loadCourses();
                } else {
                    const errorMsg = response.errors
                        ? Object.values(response.errors).flat().join(', ')
                        : response.message;
                    alert(errorMsg);
                }
            } catch (error) {
                alert('Terjadi kesalahan: ' + error.message);
            }
        });
    }
});

// Classes Page
async function showClasses() {
    hideAllPages();
    document.getElementById('classesPage').style.display = 'block';
    await loadClasses();
}

async function loadClasses() {
    const tbody = document.getElementById('classesTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Loading...</td></tr>';

    try {
        const response = await API.getClasses();

        if (response.status === 'success') {
            allClasses = response.data;

            if (allClasses.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Belum ada data</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            allClasses.forEach(cls => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cls.course?.course_name || 'N/A'}</td>
                    <td>${cls.lecturer?.name || 'N/A'}</td>
                    <td>${cls.schedule}</td>
                    <td>${cls.location}</td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-info" onclick="viewClassStudents(${cls.id})">
                                <i class="bi bi-people"></i>
                            </button>
                            <button class="btn btn-success" onclick="showEnrollModal(${cls.id})">
                                <i class="bi bi-person-plus"></i>
                            </button>
                            <button class="btn btn-primary" onclick="viewClassAttendance(${cls.id})">
                                <i class="bi bi-clipboard-check"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
        console.error('Load classes error:', error);
    }
}

function resetClassForm() {
    document.getElementById('classCourse').innerHTML = '<option value="">Loading...</option>';
    document.getElementById('classLecturer').innerHTML = '<option value="">Loading...</option>';
    document.getElementById('classSchedule').value = '';
    document.getElementById('classLocation').value = '';
    document.getElementById('classLatitude').value = '';
    document.getElementById('classLongitude').value = '';

    // Load courses and lecturers
    API.getCourses().then(res => {
        if (res.status === 'success') {
            const select = document.getElementById('classCourse');
            select.innerHTML = '<option value="">Pilih Mata Kuliah</option>';
            res.data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = `${course.course_code} - ${course.course_name}`;
                select.appendChild(option);
            });
        }
    });

    // For simplicity, you need to create an endpoint to get lecturers
    // Or filter from users with role 'dosen'
    // Here we just put placeholder
    const lecturerSelect = document.getElementById('classLecturer');
    lecturerSelect.innerHTML = '<option value="">Pilih Dosen</option>';
    // You should load actual lecturers from API
    // For demo, use current user if dosen
    if (currentUser.role === 'dosen' || currentUser.role === 'admin') {
        const option = document.createElement('option');
        option.value = currentUser.id;
        option.textContent = currentUser.name;
        option.selected = true;
        lecturerSelect.appendChild(option);
    }
}

// Class Form Submit
document.addEventListener('DOMContentLoaded', function() {
    const classForm = document.getElementById('classForm');
    if (classForm) {
        classForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const data = {
                course_id: parseInt(document.getElementById('classCourse').value),
                lecturer_id: parseInt(document.getElementById('classLecturer').value),
                schedule: document.getElementById('classSchedule').value,
                location: document.getElementById('classLocation').value,
                latitude: parseFloat(document.getElementById('classLatitude').value),
                longitude: parseFloat(document.getElementById('classLongitude').value)
            };

            try {
                const response = await API.createClass(data);

                if (response.status === 'success') {
                    alert(response.message || 'Berhasil membuat kelas');
                    bootstrap.Modal.getInstance(document.getElementById('classModal')).hide();
                    loadClasses();
                } else {
                    const errorMsg = response.errors
                        ? Object.values(response.errors).flat().join(', ')
                        : response.message;
                    alert(errorMsg);
                }
            } catch (error) {
                alert('Terjadi kesalahan: ' + error.message);
            }
        });
    }
});

async function viewClassStudents(classId) {
    try {
        const response = await API.getClassStudents(classId);

        if (response.status === 'success') {
            const students = response.data;
            const classInfo = response.class;

            let html = `<h5>${classInfo.course.course_name}</h5>`;
            html += `<p class="text-muted">${classInfo.schedule} - ${classInfo.location}</p>`;
            html += '<hr><h6>Daftar Mahasiswa:</h6>';

            if (students.length === 0) {
                html += '<p class="text-muted">Belum ada mahasiswa terdaftar</p>';
            } else {
                html += '<ul class="list-group">';
                students.forEach(student => {
                    html += `
                        <li class="list-group-item">
                            <strong>${student.name}</strong> (${student.npm})
                            <br><small class="text-muted">${student.email}</small>
                        </li>
                    `;
                });
                html += '</ul>';
            }

            // Show in modal or alert
            alert(html.replace(/<[^>]*>/g, '\n'));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function showEnrollModal(classId) {
    const npm = prompt('Masukkan NPM Mahasiswa untuk didaftarkan:');
    if (!npm) return;

    // Note: You need to create endpoint to search student by NPM
    // For now, prompt for student ID
    const studentId = prompt('Masukkan Student ID:');
    if (!studentId) return;

    enrollStudentToClass(classId, parseInt(studentId));
}

async function enrollStudentToClass(classId, studentId) {
    try {
        const response = await API.enrollStudent(classId, studentId);

        if (response.status === 'success') {
            alert(response.message || 'Mahasiswa berhasil didaftarkan');
        } else {
            alert(response.message || 'Gagal mendaftarkan mahasiswa');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function viewClassAttendance(classId) {
    try {
        const response = await API.getClassAttendance(classId);

        if (response.status === 'success') {
            const attendances = response.data;
            const classInfo = response.class;

            console.log('Attendance data:', attendances);
            alert(`Total absensi: ${attendances.length} records`);
            // You can create a modal to show detailed attendance
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Attendance Page (Mahasiswa)
async function showAttendance() {
    hideAllPages();
    document.getElementById('attendancePage').style.display = 'block';
    await loadAttendanceHistory();
}

async function loadAttendanceHistory() {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Loading...</td></tr>';

    try {
        const response = await API.getHistory();

        if (response.status === 'success') {
            const history = response.data;

            if (history.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Belum ada riwayat absensi</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            history.forEach(att => {
                const row = document.createElement('tr');
                const statusBadge = getStatusBadge(att.status);
                const courseName = att.class?.course?.course_name || 'N/A';
                const date = new Date(att.date).toLocaleDateString('id-ID');
                const checkIn = att.check_in_time
                    ? new Date(att.check_in_time).toLocaleTimeString('id-ID',
                        {hour: '2-digit', minute: '2-digit'})
                    : '-';
                const checkOut = att.check_out_time
                    ? new Date(att.check_out_time).toLocaleTimeString('id-ID',
                        {hour: '2-digit', minute: '2-digit'})
                    : '-';

                row.innerHTML = `
                    <td>${date}</td>
                    <td>${courseName}</td>
                    <td>${checkIn}</td>
                    <td>${checkOut}</td>
                    <td><span class="badge ${statusBadge.class}">${statusBadge.text}</span></td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
        console.error('Load attendance history error:', error);
    }
}

// Profile Page
async function showProfile() {
    hideAllPages();
    document.getElementById('profilePage').style.display = 'block';

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent =
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    if (currentUser.npm) {
        document.getElementById('profileNPMRow').style.display = 'table-row';
        document.getElementById('profileNPM').textContent = currentUser.npm;
    }
}

// Helper Functions
function showAlert(elementId, message, type) {
    const alert = document.getElementById(elementId);
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    alert.style.display = 'block';

    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

function getStatusBadge(status) {
    const badges = {
        'hadir': { text: 'Hadir', class: 'bg-success' },
        'izin': { text: 'Izin', class: 'bg-warning text-dark' },
        'sakit': { text: 'Sakit', class: 'bg-info' },
        'alpha': { text: 'Alpha', class: 'bg-danger' },
        'Belum Absen': { text: 'Belum Absen', class: 'bg-secondary' }
    };

    return badges[status] || { text: status, class: 'bg-secondary' };
}
