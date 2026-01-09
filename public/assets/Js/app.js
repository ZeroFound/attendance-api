// Main Application Functions

console.log('⚙️ App Module loading...');

let currentUser = null;
let allCourses = [];
let allClasses = [];

// Initialize App
async function initApp() {
    console.log('🚀 Initializing app...');

    try {
        const response = await API.getProfile();

        if (response.status === 'success') {
            currentUser = response.data;
            setUser(currentUser);

            console.log('👤 Current user:', currentUser.name, '(' + currentUser.role + ')');

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

            console.log('✅ App initialized successfully');
        } else {
            console.log('❌ Invalid token, logging out...');
            removeToken();
            window.location.reload();
        }
    } catch (error) {
        console.error('Init error:', error);
        removeToken();
        window.location.reload();
    }
}

// Setup Navigation based on role
function setupNavigation() {
    const role = currentUser.role;

    console.log('🔧 Setting up navigation for role:', role);

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

// Show Dashboard
async function showDashboard() {
    console.log('📊 Loading dashboard...');

    hideAllPages();
    document.getElementById('dashboardPage').style.display = 'block';

    // Update user info
    document.getElementById('dashUserName').textContent = currentUser.name;
    document.getElementById('dashUserRole').textContent = currentUser.role.toUpperCase();

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

// Load Mahasiswa Dashboard
async function loadMahasiswaDashboard() {
    console.log('📚 Loading mahasiswa dashboard...');

    // Load statistics
    try {
        const stats = await API.getStats();
        if (stats.status === 'success') {
            document.getElementById('totalAttendance').textContent = stats.data.total;
            document.getElementById('hadirCount').textContent = stats.data.hadir;
            document.getElementById('izinSakitCount').textContent = stats.data.izin + stats.data.sakit;
            document.getElementById('alphaCount').textContent = stats.data.alpha;

            console.log('✅ Stats loaded:', stats.data);
        }
    } catch (error) {
        console.error('Load stats error:', error);
    }

    // Load enrolled classes
    try {
        const classes = await API.getClasses();
        if (classes.status === 'success') {
            const select = document.getElementById('classSelect');
            select.innerHTML = '<option value="">Pilih Kelas</option>';

            if (classes.data.length === 0) {
                select.innerHTML = '<option value="">Belum ada kelas terdaftar</option>';
            } else {
                classes.data.forEach(cls => {
                    const option = document.createElement('option');
                    option.value = cls.id;
                    option.textContent = `${cls.course.course_name} - ${cls.schedule}`;
                    select.appendChild(option);
                });
            }

            console.log('✅ Classes loaded:', classes.data.length);
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
                recentDiv.innerHTML = '<p class="text-muted text-center">Belum ada riwayat absensi</p>';
            } else {
                recent.forEach(att => {
                    const item = document.createElement('div');
                    item.className = 'list-group-item';

                    const statusClass = att.status === 'hadir' ? 'success' :
                                       att.status === 'izin' ? 'warning' :
                                       att.status === 'sakit' ? 'info' : 'danger';

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
                                <small class="text-muted">
                                    <i class="bi bi-calendar"></i> ${date} &nbsp;
                                    <i class="bi bi-clock"></i> ${checkIn}
                                </small>
                            </div>
                            <span class="badge bg-${statusClass}">${att.status.toUpperCase()}</span>
                        </div>
                    `;
                    recentDiv.appendChild(item);
                });
            }

            console.log('✅ Recent attendance loaded:', recent.length);
        }
    } catch (error) {
        console.error('Load history error:', error);
    }

    // Auto-get GPS
    autoGetGPS();
}

// Load Dosen Dashboard
async function loadDosenDashboard() {
    console.log('👨‍🏫 Loading dosen dashboard...');

    try {
        const [coursesRes, classesRes] = await Promise.all([
            API.getCourses(),
            API.getClasses()
        ]);

        if (coursesRes.status === 'success') {
            document.getElementById('totalCourses').textContent = coursesRes.data.length;
            console.log('✅ Total courses:', coursesRes.data.length);
        }

        if (classesRes.status === 'success') {
            allClasses = classesRes.data;
            document.getElementById('totalClasses').textContent = allClasses.length;

            // Populate today class select
            const select = document.getElementById('todayClassSelect');
            select.innerHTML = '<option value="">Pilih Kelas</option>';

            allClasses.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls.id;
                option.textContent = `${cls.course.course_name} - ${cls.schedule}`;
                select.appendChild(option);
            });

            // Count total students
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

            console.log('✅ Total students:', totalStudents);
        }
    } catch (error) {
        console.error('Load dosen dashboard error:', error);
    }
}

// Load Today Attendance
async function loadTodayAttendance() {
    const classId = document.getElementById('todayClassSelect').value;
    const listDiv = document.getElementById('todayAttendanceList');

    if (!classId) {
        listDiv.innerHTML = '<p class="text-muted text-center">Pilih kelas untuk melihat absensi</p>';
        return;
    }

    listDiv.innerHTML = '<p class="text-muted text-center"><span class="spinner-border spinner-border-sm"></span> Loading...</p>';

    try {
        const response = await API.getTodayAttendance(classId);

        if (response.status === 'success') {
            const students = response.data;

            if (students.length === 0) {
                listDiv.innerHTML = '<p class="text-muted text-center">Tidak ada mahasiswa terdaftar</p>';
                return;
            }

            let html = '<div class="table-responsive"><table class="table table-hover table-sm">';
            html += '<thead class="table-light"><tr><th>NPM</th><th>Nama</th><th>Status</th><th>Check-in</th></tr></thead><tbody>';

            students.forEach(student => {
                const status = student.status || 'Belum Absen';
                const statusClass = status === 'hadir' ? 'success' :
                                   status === 'Belum Absen' ? 'secondary' : 'warning';
                const checkIn = student.check_in_time
                    ? new Date(student.check_in_time).toLocaleTimeString('id-ID',
                        {hour: '2-digit', minute: '2-digit'})
                    : '-';

                html += `
                    <tr>
                        <td>${student.npm || '-'}</td>
                        <td>${student.name}</td>
                        <td><span class="badge bg-${statusClass}">${status}</span></td>
                        <td>${checkIn}</td>
                    </tr>
                `;
            });

            html += '</tbody></table></div>';
            listDiv.innerHTML = html;

            console.log('✅ Today attendance loaded:', students.length);
        }
    } catch (error) {
        listDiv.innerHTML = '<p class="text-danger text-center">Error loading data</p>';
        console.error('Load today attendance error:', error);
    }
}

// Check-in Function
async function checkIn() {
    const classId = document.getElementById('classSelect').value;

    if (!classId) {
        showAlert('attendanceAlert', '⚠️ Pilih kelas terlebih dahulu', 'warning');
        return;
    }

    if (!currentLatitude || !currentLongitude) {
        showAlert('attendanceAlert', '⚠️ Dapatkan lokasi GPS terlebih dahulu (klik tombol GPS atau Test)', 'warning');
        return;
    }

    const btn = document.getElementById('checkInBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';

    console.log('🔄 Check-in...', { classId, latitude: currentLatitude, longitude: currentLongitude });

    try {
        const response = await API.checkIn(classId, currentLatitude, currentLongitude);

        if (response.status === 'success') {
            showAlert('attendanceAlert', '✅ ' + response.message, 'success');
            document.getElementById('checkOutBtn').disabled = false;

            console.log('✅ Check-in successful');

            setTimeout(() => {
                loadMahasiswaDashboard();
            }, 2000);
        } else {
            showAlert('attendanceAlert', '❌ ' + response.message, 'danger');
            btn.disabled = false;
            console.log('❌ Check-in failed:', response.message);
        }
    } catch (error) {
        showAlert('attendanceAlert', '❌ Terjadi kesalahan: ' + error.message, 'danger');
        btn.disabled = false;
        console.error('Check-in error:', error);
    } finally {
        btn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Check-in';
    }
}

// Check-out Function
async function checkOut() {
    const classId = document.getElementById('classSelect').value;

    if (!classId) {
        showAlert('attendanceAlert', '⚠️ Pilih kelas terlebih dahulu', 'warning');
        return;
    }

    if (!currentLatitude || !currentLongitude) {
        showAlert('attendanceAlert', '⚠️ Dapatkan lokasi GPS terlebih dahulu', 'warning');
        return;
    }

    const btn = document.getElementById('checkOutBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';

    console.log('🔄 Check-out...', { classId, latitude: currentLatitude, longitude: currentLongitude });

    try {
        const response = await API.checkOut(classId, currentLatitude, currentLongitude);

        if (response.status === 'success') {
            showAlert('attendanceAlert', '✅ ' + response.message, 'success');

            console.log('✅ Check-out successful');

            setTimeout(() => {
                loadMahasiswaDashboard();
                document.getElementById('checkInBtn').disabled = false;
                document.getElementById('checkOutBtn').disabled = true;
            }, 2000);
        } else {
            showAlert('attendanceAlert', '❌ ' + response.message, 'danger');
            btn.disabled = false;
            console.log('❌ Check-out failed:', response.message);
        }
    } catch (error) {
        showAlert('attendanceAlert', '❌ Terjadi kesalahan: ' + error.message, 'danger');
        btn.disabled = false;
        console.error('Check-out error:', error);
    } finally {
        btn.innerHTML = '<i class="bi bi-box-arrow-right"></i> Check-out';
    }
}

// Helper: Show Alert
function showAlert(elementId, message, type) {
    const alert = document.getElementById(elementId);
    if (!alert) return;

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

console.log('✅ App Module loaded (Part 1)');

// ==================== COURSES PAGE ====================

async function showCourses() {
    console.log('📚 Loading courses page...');

    hideAllPages();
    document.getElementById('coursesPage').style.display = 'block';
    await loadCourses();
}

async function loadCourses() {
    const tbody = document.getElementById('coursesTableBody');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center"><span class="spinner-border spinner-border-sm"></span> Loading...</td></tr>';

    try {
        const response = await API.getCourses();

        if (response.status === 'success') {
            allCourses = response.data;

            if (allCourses.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Belum ada data mata kuliah</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            allCourses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${course.course_code}</strong></td>
                    <td>${course.course_name}</td>
                    <td><span class="badge bg-primary">${course.credits} SKS</span></td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-warning" onclick="editCourse(${course.id})" title="Edit">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger" onclick="deleteCourse(${course.id})" title="Hapus">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });

            console.log('✅ Courses loaded:', allCourses.length);
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error loading data</td></tr>';
        console.error('Load courses error:', error);
    }
}

function showAddCourseModal() {
    resetCourseForm();
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
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

    console.log('🗑️ Deleting course:', id);

    try {
        const response = await API.deleteCourse(id);

        if (response.status === 'success') {
            alert('✅ Mata kuliah berhasil dihapus');
            loadCourses();
            console.log('✅ Course deleted');
        } else {
            alert('❌ ' + (response.message || 'Gagal menghapus mata kuliah'));
        }
    } catch (error) {
        alert('❌ Terjadi kesalahan: ' + error.message);
        console.error('Delete course error:', error);
    }
}

// Course Form Submit Handler
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

            console.log('💾 Saving course:', data);

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Saving...';

            try {
                let response;
                if (id) {
                    response = await API.updateCourse(id, data);
                } else {
                    response = await API.createCourse(data);
                }

                if (response.status === 'success') {
                    alert('✅ ' + (response.message || 'Berhasil menyimpan mata kuliah'));
                    bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
                    loadCourses();
                    console.log('✅ Course saved');
                } else {
                    const errorMsg = response.errors
                        ? Object.values(response.errors).flat().join(', ')
                        : response.message;
                    alert('❌ ' + errorMsg);
                }
            } catch (error) {
                alert('❌ Terjadi kesalahan: ' + error.message);
                console.error('Save course error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Simpan';
            }
        });
    }
});

// ==================== CLASSES PAGE ====================

async function showClasses() {
    console.log('🚪 Loading classes page...');

    hideAllPages();
    document.getElementById('classesPage').style.display = 'block';
    await loadClasses();
}

async function loadClasses() {
    const tbody = document.getElementById('classesTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center"><span class="spinner-border spinner-border-sm"></span> Loading...</td></tr>';

    try {
        const response = await API.getClasses();

        if (response.status === 'success') {
            allClasses = response.data;

            if (allClasses.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Belum ada data kelas</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            allClasses.forEach(cls => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${cls.course?.course_name || 'N/A'}</strong></td>
                    <td>${cls.lecturer?.name || 'N/A'}</td>
                    <td><small>${cls.schedule}</small></td>
                    <td><small>${cls.location}</small></td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-info" onclick="viewClassStudents(${cls.id})" title="Lihat Mahasiswa">
                                <i class="bi bi-people"></i>
                            </button>
                            <button class="btn btn-success" onclick="showEnrollModal(${cls.id})" title="Daftarkan Mahasiswa">
                                <i class="bi bi-person-plus"></i>
                            </button>
                            <button class="btn btn-primary" onclick="viewClassAttendance(${cls.id})" title="Lihat Absensi">
                                <i class="bi bi-clipboard-check"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });

            console.log('✅ Classes loaded:', allClasses.length);
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
        console.error('Load classes error:', error);
    }
}

async function showAddClassModal() {
    console.log('🔧 Preparing class form...');

    // Load courses for dropdown
    try {
        const coursesRes = await API.getCourses();
        const select = document.getElementById('classCourse');
        select.innerHTML = '<option value="">Pilih Mata Kuliah</option>';

        if (coursesRes.status === 'success') {
            coursesRes.data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = `${course.course_code} - ${course.course_name}`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Load courses for dropdown error:', error);
    }

    // Set lecturer (current user if dosen)
    const lecturerSelect = document.getElementById('classLecturer');
    lecturerSelect.innerHTML = '<option value="">Pilih Dosen</option>';

    if (currentUser.role === 'dosen' || currentUser.role === 'admin') {
        const option = document.createElement('option');
        option.value = currentUser.id;
        option.textContent = currentUser.name;
        option.selected = true;
        lecturerSelect.appendChild(option);
    }

    // Reset form
    document.getElementById('classSchedule').value = '';
    document.getElementById('classLocation').value = '';
    document.getElementById('classLatitude').value = '';
    document.getElementById('classLongitude').value = '';

    const modal = new bootstrap.Modal(document.getElementById('classModal'));
    modal.show();
}

// Class Form Submit Handler
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

            console.log('💾 Saving class:', data);

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Saving...';

            try {
                const response = await API.createClass(data);

                if (response.status === 'success') {
                    alert('✅ ' + (response.message || 'Berhasil membuat kelas'));
                    bootstrap.Modal.getInstance(document.getElementById('classModal')).hide();
                    loadClasses();
                    console.log('✅ Class saved');
                } else {
                    const errorMsg = response.errors
                        ? Object.values(response.errors).flat().join(', ')
                        : response.message;
                    alert('❌ ' + errorMsg);
                }
            } catch (error) {
                alert('❌ Terjadi kesalahan: ' + error.message);
                console.error('Save class error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Simpan';
            }
        });
    }
});

async function viewClassStudents(classId) {
    console.log('👥 Loading students for class:', classId);

    const modal = new bootstrap.Modal(document.getElementById('studentsModal'));
    const content = document.getElementById('studentsModalContent');

    content.innerHTML = '<div class="text-center py-3"><span class="spinner-border"></span></div>';
    modal.show();

    try {
        const response = await API.getClassStudents(classId);

        if (response.status === 'success') {
            const students = response.data;
            const classInfo = response.class;

            let html = `
                <h5>${classInfo.course.course_name}</h5>
                <p class="text-muted">${classInfo.schedule} - ${classInfo.location}</p>
                <hr>
                <h6>Daftar Mahasiswa (${students.length}):</h6>
            `;

            if (students.length === 0) {
                html += '<p class="text-muted text-center">Belum ada mahasiswa terdaftar</p>';
            } else {
                html += '<div class="list-group">';
                students.forEach(student => {
                    html += `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1">${student.name}</h6>
                                    <small class="text-muted">
                                        <i class="bi bi-card-text"></i> ${student.npm || '-'} &nbsp;
                                        <i class="bi bi-envelope"></i> ${student.email}
                                    </small>
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }

            content.innerHTML = html;
            console.log('✅ Students loaded:', students.length);
        }
    } catch (error) {
        content.innerHTML = '<p class="text-danger text-center">Error loading data</p>';
        console.error('Load students error:', error);
    }
}

function showEnrollModal(classId) {
    document.getElementById('enrollClassId').value = classId;
    document.getElementById('enrollStudentId').value = '';

    const modal = new bootstrap.Modal(document.getElementById('enrollModal'));
    modal.show();
}

// Enroll Form Submit Handler
document.addEventListener('DOMContentLoaded', function() {
    const enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        enrollForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const classId = document.getElementById('enrollClassId').value;
            const studentId = document.getElementById('enrollStudentId').value;

            console.log('📝 Enrolling student:', studentId, 'to class:', classId);

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';

            try {
                const response = await API.enrollStudent(classId, parseInt(studentId));

                if (response.status === 'success') {
                    alert('✅ ' + (response.message || 'Mahasiswa berhasil didaftarkan'));
                    bootstrap.Modal.getInstance(document.getElementById('enrollModal')).hide();
                    console.log('✅ Student enrolled');
                } else {
                    alert('❌ ' + (response.message || 'Gagal mendaftarkan mahasiswa'));
                }
            } catch (error) {
                alert('❌ Terjadi kesalahan: ' + error.message);
                console.error('Enroll error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Daftarkan';
            }
        });
    }
});

async function viewClassAttendance(classId) {
    console.log('📊 Loading attendance for class:', classId);

    try {
        const response = await API.getClassAttendance(classId);

        if (response.status === 'success') {
            const attendances = response.data;
            const classInfo = response.class;

            alert(`Kelas: ${classInfo.course.course_name}\nTotal absensi: ${attendances.length} records\n\nLihat di console untuk detail lengkap.`);
            console.table(attendances);
            console.log('✅ Attendance loaded:', attendances.length);
        }
    } catch (error) {
        alert('❌ Error: ' + error.message);
        console.error('Load attendance error:', error);
    }
}

// ==================== ATTENDANCE PAGE ====================

async function showAttendance() {
    console.log('📋 Loading attendance history page...');

    hideAllPages();
    document.getElementById('attendancePage').style.display = 'block';
    await loadAttendanceHistory();
}

async function loadAttendanceHistory() {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center"><span class="spinner-border spinner-border-sm"></span> Loading...</td></tr>';

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

                const statusClass = att.status === 'hadir' ? 'success' :
                                   att.status === 'izin' ? 'warning' :
                                   att.status === 'sakit' ? 'info' : 'danger';

                const courseName = att.class?.course?.course_name || 'N/A';
                const date = new Date(att.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const checkIn = att.check_in_time
                    ? new Date(att.check_in_time).toLocaleTimeString('id-ID',
                        {hour: '2-digit', minute: '2-digit', second: '2-digit'})
                    : '-';

                const checkOut = att.check_out_time
                    ? new Date(att.check_out_time).toLocaleTimeString('id-ID',
                        {hour: '2-digit', minute: '2-digit', second: '2-digit'})
                    : '-';

                row.innerHTML = `
                    <td>${date}</td>
                    <td><strong>${courseName}</strong></td>
                    <td><small>${checkIn}</small></td>
                    <td><small>${checkOut}</small></td>
                    <td><span class="badge bg-${statusClass}">${att.status.toUpperCase()}</span></td>
                `;
                tbody.appendChild(row);
            });

            console.log('✅ Attendance history loaded:', history.length);
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
        console.error('Load attendance history error:', error);
    }
}

// ==================== PROFILE PAGE ====================

function showProfile() {
    console.log('👤 Loading profile page...');

    hideAllPages();
    document.getElementById('profilePage').style.display = 'block';

    // Populate profile data
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileRoleBadge').textContent = currentUser.role.toUpperCase();
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    // Show NPM if mahasiswa
    if (currentUser.npm) {
        document.getElementById('profileNPMRow').style.display = 'table-row';
        document.getElementById('profileNPM').textContent = currentUser.npm;
    } else {
        document.getElementById('profileNPMRow').style.display = 'none';
    }

    // Format created date
    if (currentUser.created_at) {
        const createdDate = new Date(currentUser.created_at).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('profileCreated').textContent = createdDate;
    } else {
        document.getElementById('profileCreated').textContent = '-';
    }
}

// ==================== INITIALIZATION ====================

// Auto-submit login form on Enter
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

console.log('✅ App Module fully loaded');
