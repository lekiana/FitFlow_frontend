import axios from "axios"

const FitFlowApiUrl = 'http://127.0.0.1:8000'

export const FitFlowAxios = axios.create()

const API = {
    getCompanyTransactions: ({company_id}) =>
        FitFlowAxios.get(`${FitFlowApiUrl}/company_transactions`, {
            params: {
                company_id,
            },
            credentials: 'include',
        }),

    addTransaction: (requestDataObj) =>
        FitFlowAxios.post(`${FitFlowApiUrl}/add_transaction`, requestDataObj, {
            credentials: 'include',
        }),

    deleteTransaction: (requestDataObj) =>
        FitFlowAxios.delete(`${FitFlowApiUrl}/delete_transaction`, {data: requestDataObj}),


    getCompanyUsers: ({company_id}) =>
        FitFlowAxios.get(`${FitFlowApiUrl}/company_users`, {
            params: {
                company_id,
            },
            credentials: 'include',
        }),

    authenticateUser: (requestDataObj) =>
        FitFlowAxios.post(`${FitFlowApiUrl}/authenticate_user`, requestDataObj, {
            credentials: 'include',
        }),

    createUser: (requestDataObj) =>
        FitFlowAxios.post(`${FitFlowApiUrl}/create_user`, requestDataObj, {
            credentials: 'include',
        }),

    createCompany: (requestDataObj) =>
        FitFlowAxios.post(`${FitFlowApiUrl}/create_company`, requestDataObj, {
            credentials: 'include',
        }),

    createGroup: (requestDataObj) =>
    FitFlowAxios.post(`${FitFlowApiUrl}/create_group`, requestDataObj, {
        credentials: 'include',
    }),

    getCompanyBudget: ({budget_id, transaction_type}) =>
    FitFlowAxios.get(`${FitFlowApiUrl}/company_budget`, {
        params: {
            budget_id,
            transaction_type,
        },
        credentials: 'include',
    }),

    getTransactionsCategories: ({company_id}) =>
    FitFlowAxios.get(`${FitFlowApiUrl}/transactions_categories`, {
        params: {
            company_id,
        },
        credentials: 'include',
    }),

    getCategory: ({pk}) =>
    FitFlowAxios.get(`${FitFlowApiUrl}/get_category`, {
        params: {
            pk,
        },
        credentials: 'include',
    }),

    getCategoryTransactions: ({category_id}) =>
    FitFlowAxios.get(`${FitFlowApiUrl}/get_category`, {
        params: {
            category_id,
        },
        credentials: 'include',
    }),

    addBudgetEntry: (requestDataObj) =>
    FitFlowAxios.post(`${FitFlowApiUrl}/add_budget_entry`, requestDataObj, {
        credentials: 'include',
    }),

    deleteBudgetEntry: ({pk}) =>
    FitFlowAxios.delete(`${FitFlowApiUrl}/delete_budget_entry`, {
        params: {
            pk,
        },
        credentials: 'include',
    }),
}

export default API