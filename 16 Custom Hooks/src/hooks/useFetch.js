//리액트는 항상 use로 시작하는 함수를 훅으로 등록시켜준다. (내부규칙?)
import {useEffect, useState} from "react";

export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()
    const [fetchedData, setFetchedData] = useState(initialValue)

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({message: error.message || 'Failed to fetch data.'});
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);
    return {
        isFetching,
        setIsFetching,
        fetchedData,
        setFetchedData,
        error
    }
}