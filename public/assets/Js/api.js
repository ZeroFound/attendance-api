// API Configuration
const API_BASE_URL = window.location.origin + '/api';
// Untuk production Railway gunakan:
// const API_BASE_URL = 'https://attendance-api-production.up.railway.app/api';

// API Helper Functions
const API = {
    // Auth
    login: (email, password) => {
        return fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());
    },

    register: (data) => {
        return fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    getProfile: () => {
        return fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    logout: () => {
        return fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    // Courses
    getCourses: () => {
        return fetch(`${API_BASE_URL}/courses`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    createCourse: (data) => {
        return fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    updateCourse: (id, data) => {
        return fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    deleteCourse: (id) => {
        return fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    // Classes
    getClasses: () => {
        return fetch(`${API_BASE_URL}/classes`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    createClass: (data) => {
        return fetch(`${API_BASE_URL}/classes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    enrollStudent: (classId, studentId) => {
        return fetch(`${API_BASE_URL}/classes/${classId}/enroll`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student_id: studentId })
        }).then(res => res.json());
    },

    getClassStudents: (classId) => {
        return fetch(`${API_BASE_URL}/classes/${classId}/students`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    // Attendance
    checkIn: (classId, latitude, longitude) => {
        return fetch(`${API_BASE_URL}/attendances/check-in`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ class_id: classId, latitude, longitude })
        }).then(res => res.json());
    },

    checkOut: (classId, latitude, longitude) => {
        return fetch(`${API_BASE_URL}/attendances/check-out`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ class_id: classId, latitude, longitude })
        }).then(res => res.json());
    },

    getHistory: () => {
        return fetch(`${API_BASE_URL}/attendances/history`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    getStats: () => {
        return fetch(`${API_BASE_URL}/attendances/stats`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    getTodayAttendance: (classId) => {
        return fetch(`${API_BASE_URL}/attendances/today?class_id=${classId}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    getClassAttendance: (classId) => {
        return fetch(`${API_BASE_URL}/attendances/class/${classId}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    },

    updateAttendanceStatus: (id, status) => {
        return fetch(`${API_BASE_URL}/attendances/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        }).then(res => res.json());
    }
};

// Token Management
function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
