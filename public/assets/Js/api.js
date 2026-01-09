// ==================== API CONFIGURATION ====================

// API Base URL - Auto detect environment
const API_BASE_URL = (() => {
    const origin = window.location.origin;

    // Development
    if (origin.includes('127.0.0.1') || origin.includes('localhost')) {
        return `${origin}/api`;
    }

    // Production (Railway)
    return `${origin}/api`;
})();

console.log('🌐 API Base URL:', API_BASE_URL);

// ==================== API HELPER OBJECT ====================

const API = {
    // ==================== AUTHENTICATION ====================

    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            return await response.json();
        } catch (error) {
            console.error('API Login Error:', error);
            throw error;
        }
    },

    register: async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Register Error:', error);
            throw error;
        }
    },

    getProfile: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Profile Error:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Logout Error:', error);
            throw error;
        }
    },

    // ==================== COURSES ====================

    getCourses: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Courses Error:', error);
            throw error;
        }
    },

    getCourse: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Course Error:', error);
            throw error;
        }
    },

    createCourse: async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Create Course Error:', error);
            throw error;
        }
    },

    updateCourse: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Update Course Error:', error);
            throw error;
        }
    },

    deleteCourse: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Delete Course Error:', error);
            throw error;
        }
    },

    // ==================== CLASSES ====================

    getClasses: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Classes Error:', error);
            throw error;
        }
    },

    getClass: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Class Error:', error);
            throw error;
        }
    },

    createClass: async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Create Class Error:', error);
            throw error;
        }
    },

    updateClass: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Update Class Error:', error);
            throw error;
        }
    },

    deleteClass: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Delete Class Error:', error);
            throw error;
        }
    },

    enrollStudent: async (classId, studentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/${classId}/enroll`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ student_id: studentId })
            });
            return await response.json();
        } catch (error) {
            console.error('API Enroll Student Error:', error);
            throw error;
        }
    },

    unenrollStudent: async (classId, studentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/${classId}/unenroll`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ student_id: studentId })
            });
            return await response.json();
        } catch (error) {
            console.error('API Unenroll Student Error:', error);
            throw error;
        }
    },

    getClassStudents: async (classId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/${classId}/students`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Class Students Error:', error);
            throw error;
        }
    },

    // ==================== ATTENDANCES ====================

    checkIn: async (classId, latitude, longitude) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/check-in`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    class_id: classId,
                    latitude,
                    longitude
                })
            });
            return await response.json();
        } catch (error) {
            console.error('API Check-in Error:', error);
            throw error;
        }
    },

    checkOut: async (classId, latitude, longitude) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/check-out`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    class_id: classId,
                    latitude,
                    longitude
                })
            });
            return await response.json();
        } catch (error) {
            console.error('API Check-out Error:', error);
            throw error;
        }
    },

    getHistory: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/history`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get History Error:', error);
            throw error;
        }
    },

    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/stats`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Stats Error:', error);
            throw error;
        }
    },

    getTodayAttendance: async (classId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/today?class_id=${classId}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Today Attendance Error:', error);
            throw error;
        }
    },

    getClassAttendance: async (classId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/class/${classId}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Class Attendance Error:', error);
            throw error;
        }
    },

    getAttendance: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Attendance Error:', error);
            throw error;
        }
    },

    updateAttendance: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Update Attendance Error:', error);
            throw error;
        }
    },

    updateAttendanceStatus: async (id, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            return await response.json();
        } catch (error) {
            console.error('API Update Attendance Status Error:', error);
            throw error;
        }
    },

    deleteAttendance: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendances/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Delete Attendance Error:', error);
            throw error;
        }
    },

    // ==================== USERS (ADMIN) ====================

    getUsers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Users Error:', error);
            throw error;
        }
    },

    getUser: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get User Error:', error);
            throw error;
        }
    },

    updateUser: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Update User Error:', error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Delete User Error:', error);
            throw error;
        }
    },

    // ==================== REPORTS (OPTIONAL) ====================

    getAttendanceReport: async (params = {}) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${API_BASE_URL}/reports/attendance${queryString ? '?' + queryString : ''}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Get Attendance Report Error:', error);
            throw error;
        }
    },

    exportAttendance: async (classId, format = 'pdf') => {
        try {
            const response = await fetch(`${API_BASE_URL}/reports/export?class_id=${classId}&format=${format}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Accept': 'application/json'
                }
            });
            return await response.blob();
        } catch (error) {
            console.error('API Export Attendance Error:', error);
            throw error;
        }
    }
};

// ==================== TOKEN MANAGEMENT ====================

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
    console.log('✅ Token saved');
}

function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('🗑️ Token removed');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('✅ User data saved:', user.name);
}

// ==================== UTILITY FUNCTIONS ====================

// Check if user is authenticated
function isAuthenticated() {
    return !!getToken();
}

// Get current user role
function getUserRole() {
    const user = getUser();
    return user ? user.role : null;
}

// Check if user has specific role
function hasRole(role) {
    return getUserRole() === role;
}

// Check if user is admin
function isAdmin() {
    return hasRole('admin');
}

// Check if user is dosen
function isDosen() {
    return hasRole('dosen');
}

// Check if user is mahasiswa
function isMahasiswa() {
    return hasRole('mahasiswa');
}

// Format error message from API response
function formatErrorMessage(response) {
    if (response.errors) {
        return Object.values(response.errors).flat().join(', ');
    }
    return response.message || 'Terjadi kesalahan';
}

// Handle API error response
function handleAPIError(error, fallbackMessage = 'Terjadi kesalahan pada server') {
    console.error('API Error:', error);

    if (error.response) {
        return error.response.message || fallbackMessage;
    }

    if (error.message) {
        return error.message;
    }

    return fallbackMessage;
}

// ==================== EXPORT ====================

console.log('✅ API Module initialized with', Object.keys(API).length, 'methods');

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API,
        getToken,
        setToken,
        removeToken,
        getUser,
        setUser,
        isAuthenticated,
        getUserRole,
        hasRole,
        isAdmin,
        isDosen,
        isMahasiswa,
        formatErrorMessage,
        handleAPIError
    };
}
