import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js"

export default function AvailablePlaces({onSelectPlace}) {

    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);

            try {
                const places = await fetchAvailablePlaces();

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
                    setAvailablePlaces(sortPlaces);
                    setIsFetching(false);
                })

            } catch (error) {
                //에러처리.
                setError({
                    message: error.message || '장소를 불러오지 못했습니다.',
                })
                setIsFetching(false);
            }
        }

        fetchPlaces();
    }, []);

    if (error) {
        return <ErrorPage title="에러가 발생했습니다." message={error.message}></ErrorPage>
    }


    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetching place Data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
