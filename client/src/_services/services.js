import Axios from 'axios'

export const getLocus = () => {
    let msgError = null;
    let results = null;
    const suspender = async () => {
        try {
            const { data } = await Axios.get(`/store`)
            msgError = false
            results = data;
        } catch (error) {
            msgError = true
            results = []
        }
    }
    return {
        read: async function () {
            if (msgError === null) await suspender();
            return { results, msgError };
        }
    }
}

export const getUserLocation = () => {
    let msgError = null;
    let location = { lat: null, lng: null };
    const suspender = async () => {
        try {
            const { data } = await Axios.get(`https://ipapi.co/json`);
            location.lat = data.latitude;
            location.lng = data.longitude;
            msgError = false;
        } catch (error) {
            await navigator.geolocation.getCurrentPosition(pos => {
                location.lat = pos.coords.latitude;
                location.lng = pos.coords.longitude;
            });
            msgError = true;
        }
    }
    return {
        read: async function () {
            if (msgError === null) await suspender();
            return { location, msgError };
        }
    }
}

