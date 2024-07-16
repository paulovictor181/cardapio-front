import axios, { Axios, AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): AxiosPromise<any>=> {
    const response = axios.post(API_URL + '/food', data)
    return response;
}

export function useFoodData() {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    })

    return {
        ...query,
        data: query.data?.data
    }
}