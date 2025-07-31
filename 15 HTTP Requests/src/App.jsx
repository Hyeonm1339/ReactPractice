import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {updateUserPlaces, fetchUserPlace} from "./http.js";
import ErrorPage from "./components/Error.jsx";

function App() {
    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState()

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            try {
                const places = await fetchUserPlace();
                setUserPlaces(places);
            } catch (e) {
                setError({message: e.message || 'Failed to fetch user places.'})
            }
            setIsFetching(false);
        }

        fetchPlaces();
    }, []);

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });
        try {
            //상태(state)를 업데이트를 진행하고, 서버와 통신.
            await updateUserPlaces([selectedPlace, ...userPlaces])
        } catch (e) {
            //서버 통신중 에러가 발생하면 기존에 업데이트한 상태(state)를 원래대로 되돌려준다.(낙관적 업데이트..?)
            //통신을 상단에 쓸경우, 통신이 끝날때까지 스피너와같이 로딩바를 만들어주어야 하나, 이후에 처리한다면 에러 발생시 원복처리 되므로 해당방식도 괜찮아보임.
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({message: e.message || 'Failed to update places.'})
        }


    }

    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
        try {

            await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
        } catch (e) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({message: e.message || 'Failed to delete place'})
        }

        setModalIsOpen(false);
    }, [updateUserPlaces]);

    function handleError() {
        setErrorUpdatingPlaces(null);
    }

    return (
        <>
            <Modal open={errorUpdatingPlaces} onClose={handleError}>
                {errorUpdatingPlaces && (
                    <ErrorPage title="An error occurred. Please try again later" message={errorUpdatingPlaces.message}
                               onConfirm={handleError}/>
                )}
            </Modal>
            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                {error && <ErrorPage title="An error occurred!" message={error.message}/>}
                {!error &&
                    <Places
                        title="I'd like to visit ..."
                        fallbackText="Select the places you would like to visit below."
                        isLoading={isFetching}
                        loadingText="Fetching your places..."
                        places={userPlaces}
                        onSelectPlace={handleStartRemovePlace}
                    />
                }

                <AvailablePlaces onSelectPlace={handleSelectPlace}/>
            </main>
        </>
    );
}

export default App;
