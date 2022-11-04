//init state:
const initState = {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("role") || null
};

export default {
    state: {...initState},
    getters: {
        token({accessToken}) {
            return accessToken;
        },
        role({role, accessToken}) {
            return accessToken !== null ? role : "guest";
        },
        isLoggedIn({accessToken}) {
            return accessToken !== null;
        }
    },
    actions: {
        setToken({commit}, data) {
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            commit("setToken", data);
        },
        logout({commit}) {
            localStorage.clear();
            commit("logout");
        },
        setRole({commit}, role) {
            localStorage.setItem("role", role);
            commit("setRole", role);
        }
    },
    mutations: {
        setToken(state, data) {
            state.accessToken = data.access;
            state.refreshToken = data.refresh;

        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
        },
        setRole(state, role) {
            state.role = role;
        }
    }
};
