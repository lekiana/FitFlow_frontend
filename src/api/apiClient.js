import axios from "axios"

const ServerUrl = 'http://127.0.0.1:8000'
export const serverAxios = axios.create()

const API = {
    getCompanyTransactions: ({company_id}) =>
        serverAxios.get(`${ServerUrl}/company_transactions`, {
            params: {
                company_id,
            },
        }
    ),

    addTransaction: (requestDataObj) =>
        serverAxios.post(`${ServerUrl}/add_transaction`, requestDataObj, {
    }),

    addStandingOrder: (requestDataObj) =>
        serverAxios.post(`${ServerUrl}/add_standing_order`, requestDataObj, {
    }),

    deleteTransaction: ({pk}) =>
    serverAxios.delete(`${ServerUrl}/delete_transaction`, {
        params: {
            pk,
        },
    }),

    updateStandingOrder: ({pk}) =>
    serverAxios.delete(`${ServerUrl}/update_standing_order`, {
        params: {
            pk,
        },
    }),

    deleteUser: ({pk}) =>
    serverAxios.delete(`${ServerUrl}/delete_user`, {
        params: {
            pk,
        },
    }),

    deleteStandingOrder: ({pk}) =>
    serverAxios.delete(`${ServerUrl}/delete_standing_order`, {
        params: {
            pk,
        },
    }),

    getCompanyUsers: ({company_id}) =>
        serverAxios.get(`${ServerUrl}/company_users`, {
            params: {
                company_id,
            },
        }),

    authenticateUser: (requestDataObj) =>
        serverAxios.post(`${ServerUrl}/authenticate_user`, requestDataObj),

    createUser: (requestDataObj) =>
        serverAxios.post(`${ServerUrl}/create_user`, requestDataObj),

    createCompany: (requestDataObj) =>
        serverAxios.post(`${ServerUrl}/create_company`, requestDataObj),

    createGroup: (requestDataObj) =>
    serverAxios.post(`${ServerUrl}/create_group`, requestDataObj),

    getCompanyBudget: ({budget_id, transaction_type}) =>
    serverAxios.get(`${ServerUrl}/company_budget`, {
        params: {
            budget_id,
            transaction_type,
        },
    }),

    getTransactionsCategories: ({company_id}) =>
    serverAxios.get(`${ServerUrl}/transactions_categories`, {
        params: {
            company_id,
        },
    }),

    getCategory: ({pk}) =>
    serverAxios.get(`${ServerUrl}/get_category`, {
        params: {
            pk,
        },
    }),

    getCategoryTransactions: ({category_id, start_date, end_date}) =>
    serverAxios.get(`${ServerUrl}/get_category_transactions`, {
        params: {
            category_id,
            start_date,
            end_date,
        },
    }),

    addBudgetEntry: (requestDataObj) =>
    serverAxios.post(`${ServerUrl}/add_budget_entry`, requestDataObj),

    deleteBudgetEntry: ({pk}) =>
    serverAxios.delete(`${ServerUrl}/delete_budget_entry`, {
        params: {
            pk,
        },
    }),

    getCompanyMeans: ({company_id}) =>
    serverAxios.get(`${ServerUrl}/company_means`, {
        params: {
            company_id,
        },
    }),

    getCompanyBudgets: ({company_id}) =>
    serverAxios.get(`${ServerUrl}/company_budgets`, {
        params: {
            company_id,
        },
    }),

    addBudget: (requestDataObj) =>
    serverAxios.post(`${ServerUrl}/add_budget`, requestDataObj),

    addAccount: (requestDataObj) =>
    serverAxios.post(`${ServerUrl}/add_account`, requestDataObj),

    getCurrentProfit: ({company_id, start_date, end_date}) =>
    serverAxios.get(`${ServerUrl}/get_sum`, {
        params: {
            company_id,
            start_date,
            end_date,
        },
    }),
    
    getPlannedProfit: ({budget_id}) =>
    serverAxios.get(`${ServerUrl}/get_planned_profit`, {
        params: {
            budget_id,
        },
    }),

    getTypeTransactions: ({company_id, transaction_type}) =>
    serverAxios.get(`${ServerUrl}/get_type_categories`, {
        params: {
            company_id,
            transaction_type,
        },
    }),

    addCategory: (requestDataObj) =>
    serverAxios.post(`${ServerUrl}/add_category`, requestDataObj),

    getStandingOrders: ({company_id}) =>
    serverAxios.get(`${ServerUrl}/get_standing_orders`, {
        params: {
            company_id,
        },
    }),

    getStandingOrdersSum: ({company_id}) =>
    serverAxios.get(`${ServerUrl}/get_standing_orders_sum`, {
        params: {
            company_id,
        },
    }),

    getAvailableMeans: ({company_id}) =>
    serverAxios.get(`${ServerUrl}/get_available_means`, {
        params: {
            company_id,
        },
    }),
}

export default API
